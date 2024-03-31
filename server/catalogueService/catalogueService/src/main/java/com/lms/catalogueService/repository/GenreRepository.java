package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.catalogueService.entities.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre,Long> {

}
