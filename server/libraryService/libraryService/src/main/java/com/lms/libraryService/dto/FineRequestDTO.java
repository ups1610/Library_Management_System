package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookReturn;

public record FineRequestDTO(
        BookReturn bookReturn,
        String isWaveOff,
        long transaction) {

}
