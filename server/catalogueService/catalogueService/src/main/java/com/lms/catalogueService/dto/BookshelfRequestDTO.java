package com.lms.catalogueService.dto;

public record BookshelfRequestDTO(
    String shelfName,
    String location,
    long capacity,
    String description

    
) {

}
