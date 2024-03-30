package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.catalogueService.entities.Books;

public interface BooksRepository extends JpaRepository<Books,Long> {

}
