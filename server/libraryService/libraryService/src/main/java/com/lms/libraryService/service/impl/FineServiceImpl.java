package com.lms.libraryService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.lms.libraryService.dto.BookReturnResponseDTO;
import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.entities.BookReturn;
import com.lms.libraryService.entities.BookReturnFine;
import com.lms.libraryService.external.dto.TransactionRequestDTO;
import com.lms.libraryService.external.dto.TransactionResponseDTO;
import com.lms.libraryService.external.dto.UserResponseDto;
import com.lms.libraryService.external.service.TransactionService;
import com.lms.libraryService.external.service.UserService;
import com.lms.libraryService.repository.BookReturnRepository;
import com.lms.libraryService.repository.FineRepository;
import com.lms.libraryService.service.FineService;

import lombok.AllArgsConstructor;

@Service

public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;
    private final TransactionService transactionService;
    private final UserService userService;
    public FineServiceImpl(FineRepository fineRepository,TransactionService transactionService,UserService userService){
        this.fineRepository=fineRepository;
        this.transactionService=transactionService;
        this.userService=userService;
    }
  


    @Override
    public BookReturnFine newFine(FineRequestDTO fineRequest) {
       // currently static fine  for per day is 10 rs.
       int finePerDay= 10 ;

       int totalFine= finePerDay*(int)fineRequest.noOFDays();
       BookReturnFine fine = new BookReturnFine();
       
        String waveOFf= fineRequest.isWaveOff()==true?"Yes":"No";
        fine.setIsWavedOff(waveOFf);
        long transactionId=0;
        if(!fineRequest.isWaveOff()){
                TransactionResponseDTO transactionResponseDTO= transactionService.transaction(new TransactionRequestDTO(fineRequest.member(),totalFine,"Fine-",fineRequest.mode(),fineRequest.collector()));
                transactionId=transactionResponseDTO.transactionId();
        }
        fine.setAmount(totalFine);
        fine.setTransaction_id(transactionId);
        fine = fineRepository.save(fine);
        return fine;
    }

  

  
    @Override
    public FineResponseDTO getFine(long id) {
        BookReturnFine fine = fineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fine with ID " + id + " not found"));
        return mapToFineResponseDTO(fine);
    }

    @Override
    public List<FineResponseDTO> getAllFine() {
        List<BookReturnFine> fines = fineRepository.findAll();
        return fines.stream().map(this::mapToFineResponseDTO).collect(Collectors.toList());
    }

    private FineResponseDTO mapToFineResponseDTO(BookReturnFine fine) {
        return new FineResponseDTO(
            fine.getFineId(),
          fine.getAmount() ,
            fine.getIsWavedOff(),
            fine.getTransaction_id()
        );
    }


   
       
}
