package com.lms.catalogueService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.catalogueService.entities.Bookshelf;

public interface BookshelfRepository  extends JpaRepository<Bookshelf,Long>{

}

