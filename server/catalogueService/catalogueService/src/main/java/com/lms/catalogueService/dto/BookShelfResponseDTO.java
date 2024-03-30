package com.lms.catalogueService.dto;

public record BookShelfResponseDTO(
    long id,
    String shelfName,
    String location,
    long capacity,
    String description
) {

}
