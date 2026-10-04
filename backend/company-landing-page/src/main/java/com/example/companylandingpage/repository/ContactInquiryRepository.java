package com.example.companylandingpage.repository;

import com.example.companylandingpage.model.ContactInquiry;
import com.example.companylandingpage.model.InquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {
    @Query("""
            SELECT c FROM ContactInquiry c
            WHERE
                (:search IS NULL OR
                    LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                    LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')) OR
                    LOWER(c.subject) LIKE LOWER(CONCAT('%', :search, '%')) OR
                    LOWER(c.message) LIKE LOWER(CONCAT('%', :search, '%'))
                )
                AND (:status IS NULL OR c.status = :status)
                AND (
                    :attachments = 'all'
                    OR (:attachments = 'with' AND SIZE(c.documents) > 0)
                    OR (:attachments = 'without' AND SIZE(c.documents) = 0)
                )
            """)
    List<ContactInquiry> searchAndFilter(
            @Param("search") String search,
            @Param("status") InquiryStatus status,
            @Param("attachments") String attachments
    );

    List<ContactInquiry> findByUserUsernameOrderByIdDesc(String username);
    Optional<ContactInquiry> findByIdAndUserUsername(Long id, String username);
}
