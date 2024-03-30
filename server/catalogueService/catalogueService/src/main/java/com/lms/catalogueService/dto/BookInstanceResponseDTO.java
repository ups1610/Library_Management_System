package com.lms.catalogueService.dto;

public record BookInstanceResponseDTO(

long id,
String book,
String imprint,
String status,
BookShelfResponseDTO bookshelf
)
{

}
