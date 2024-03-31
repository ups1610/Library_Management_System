package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.catalogueService.entities.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {

}
