package com.lms.catalogueService.dto;

import java.util.Date;

public record AuthorResponseDTO(
    long id,
    String firstName,
    String familyName,
    Date dob,
    String biography
) {

}
