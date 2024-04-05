package com.lms.libraryService.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.BookIssue;
import com.lms.libraryService.entities.BookReturn;

public interface BookReturnRepository extends JpaRepository<BookReturn, Long> {



    Optional<BookReturn> findByBookIssue(BookIssue bookIssueId);

}
