package com.lms.catalogueService.entities;


import java.util.ArrayList;
import java.util.Date;
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
public class Author {

    @Id
    @GeneratedValue
    private long authorId;

    private String firstName;

    private String familyName;

    private Date dob;

    private String biography;

    @OneToMany(mappedBy = "author")
    List<Books> books=new ArrayList<>() ;
}
