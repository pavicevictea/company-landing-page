package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.model.InquiryStatus;

import java.util.List;

public class CustomerRequestDto {

    private Long id;

    private String name;

    private String email;

    private String subject;

    private String message;

    private InquiryStatus status;

    private List<DocumentDto> documents;

    public CustomerRequestDto() {}

    public CustomerRequestDto(ContactInquiry inquiry) {
        this.id = inquiry.getId();
        this.name = inquiry.getName();
        this.email = inquiry.getEmail();
        this.subject = inquiry.getSubject();
        this.message = inquiry.getMessage();
        this.status = inquiry.getStatus();
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

    public InquiryStatus getStatus() {
        return status;
    }

    public List<DocumentDto> getDocuments() {
        return documents;
    }
}
