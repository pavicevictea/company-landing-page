package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.Document;

import java.time.LocalDateTime;

public class DocumentDto {

    private Long id;

    private String originalFilename;

    private String contentType;

    private long size;

    private LocalDateTime uploadedAt;

    public DocumentDto(Document document) {
        this.id = document.getId();
        this.originalFilename = document.getOriginalFilename();
        this.contentType = document.getContentType();
        this.size = document.getSize();
        this.uploadedAt = document.getUploadedAt();
    }

    public Long getId() {
        return id;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public String getContentType() {
        return contentType;
    }

    public long getSize() {
        return size;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
}
