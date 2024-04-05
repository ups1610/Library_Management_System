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



    private long bookInstance; // bookInstance object

    private long member; // member object

    private Date dateOfIssue;

    private Date dateOfReturn;
    private String returned="No";
    private long issueBy;

}
