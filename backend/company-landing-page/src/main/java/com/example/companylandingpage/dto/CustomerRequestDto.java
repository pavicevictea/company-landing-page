package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.model.InquiryStatus;

public class CustomerRequestDto {

    private Long id;

    private String name;

    private String email;

    private String subject;

    private String message;

    private InquiryStatus status;

    public CustomerRequestDto() {}

    public CustomerRequestDto(ContactInquiry inquiry) {
        this.id = inquiry.getId();
        this.name = inquiry.getName();
        this.email = inquiry.getEmail();
        this.subject = inquiry.getSubject();
        this.message = inquiry.getMessage();
        this.status = inquiry.getStatus();
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
}
