package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.catalogueService.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre,Long> {

}
