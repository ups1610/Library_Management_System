package com.lms.authService.repositories;

import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.jpa.repository.JpaRepository;


import com.lms.authService.entities.UserCredential;

public interface UserRepository  extends JpaRepository<UserCredential,Long> {

    Optional<UserCredential> findByUsername(String username);

  

}
