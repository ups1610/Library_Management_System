package com.lms.membershipService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Addr")
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
