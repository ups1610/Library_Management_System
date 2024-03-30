package com.lms.catalogueService.dto;

import java.util.List;

public record BookRequestDTO(

    String title,
    long authorId,
    List<Long> genre,
    String ISBN

) {

}
