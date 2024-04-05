package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookReturn;

public record FineResponseDTO(
        long fineId,
        BookReturn bookReturn,
        String isWaveOff,
        long transaction) {

}
