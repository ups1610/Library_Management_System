package com.lms.membershipService.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.AddressRequestDTO;
import com.lms.membershipService.dto.AddressResponseDTO;

@Service
public interface AddressService {
    AddressResponseDTO newAddress(AddressRequestDTO addressRequest);

    AddressResponseDTO updateAddress(long id, AddressRequestDTO addressRequest);

    AddressResponseDTO deleteAddress(long id);

    AddressResponseDTO getAddress(long id);

    List<AddressResponseDTO> getAllAddresses();
}
