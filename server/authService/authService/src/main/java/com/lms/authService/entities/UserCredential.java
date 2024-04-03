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
public class UserCredential {

    @Id
    @GeneratedValue
    private long userId;

    private String username;

    private String firstname;

    private String lastname;

    private long mobile;

    private String email;

    private String role;

    private String password;
    
    private String status="active";

}
