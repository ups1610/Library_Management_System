package com.lms.libraryService.entities;

import jakarta.persistence.Entity;
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
public class Fine {

  
    private long fineId;

  
    private BookReturn bookReturn;

    private String isWaveOff;  // fineSet or fineNotSet

  
    private long transaction;

}
