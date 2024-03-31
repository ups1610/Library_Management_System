package com.lms.catalogueService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.catalogueService.entities.BookInstance;

@Repository
public interface BookInstanceRepository extends JpaRepository<BookInstance,Long> {
    List<BookInstance> findByBookshelf_ShelfId(long shelfId);

}
