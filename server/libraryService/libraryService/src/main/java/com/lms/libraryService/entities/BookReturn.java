package com.lms.libraryService.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookReturn {

    @Id
    @GeneratedValue
    private long bookReturnId;

    @OneToOne
    private BookIssue bookIssue;

    @OneToOne
    private Member member;
    private Date date;

    @OneToOne
    private User collectBy;

}
