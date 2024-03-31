package com.lms.catalogueService.service;

import java.util.List;

import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.BookShelfResponseDTO;
import com.lms.catalogueService.dto.BookshelfRequestDTO;

public interface Bookshelf {

    public BookShelfResponseDTO createBookShelf(BookshelfRequestDTO bookshelf); 

    public BookShelfResponseDTO updateBookShelf(long id, BookshelfRequestDTO bookshelf);
    public BookShelfResponseDTO deleteBookShelf(long id);
    public List<BookShelfResponseDTO> getAllBookShelf();
    public BookShelfResponseDTO getBookShelf(long id);
    public List<BookResponseDTO> gatBooksofParticularShelf(long id);

    



}
