package com.lms.libraryService.dto;

import com.lms.libraryService.entities.BookReturn;

public record FineResponseDTO(
        long fineId,
        int amount,
        String isWaveOff,
        long transaction) {

}
