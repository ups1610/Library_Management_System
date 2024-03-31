package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.catalogueService.entities.Books;

@Repository
public interface BooksRepository extends JpaRepository<Books,Long> {

}
