package com.lms.catalogueService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookInstance {

    @Id
    @GeneratedValue
    private long instanceId;

    @ManyToOne
    private Books book;

    private String imprint;

    private String status;  // issue, not issue

    @OneToOne
    private Bookshelf bookshelf;
}
