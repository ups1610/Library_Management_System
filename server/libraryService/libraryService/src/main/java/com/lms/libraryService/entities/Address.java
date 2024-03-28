package com.lms.libraryService.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue
    private long addressId;

    private String landmark;

    private String currentAddress;

    private String permanentAddress;

    private String city;

    private String district;

    private String state;

    private String pincode;

}

