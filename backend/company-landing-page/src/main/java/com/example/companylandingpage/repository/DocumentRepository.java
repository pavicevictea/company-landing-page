package com.example.companylandingpage.repository;

import com.example.companylandingpage.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findByIdAndInquiryUserUsername(Long id, String username);
}
