package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.ContactInquiry;

import java.util.List;

public class ContactInquiryDto {

    private Long id;

    private String name;

    private String email;

    private String subject;

    private String message;

    private String status;

    private List<DocumentDto> documents;

    public ContactInquiryDto(ContactInquiry inquiry) {
        this.id = inquiry.getId();
        this.name = inquiry.getName();
        this.email = inquiry.getEmail();
        this.subject = inquiry.getSubject();
        this.message = inquiry.getMessage();
        this.status = inquiry.getStatus().name();
        this.documents = inquiry.getDocuments().stream().map(DocumentDto::new).toList();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public List<DocumentDto> getDocuments() {
        return documents;
    }
}
