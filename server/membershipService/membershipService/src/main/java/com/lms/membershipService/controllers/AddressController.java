package com.lms.membershipService.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.membershipService.dto.AddressRequestDTO;
import com.lms.membershipService.dto.AddressResponseDTO;
import com.lms.membershipService.services.AddressService;

import lombok.AllArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@AllArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/create")
    public ResponseEntity<AddressResponseDTO> addNewAddress(@RequestBody AddressRequestDTO addressRequest) {
        AddressResponseDTO response = addressService.newAddress(addressRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AddressResponseDTO>> getAllAddresses() {
        List<AddressResponseDTO> addresses = addressService.getAllAddresses();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> getAddress(@PathVariable("id") long id) {
        AddressResponseDTO address = addressService.getAddress(id);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<AddressResponseDTO> updateAddress(@PathVariable("id") long id,
            @RequestBody AddressRequestDTO addressRequest) {
        AddressResponseDTO updatedAddress = addressService.updateAddress(id, addressRequest);
        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<AddressResponseDTO> deleteAddress(@PathVariable("id") long id) {
        AddressResponseDTO deletedAddress = addressService.deleteAddress(id);
        return new ResponseEntity<>(deletedAddress, HttpStatus.OK);
    }
}
