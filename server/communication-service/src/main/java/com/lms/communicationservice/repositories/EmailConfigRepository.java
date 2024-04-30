package com.lms.communicationservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.communicationservice.entities.Email;

public interface EmailConfigRepository   extends JpaRepository<Email,Integer>{
    @Query("SELECT e FROM Email e ORDER BY e.id ASC")
    Email findFirstEmail();
}
