package com.lms.libraryService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.entities.Fine;
import com.lms.libraryService.repository.FineRepository;
import com.lms.libraryService.service.FineService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;

    @Override
    public FineResponseDTO newFine(FineRequestDTO fineRequest) {
        Fine fine = new Fine();
        fine.setBookReturn(fineRequest.bookReturn());
        fine.setIsWaveOff(fineRequest.isWaveOff());
        fine.setTransaction(fineRequest.transaction());
        fine = fineRepository.save(fine);
        return mapToFineResponseDTO(fine);
    }

    @Override
    public FineResponseDTO updateFine(long id, FineRequestDTO fineRequest) {
        Fine fine = fineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fine with ID " + id + " not found"));
        fine = fineRepository.save(fine);
        return mapToFineResponseDTO(fine);
    }

    @Override
    public FineResponseDTO deleteFine(long id) {
        Fine fine = fineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fine with ID " + id + " not found"));
        fineRepository.deleteById(id);
        return mapToFineResponseDTO(fine);
    }

    @Override
    public FineResponseDTO getFine(long id) {
        Fine fine = fineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fine with ID " + id + " not found"));
        return mapToFineResponseDTO(fine);
    }

    @Override
    public List<FineResponseDTO> getAllFine() {
        List<Fine> fines = fineRepository.findAll();
        return fines.stream().map(this::mapToFineResponseDTO).collect(Collectors.toList());
    }

    private FineResponseDTO mapToFineResponseDTO(Fine fine) {
        return new FineResponseDTO(
            fine.getFineId(),
            fine.getBookReturn(),
            fine.getIsWaveOff(),
            fine.getTransaction()
        );
    }
}
