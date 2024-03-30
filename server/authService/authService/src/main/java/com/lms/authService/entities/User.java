package com.lms.authService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="USERS")
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
