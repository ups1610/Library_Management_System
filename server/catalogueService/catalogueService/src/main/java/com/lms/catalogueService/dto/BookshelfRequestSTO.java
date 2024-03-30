package com.lms.catalogueService.dto;

public record BookshelfRequestSTO(
    String shelfName,
    String location,
    long capacity,
    String description
) {

}
