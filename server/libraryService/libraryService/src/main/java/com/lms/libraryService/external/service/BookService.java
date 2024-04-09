package com.lms.libraryService.external.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.lms.libraryService.external.dto.BookInstanceResponseDTO;

@FeignClient(name="CatalougeService", url="http://localhost:8082")
public interface BookService {

    @GetMapping("catalog/book-instances/{id}")
     BookInstanceResponseDTO getBookInstance(@PathVariable long id);

     @RequestMapping(value = "catalog/book-instances/{id}/status", method = RequestMethod.PUT)
     BookInstanceResponseDTO updateBookInstanceStatus(@PathVariable long id, @RequestParam String status);

}
