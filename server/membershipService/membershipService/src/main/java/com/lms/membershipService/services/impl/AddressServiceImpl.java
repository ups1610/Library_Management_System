package com.lms.membershipService.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.AddressRequestDTO;
import com.lms.membershipService.dto.AddressResponseDTO;
import com.lms.membershipService.entities.Address;
import com.lms.membershipService.repositories.AddressRepository;
import com.lms.membershipService.services.AddressService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public AddressResponseDTO newAddress(AddressRequestDTO addressRequest) {
        Address address = mapToAddressEntity(addressRequest);
        address = addressRepository.save(address);
        return mapToAddressResponseDTO(address);
    }

    @Override
    public AddressResponseDTO updateAddress(long id, AddressRequestDTO addressRequest) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + id));
        updateAddressEntity(address, addressRequest);
        address = addressRepository.save(address);
        return mapToAddressResponseDTO(address);
    }

    @Override
    public AddressResponseDTO deleteAddress(long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + id));
        addressRepository.deleteById(id);
        return mapToAddressResponseDTO(address);
    }

    @Override
    public AddressResponseDTO getAddress(long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + id));
        return mapToAddressResponseDTO(address);
    }

    @Override
    public List<AddressResponseDTO> getAllAddresses() {
        return addressRepository.findAll().stream()
                .map(this::mapToAddressResponseDTO)
                .collect(Collectors.toList());
    }

    private Address mapToAddressEntity(AddressRequestDTO addressRequest) {
        Address address = new Address();
        address.setLandmark(addressRequest.landmark());
        address.setCurrentAddress(addressRequest.currentAddress());
        address.setPermanentAddress(addressRequest.permanentAddress());
        address.setCity(addressRequest.city());
        address.setDistrict(addressRequest.district());
        address.setState(addressRequest.state());
        address.setPincode(addressRequest.pincode());
        return address;
    }

    private void updateAddressEntity(Address address, AddressRequestDTO addressRequest) {
        address.setLandmark(addressRequest.landmark());
        address.setCurrentAddress(addressRequest.currentAddress());
        address.setPermanentAddress(addressRequest.permanentAddress());
        address.setCity(addressRequest.city());
        address.setDistrict(addressRequest.district());
        address.setState(addressRequest.state());
        address.setPincode(addressRequest.pincode());
    }

    private AddressResponseDTO mapToAddressResponseDTO(Address address) {
        return new AddressResponseDTO(
                address.getAddressId(),
                address.getLandmark(),
                address.getCurrentAddress(),
                address.getPermanentAddress(),
                address.getCity(),
                address.getDistrict(),
                address.getState(),
                address.getPincode()
        );
    }
}
