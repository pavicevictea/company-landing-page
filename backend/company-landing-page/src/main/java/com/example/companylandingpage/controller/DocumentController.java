package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.DocumentDto;
import com.example.companylandingpage.model.Document;
import com.example.companylandingpage.service.DocumentService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id, Authentication authentication) {
        boolean isStaff = authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN") || authority.getAuthority().equals("ROLE_EMPLOYEE"));

        Document document;
        Resource resource;

        if (isStaff) {
            document = documentService.getDocumentForStaff(id);
            resource = documentService.downloadFileForStaff(id);
        } else {
            String username = authentication.getName();
            document = documentService.getDocument(id, username);
            resource = documentService.downloadFile(id, username);
        }

        MediaType mediaType;

        try {
            mediaType = MediaType.parseMediaType(document.getContentType());
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok().contentType(mediaType).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getOriginalFilename() + "\"").body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id, Authentication authentication) {
        documentService.deleteFile(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
