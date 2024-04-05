package com.lms.libraryService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.BookIssue;

public interface BookIssueRepository extends JpaRepository<BookIssue, Long> {

    List<BookIssue> findByMember(long memberId);

    Optional<BookIssue> findByBookInstance(long bookInstanceId);

    Optional<BookIssue> findByReturned(String string);
 
    Integer countByReturned(String string);
    
}
