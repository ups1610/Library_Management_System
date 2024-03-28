package com.lms.libraryService.entities;

import java.util.Date;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

    @OneToOne
    private Member member; // member object

    private Date dateOfIssue;

    private Date dateOfReturn;

    private User issueBy;

}
