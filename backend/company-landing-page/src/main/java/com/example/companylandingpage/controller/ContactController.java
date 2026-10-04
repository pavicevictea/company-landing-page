package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ContactInquiryDto;
import com.example.companylandingpage.dto.ContactRequest;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService service){
        this.contactService = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactInquiry createInquiry(@RequestParam String name, @RequestParam String email, @RequestParam String subject, @RequestParam String message, @RequestPart(value = "file", required = false) MultipartFile file, Authentication authentication) {
        String username = null;
        if (authentication != null &&
                authentication.isAuthenticated()) {
            username = authentication.getName();
        }
        ContactRequest request = new ContactRequest();
        request.setName(name);
        request.setEmail(email);
        request.setSubject(subject);
        request.setMessage(message);

        return contactService.createInquiry(request, username, file);
    }

    @GetMapping("/my")
    public List<ContactInquiryDto> getMyInquiries(Authentication authentication) {
        return contactService.getUserInquiries(
                authentication.getName()
        );
    }
}
