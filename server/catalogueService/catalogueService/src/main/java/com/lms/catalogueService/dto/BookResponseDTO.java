package com.lms.catalogueService.dto;

import java.util.List;

public record BookResponseDTO(
    long id,
    String title,
    long authorId,
    List<String> genre,
    String ISBN
) {

}
