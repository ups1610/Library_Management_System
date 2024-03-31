package com.lms.catalogueService.contollers;

import com.lms.catalogueService.dto.BookInstanceRequestDTO;
import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.service.BookInstanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book-instances")
@AllArgsConstructor
public class BookInstanceController {

    private final BookInstanceService bookInstanceService;

    @PostMapping
    public ResponseEntity<BookInstanceResponseDTO> newInstance(@RequestBody BookInstanceRequestDTO requestDTO) {
        BookInstanceResponseDTO responseDTO = bookInstanceService.newInstance(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookInstanceResponseDTO> getParticularInstance(@PathVariable long id) {
        BookInstanceResponseDTO responseDTO = bookInstanceService.getParticularInstance(id);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookInstanceResponseDTO> updateInstance(@PathVariable long id, @RequestBody BookInstanceRequestDTO requestDTO) {
        BookInstanceResponseDTO responseDTO = bookInstanceService.updateInstance(id, requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<BookInstanceResponseDTO> updateStatus(@PathVariable long id, @RequestParam String status) {
        BookInstanceResponseDTO responseDTO = bookInstanceService.updateStatus(id, status);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BookInstanceResponseDTO> deleteInstance(@PathVariable long id) {
        BookInstanceResponseDTO responseDTO = bookInstanceService.deleteInstance(id);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BookInstanceResponseDTO>> getAllInstances() {
        List<BookInstanceResponseDTO> responseDTOs = bookInstanceService.getAllInstance();
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }
}
