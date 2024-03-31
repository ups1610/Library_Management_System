package com.lms.catalogueService.contollers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.GenreRequestDTO;
import com.lms.catalogueService.dto.GenreResponseDTO;
import com.lms.catalogueService.service.GenreService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/genre")
public class GenreController {

    private GenreService genreService;

    @PostMapping("/create")
    public ResponseEntity<GenreResponseDTO> createGenre(@RequestBody GenreRequestDTO genreRequestDTO) {
        GenreResponseDTO responseDTO = genreService.createGenre(genreRequestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GenreResponseDTO>> getAllGenres() {
        List<GenreResponseDTO> genres = genreService.getAllGenre();
        return new ResponseEntity<>(genres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenreResponseDTO> getGenre(@PathVariable("id") long id) {
        GenreResponseDTO genre = genreService.getGenre(id);
        return new ResponseEntity<>(genre, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<GenreResponseDTO> updateGenre(@PathVariable("id") long id,
            @RequestBody GenreRequestDTO genreRequestDTO) {
        GenreResponseDTO updatedGenre = genreService.updateGenre(id, genreRequestDTO);
        return new ResponseEntity<>(updatedGenre, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<GenreResponseDTO> deleteGenre(@PathVariable("id") long id) {
        GenreResponseDTO deletedGenre = genreService.deleteGenre(id);
        return new ResponseEntity<>(deletedGenre, HttpStatus.OK);
    }

    @GetMapping("/{id}/books")
    public ResponseEntity<List<BookResponseDTO>> getBooksOfGenre(@PathVariable("id") long id) {
        List<BookResponseDTO> books = genreService.getBooksOfParticularGenre(id);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

}
