package com.lms.libraryService.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookIssue {

    @Id
    @GeneratedValue
    private long bookIssueId;

    private Books book; // book object

    private BookInstance bookInstance; // bookInstance object

    private Member member; // member object

    private Date dateOfIssue;

    private Date dateOfReturn;

    private String user; // user object

}
