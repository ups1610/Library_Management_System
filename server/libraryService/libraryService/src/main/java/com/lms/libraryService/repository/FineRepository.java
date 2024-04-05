package com.lms.libraryService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.libraryService.entities.Fine;

public interface FineRepository extends JpaRepository<Fine, Long> {

}
