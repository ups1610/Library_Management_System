package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.catalogueService.entities.Author;

public interface AuthorRepository extends JpaRepository<Author,Long> {

}
