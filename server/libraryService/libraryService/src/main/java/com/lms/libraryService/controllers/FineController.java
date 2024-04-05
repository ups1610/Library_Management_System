package com.lms.libraryService.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.service.FineService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/library/fines")
@AllArgsConstructor
public class FineController {

    private final FineService fineService;

   

    @GetMapping("/{id}")
    public ResponseEntity<FineResponseDTO> getFine(@PathVariable("id") long id) {
        FineResponseDTO response = fineService.getFine(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FineResponseDTO>> getAllFines() {
        List<FineResponseDTO> response = fineService.getAllFine();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
