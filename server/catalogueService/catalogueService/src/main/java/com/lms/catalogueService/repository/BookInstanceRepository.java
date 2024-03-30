package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.catalogueService.entities.BookInstance;

public interface BookInstanceRepository extends JpaRepository<BookInstance,Long> {

}
