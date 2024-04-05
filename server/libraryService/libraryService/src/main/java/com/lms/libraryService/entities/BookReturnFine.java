package com.lms.libraryService.entities;

import jakarta.persistence.Column;
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
public class BookReturnFine {

    @Id
    @GeneratedValue
    private long fineId;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private String isWavedOff;

    @Column(nullable = false)
    private long transaction_id;

}
