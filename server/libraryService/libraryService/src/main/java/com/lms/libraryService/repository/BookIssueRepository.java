package com.lms.libraryService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.BookIssue;

public interface BookIssueRepository extends JpaRepository<BookIssue, Long> {
    
}
