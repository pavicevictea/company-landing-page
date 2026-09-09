package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ContactRequest;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public ContactInquiry createInquiry(@Valid @RequestBody ContactRequest request){
        return contactService.createInquiry(request);
    }
}
