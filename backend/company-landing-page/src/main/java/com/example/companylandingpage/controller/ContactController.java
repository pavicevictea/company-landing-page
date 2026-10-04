package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ContactRequest;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService service){
        this.contactService = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactInquiry createInquiry(@Valid @RequestBody ContactRequest request, @RequestPart(value = "file", required = false) MultipartFile file, Authentication authentication){
        String username = null;
        if (authentication != null && authentication.isAuthenticated()) {
            username = authentication.getName();
        }
        return contactService.createInquiry(request, username, file);
    }
}
