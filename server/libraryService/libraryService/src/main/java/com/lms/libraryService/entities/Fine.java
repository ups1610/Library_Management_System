package com.lms.libraryService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Fine {

  
    @Id
    @GeneratedValue
    private long fineId;

    @OneToOne
    @JoinColumn(name = "bookReturnId")
    private BookReturn bookReturn;

    private String isWaveOff;  // fineSet or fineNotSet

  
    private long transaction;

}
