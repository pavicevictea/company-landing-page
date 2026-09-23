package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.CustomerRequestDto;
import com.example.companylandingpage.dto.UpdateRequestStatus;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.repository.ContactInquiryRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/requests")
public class AdminRequestController {

    private final ContactInquiryRepository inquiryRepository;

    public AdminRequestController(ContactInquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @GetMapping
    public List<CustomerRequestDto> getAllRequests() {
        return inquiryRepository.findAll()
                .stream()
                .map(CustomerRequestDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerRequestDto> getRequestById(@PathVariable Long id) {
        return inquiryRepository.findById(id)
                .map(CustomerRequestDto::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomerRequestDto> updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateRequestStatus request) {
        return inquiryRepository.findById(id)
                .map(inquiry -> {
                    inquiry.setStatus(request.getStatus());
                    ContactInquiry saved = inquiryRepository.save(inquiry);
                    return ResponseEntity.ok(new CustomerRequestDto(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
