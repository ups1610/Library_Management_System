package com.lms.catalogueService.dto;

public record BookInstanceResponseDTO(

long id,
BookResponseDTO book,
String imprint,
String status,
BookShelfResponseDTO bookshelf
)
{

}
