package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.ContactRequest;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.repository.ContactInquiryRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactInquiryRepository repository;

    public ContactService(ContactInquiryRepository repository){
        this.repository = repository;
    }

    public ContactInquiry createInquiry(ContactRequest request){
        ContactInquiry inquiry = new ContactInquiry(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage()
        );
        return repository.save(inquiry);
    }

}
