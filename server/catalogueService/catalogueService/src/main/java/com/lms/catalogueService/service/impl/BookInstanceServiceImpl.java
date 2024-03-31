package com.lms.catalogueService.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.catalogueService.dto.BookInstanceRequestDTO;
import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookRequestDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.BookShelfResponseDTO;
import com.lms.catalogueService.entities.BookInstance;
import com.lms.catalogueService.entities.Books;
import com.lms.catalogueService.entities.Bookshelf;
import com.lms.catalogueService.repository.BookInstanceRepository;
import com.lms.catalogueService.repository.BooksRepository;
import com.lms.catalogueService.repository.BookshelfRepository;
import com.lms.catalogueService.service.BookInstanceService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookInstanceServiceImpl implements BookInstanceService {

    private BookInstanceRepository bookInstanceRepository;
    private BooksRepository booksRepository;
    private BookshelfRepository bookshelfRepository;

    
    @Override
    public BookInstanceResponseDTO newInstance(BookInstanceRequestDTO entity) {

        Books book= booksRepository.findById(entity.book()).orElseThrow(()-> new IllegalArgumentException("Invalid Book id: "+entity.book()));

        Bookshelf shelf=bookshelfRepository.findById(entity.bookshelf()).orElseThrow(()->new IllegalArgumentException("Invalid Booksheld id: "+entity.bookshelf()));

       
        BookInstance bookInstance = new BookInstance();
        bookInstance.setBook(book);
        bookInstance.setImprint(entity.imprint());
        bookInstance.setStatus("Available");
        bookInstance.setBookshelf(shelf);
      
        BookInstance savedInstance = bookInstanceRepository.save(bookInstance);
       
        return mapToBookInstanceResponseDTO(savedInstance);
    }

    @Override
    public BookInstanceResponseDTO getParticularInstance(long id) {
      
        BookInstance instance = bookInstanceRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Invalid book instance id: "+id));
        
            return mapToBookInstanceResponseDTO(instance);
       
    }

    @Override
    public BookInstanceResponseDTO updateInstance(long id, BookInstanceRequestDTO instance) {
        BookInstance bookInstance = bookInstanceRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Invalid book instance id: "+id));
        
        Books book= booksRepository.findById(instance.book()).orElseThrow(()-> new IllegalArgumentException("Invalid Book id: "+instance.book()));

        Bookshelf shelf=bookshelfRepository.findById(instance.bookshelf()).orElseThrow(()->new IllegalArgumentException("Invalid Booksheld id: "+instance.bookshelf()));

         
            
        bookInstance.setBook(book);
        bookInstance.setImprint(instance.imprint());
        bookInstance.setBookshelf(shelf);
         BookInstance updatedInstance = bookInstanceRepository.save(bookInstance);
           
        return mapToBookInstanceResponseDTO(updatedInstance);
       
    }
    @Override
    public BookInstanceResponseDTO updateStatus(long id, String status) {
        BookInstance bookInstance = bookInstanceRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Invalid book instance id: "+id));
        
      
            
        bookInstance.setStatus(status);
      
         BookInstance updatedInstance = bookInstanceRepository.save(bookInstance);
           
        return mapToBookInstanceResponseDTO(updatedInstance);
       
    }



    @Override
    public BookInstanceResponseDTO deleteInstance(long id) {
     
        Optional<BookInstance> optionalBookInstance = bookInstanceRepository.findById(id);
        if (optionalBookInstance.isPresent()) {
         
            BookInstance bookInstance = optionalBookInstance.get();
            bookInstanceRepository.deleteById(id);
            return mapToBookInstanceResponseDTO(bookInstance);
        } else {
         
            throw new IllegalArgumentException("Book instance not found with ID: " + id);
        }
    }

    @Override
    public List<BookInstanceResponseDTO> getAllInstance() {

        List<BookInstance> allInstances = bookInstanceRepository.findAll();
      
        return allInstances.stream()
                .map(this::mapToBookInstanceResponseDTO)
                .collect(Collectors.toList());
    }
    

   private BookInstanceResponseDTO mapToBookInstanceResponseDTO(BookInstance instance) {

        
           BookShelfResponseDTO bookShelfResponseDTO = null;
        if (instance.getBookshelf() != null) {
            bookShelfResponseDTO = new BookShelfResponseDTO(
                    instance.getBookshelf().getShelfId(),
                    instance.getBookshelf().getShelfName(),
                    instance.getBookshelf().getLocation(),
                    instance.getBookshelf().getCapacity(),
                    instance.getBookshelf().getDescription()
            );
        }

        return new BookInstanceResponseDTO(
                instance.getInstanceId(),
                instance.getBook().getBookTitle(),
                instance.getImprint(),
                instance.getStatus(),
                bookShelfResponseDTO
        );
    }

    
}