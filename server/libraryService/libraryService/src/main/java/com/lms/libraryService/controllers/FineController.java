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

import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.service.FineService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/library/fines")
@AllArgsConstructor
public class FineController {

    private final FineService fineService;

    @PostMapping
    public ResponseEntity<FineResponseDTO> createFine(@RequestBody FineRequestDTO fineRequest) {
        FineResponseDTO response = fineService.newFine(fineRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FineResponseDTO> getFineById(@PathVariable("id") long id) {
        FineResponseDTO response = fineService.getFine(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FineResponseDTO>> getAllFines() {
        List<FineResponseDTO> response = fineService.getAllFine();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<FineResponseDTO> updateFine(@PathVariable("id") long id, @RequestBody FineRequestDTO fineRequest) {
        FineResponseDTO response = fineService.updateFine(id, fineRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<FineResponseDTO> deleteFine(@PathVariable("id") long id) {
        FineResponseDTO response = fineService.deleteFine(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
