package com.lms.catalogueService.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bookshelf {

    @Id
    @GeneratedValue
    private long shelfId;

    private String shelfName;

    private String location;

    private long capacity;

    private String description;

    @OneToMany(mappedBy = "bookshelf")
    private List<BookInstance> books=new ArrayList<BookInstance>();
}
