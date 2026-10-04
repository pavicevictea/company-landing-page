package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.ContactRequest;
import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.ContactInquiryRepository;
import com.example.companylandingpage.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ContactService {

    private final ContactInquiryRepository repository;
    private final UserRepository userRepository;
    private final DocumentService documentService;

    public ContactService(ContactInquiryRepository repository, UserRepository userRepository, DocumentService documentService){
        this.repository = repository;
        this.userRepository = userRepository;
        this.documentService = documentService;
    }

    public ContactInquiry createInquiry(ContactRequest request, String username, MultipartFile file){
        User user = null;
        if (username != null) {
            user = userRepository.findByUsername(username).orElseThrow( () -> new IllegalArgumentException("User not found"));
        }

        if (file != null && !file.isEmpty() && user == null) {
            throw new IllegalArgumentException("You must be logged in to upload a file");
        }

        ContactInquiry inquiry = new ContactInquiry(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage(),
                user
        );
        ContactInquiry savedInquiry = repository.save(inquiry);
        if (file != null && !file.isEmpty()) {
            documentService.uploadFile(file, savedInquiry);
        }
        return savedInquiry;
    }

}
