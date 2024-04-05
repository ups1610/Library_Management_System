package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookReturn;

public record FineRequestDTO(
        
        long member,
        String memberName,
        long noOFDays,
        String  mode,
        boolean isWaveOff,
        long collector
       ) {

}
