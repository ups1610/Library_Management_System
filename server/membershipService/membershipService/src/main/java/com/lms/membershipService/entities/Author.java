package com.lms.membershipService.entities;
import java.util.Date;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Author {

    @Id
    @GeneratedValue
    private long authorId;

    private String firstName;

    private String familyName;

    private Date dob;

    private String biography;
}
