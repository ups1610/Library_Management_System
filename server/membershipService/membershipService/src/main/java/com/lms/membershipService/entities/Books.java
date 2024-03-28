package com.lms.membershipService.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Books {

    @Id
    @GeneratedValue
    private long bookId;

    @ManyToOne
    @JoinColumn(name = "authorId")
    private Author author;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Genre> genre;

    @OneToMany(mappedBy = "book")
    private List<BookInstance> instances = new ArrayList<>();

    private String bookTitle;

    private String isbn;

}
