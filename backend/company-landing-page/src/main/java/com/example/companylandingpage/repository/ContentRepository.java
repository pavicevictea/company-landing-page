package com.example.companylandingpage.repository;

import com.example.companylandingpage.model.ContentItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<ContentItem, Long> {
    List<ContentItem> findBySection(String section);
    List<ContentItem> findBySectionOrderByIdAsc(String section);
}
