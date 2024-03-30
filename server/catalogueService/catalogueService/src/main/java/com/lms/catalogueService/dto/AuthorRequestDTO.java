package com.lms.catalogueService.dto;

import java.util.Date;

public record AuthorRequestDTO(
    String firstName,
    String familyName,
    Date dob,
    String biography
) {
      
}
