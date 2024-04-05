package com.lms.libraryService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.BookReturn;

public interface BookReturnRepository extends JpaRepository<BookReturn, Long> {

}
