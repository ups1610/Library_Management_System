package com.lms.libraryService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.BookReturnFine;


public interface FineRepository extends JpaRepository<BookReturnFine, Long> {

}
