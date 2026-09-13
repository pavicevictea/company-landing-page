package com.example.companylandingpage.repository;

import com.example.companylandingpage.model.ContentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<ContentItem, Long> {
}
