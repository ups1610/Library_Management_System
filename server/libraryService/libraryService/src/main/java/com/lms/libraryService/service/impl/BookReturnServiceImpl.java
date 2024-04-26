package com.lms.libraryService.service.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import java.time.Duration;
import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;
import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.entities.BookIssue;
import com.lms.libraryService.entities.BookReturn;
import com.lms.libraryService.entities.BookReturnFine;
import com.lms.libraryService.external.dto.BookInstanceResponseDTO;
import com.lms.libraryService.external.dto.MemberResponseDTO;
import com.lms.libraryService.external.dto.SendMailRequestDto;
import com.lms.libraryService.external.dto.UserResponseDto;
import com.lms.libraryService.external.service.BookService;
import com.lms.libraryService.external.service.EmailService;
import com.lms.libraryService.external.service.MemberService;
import com.lms.libraryService.external.service.UserService;
import com.lms.libraryService.repository.BookIssueRepository;
import com.lms.libraryService.repository.BookReturnRepository;
import com.lms.libraryService.service.BookReturnService;
import com.lms.libraryService.service.FineService;

import jakarta.transaction.Transactional;

@Service

public class BookReturnServiceImpl implements BookReturnService {

    private final BookReturnRepository bookReturnRepository;
    private final BookIssueRepository bookIssueRepository;

    private final BookService bookService;
    private final UserService userService;
    private final MemberService memberService;
    private final FineService fineService;

    private final EmailService emailService;

    public BookReturnServiceImpl(BookReturnRepository bookReturnRepository, BookIssueRepository bookIssueRepository,
            BookService bookService, UserService userService, FineService fineService, MemberService memberService, EmailService emailService) {
        this.bookIssueRepository = bookIssueRepository;
        this.bookReturnRepository = bookReturnRepository;
        this.bookService = bookService;
        this.userService = userService;
        this.fineService = fineService;
        this.memberService = memberService;
        this.emailService=emailService;

    }

    @Override
    @Transactional
    public BookReturnResponseDTO returnBook(BookReturnRequestDTO bookReturnRequest) {
        BookIssue bookIssue = bookIssueRepository.findById(bookReturnRequest.bookIssue())
                .orElseThrow(
                        () -> new IllegalArgumentException("Invalid Book Return Id: " + bookReturnRequest.bookIssue()));

        // Calculate fine

        BookReturn bookReturn = new BookReturn();
        bookReturn.setBookIssue(bookIssue);
        bookReturn.setReturnDate(bookReturnRequest.date());
        bookReturn.setCollectBy(bookReturnRequest.collectBy());

        BookReturnFine fine = null;

        if (bookReturnRequest.fine() > 0) {
            try {
                MemberResponseDTO memberResponseDTO = memberService.getMember(bookIssue.getMember());
                fine = fineService.newFine(new FineRequestDTO(
                        bookIssue.getMember(),
                        memberResponseDTO.firstName() + " " + memberResponseDTO.familyName(),
                        bookReturnRequest.fine(),
                        bookReturnRequest.mode(),
                        bookReturnRequest.waveOffFine(),
                        bookReturnRequest.collectBy()));
            } catch (Exception e) {
                throw new IllegalArgumentException("Error processing fine: " + e.getMessage());
            }
        }

        bookReturn.setFine(fine);
        bookReturn = bookReturnRepository.save(bookReturn);
        bookService.updateBookInstanceStatus(bookIssue.getBookInstance(), "Available");
        bookIssue.setReturned("Yes");
        bookIssueRepository.save(bookIssue);
        return mapToBookReturnResponseDTO(bookReturn);
    }

    @Override
    public BookReturnResponseDTO getBookReturn(long id) {
        BookReturn bookReturn = bookReturnRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Return can't done " + id + " does not exist"));
              
        return mapToBookReturnResponseDTO(bookReturn);
    }

    @Override
    public List<BookReturnResponseDTO> getAllBookReturn() {
        List<BookReturn> bookReturns = bookReturnRepository.findAll();
    
        return bookReturns.stream().map(this::mapToBookReturnResponseDTO).collect(Collectors.toList());
    }

    private BookReturnResponseDTO mapToBookReturnResponseDTO(BookReturn bookReturn) {

        UserResponseDto user = null;
        try {

            user = userService.getUser(bookReturn.getCollectBy());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid Collector id" + bookReturn.getCollectBy());
        }
        return new BookReturnResponseDTO(
                bookReturn.getBookReturnId(),
                bookReturn.getBookIssue(),
                bookReturn.getReturnDate(),
                mapToFineResponseDTO(bookReturn.getFine()),
                user.userName());
    }

    @Override
    public BookReturnResponseDTO getReturnDetailsofIssueBook(long bookIssueId) {
        BookIssue bookIssue= bookIssueRepository.findById(bookIssueId).orElseThrow(()-> new IllegalArgumentException("Invalid BookIssue id: "+bookIssueId));
        BookReturn bookReturnForIssue = bookReturnRepository.findByBookIssue(bookIssue).orElseThrow(
                        () -> new IllegalArgumentException("No book return found for issue with ID: " + bookIssueId));
        return mapToBookReturnResponseDTO(bookReturnForIssue);
    }
    @Override
   

    public int getFine(long id) {
        BookIssue bookIssue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid BookIssue id: " + id));
    
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = dateFormat.format(bookIssue.getDateOfReturn());
        LocalDate localDueDate = LocalDate.parse(dateString);
        LocalDate localReturnDate = LocalDate.now(); // Using today's date as return date
    
        long daysOverdue = ChronoUnit.DAYS.between(localDueDate, localReturnDate);
    
        int tfine= 10 * (int) daysOverdue;

        return tfine<=0?0:tfine;
    }
    


    private FineResponseDTO mapToFineResponseDTO(BookReturnFine fine) {

        if(fine==null) return null;
        return new FineResponseDTO(
            fine.getFineId(),
          fine.getAmount() ,
            fine.getIsWavedOff(),
            fine.getTransaction_id()
        );
    }

    @Override
    public String sendReturnReminder(long bookIssue) {
            BookIssue  issueBook= bookIssueRepository.findById(bookIssue).orElseThrow(()->new IllegalArgumentException("Invalid Book issue Id: "+bookIssue));
            MemberResponseDTO memberResponseDTO = memberService.getMember(issueBook.getMember());
            BookInstanceResponseDTO bookInstance= bookService.getBookInstance(issueBook.getBookInstance());

            return emailService.sendMail(new SendMailRequestDto(
                memberResponseDTO.email(),
                "Book Return Due",
                "Dear " + memberResponseDTO.firstName() + ",\n\n" +
                "This is a friendly reminder that the book  \"" + bookInstance.book().title() + "\"   (ID: "+bookInstance.id()+") is due for return.\n\n" +
                "Please ensure to return it at your earliest .\n\n" +
                "Thank you,\n" +
                "Your Library Team"
            ));
             
            
    }
}
