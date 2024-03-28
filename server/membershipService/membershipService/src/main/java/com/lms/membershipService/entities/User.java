package com.lms.membershipService.entities;

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
public class User {

    @Id
    @GeneratedValue
    private long userId;

    private String userName;

    private String firstName;

    private String lastName;

    private String mobile;

    private String email;

    private String role;

    private String status;

}
