package com.example.companylandingpage.repository;

import com.example.companylandingpage.model.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {
}
