package com.lms.libraryService.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import com.lms.libraryService.dto.BookIssueRequestDTO;
import com.lms.libraryService.dto.BookIssueResponseDTO;
import com.lms.libraryService.entities.BookIssue;
import com.lms.libraryService.external.dto.BookInstanceResponseDTO;
import com.lms.libraryService.external.dto.BookResponseDTO;
import com.lms.libraryService.external.dto.MemberResponseDTO;
import com.lms.libraryService.external.dto.MembershipResponseDTO;
import com.lms.libraryService.external.dto.UserResponseDto;
import com.lms.libraryService.external.service.BookService;
import com.lms.libraryService.external.service.MemberService;
import com.lms.libraryService.external.service.UserService;
import com.lms.libraryService.repository.BookIssueRepository;
import com.lms.libraryService.service.BookIssueService;

import lombok.AllArgsConstructor;

@Service

public class BookIssueServiceImpl implements BookIssueService {

    private final BookIssueRepository bookIssueRepository;
    private final BookService bookService;
    private final UserService userService;
    private final MemberService memberService;

    public BookIssueServiceImpl(BookIssueRepository bookIssueRepository,BookService bookService,UserService userService,MemberService memberService){
        this.bookIssueRepository=bookIssueRepository;
        this.bookService=bookService;
        this.memberService=memberService;
        this.userService=userService;
    }
    
    @Override
    @Transactional
    public BookIssueResponseDTO newBookIssue(BookIssueRequestDTO bookIssueRequest) {
        try{
            memberService.getMemberShipByID(bookIssueRequest.member());
        }catch(Exception e){
                throw new IllegalArgumentException("Input Member dont have any Membership");
        }
       
        BookInstanceResponseDTO book= bookService.getBookInstance(bookIssueRequest.bookInstance());
        if(book==null) throw new IllegalArgumentException("Invalid Book Instance Id: "+bookIssueRequest.bookInstance() );
        if(!book.status().equals("Available"))  throw new IllegalArgumentException("Book Instance not available for issue " );

        BookIssue bookIssue = new BookIssue();
      
        bookIssue.setBookInstance(bookIssueRequest.bookInstance());
        bookIssue.setDateOfIssue(bookIssueRequest.dateOfIssue());
        bookIssue.setDateOfReturn(bookIssueRequest.dateOfReturn());
        bookIssue.setMember(bookIssueRequest.member());
        bookIssue.setIssueBy(bookIssueRequest.issueBy());
        bookService.updateBookInstanceStatus(bookIssueRequest.bookInstance(), "issue");
        bookIssue = bookIssueRepository.save(bookIssue);
        return mapToBookIssueResponseDTO(bookIssue);
    }


    @Override
    public BookIssueResponseDTO getBookIssue(long id) {
        BookIssue bookIssue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Issue with ID " + id + " does not exist"));
        return mapToBookIssueResponseDTO(bookIssue);

    }

    @Override
    public List<BookIssueResponseDTO> getAllBookIssue() {
        return bookIssueRepository.findAll().stream().map(this:: mapToBookIssueResponseDTO).collect(Collectors.toList());
    }


    private BookIssueResponseDTO mapToBookIssueResponseDTO(BookIssue bookIssue){
        MemberResponseDTO member= null;
        UserResponseDto user=null;
        BookInstanceResponseDTO bookInstanceResponseDTO=null;

    try {
        member = memberService.getMember(bookIssue.getMember());
        user= userService.getUser(bookIssue.getIssueBy());
       bookInstanceResponseDTO = bookService.getBookInstance(bookIssue.getBookInstance());
     
    } catch (HttpClientErrorException ex) {
        throw new IllegalArgumentException(ex.getMessage());
    }

   
        return new BookIssueResponseDTO(
                bookIssue.getBookIssueId(),
                bookInstanceResponseDTO,
                member.memberId(),
                member.firstName()+" "+member.familyName(),
                bookIssue.getDateOfIssue(),
                bookIssue.getDateOfReturn(),
                bookIssue.getReturned(),
                user.userName()
                );
    }

    @Override
    public List<BookIssueResponseDTO> getAllBooKIssueByMember(long memberId) {
        List<BookIssue> bookIssues = bookIssueRepository.findByMember(memberId);
        return bookIssues.stream()
                .map(this::mapToBookIssueResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookIssueResponseDTO> getIssueBookByBookInstance(long bookInstanceId) {
        List<BookIssue> bookIssues = bookIssueRepository.findByBookInstance(bookInstanceId);
               
        
                return bookIssues.stream()
                .map(this::mapToBookIssueResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Integer> countIssueBooks() {
         Map<String, Integer> countMap = new HashMap<>();

        // Count books for each status
        countMap.put("Issued", bookIssueRepository.countByReturned("No"));

        return countMap;
    }

    @Override
    public List<BookIssueResponseDTO> getAllDueReturnBooks() {
        List<BookIssue> dueBookIssues = bookIssueRepository.findByDateOfReturnBeforeAndReturnedEquals(new Date(), "No").orElseThrow(()-> new RuntimeException("Something went Wrong"));

        return dueBookIssues.stream()
        .map(this::mapToBookIssueResponseDTO)
        .collect(Collectors.toList());

       
    }

    


}
