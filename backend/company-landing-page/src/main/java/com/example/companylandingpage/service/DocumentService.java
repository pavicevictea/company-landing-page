package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.DocumentDto;
import com.example.companylandingpage.model.Document;
import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.DocumentRepository;
import com.example.companylandingpage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class DocumentService {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> ALLOWED_TYPES = Set.of("application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg");

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final Path uploadDirectory;

    public DocumentService(DocumentRepository documentRepository, UserRepository userRepository, @Value("${file.upload-dir:uploads}") String uploadDir) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.uploadDirectory = Paths.get(uploadDir).toAbsolutePath().normalize();
        try{
            Files.createDirectories(uploadDirectory);
        } catch (IOException e){
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a file");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size must not exceed 10 MB");
        }

        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported file type. Allowed types: PDF, DOC, DOCX, PNG and JPG");
        }
    }

    private String getExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        if (lastDot == -1) {
            return "";
        }
        return filename.substring(lastDot).toLowerCase();
    }

    public DocumentDto uploadFile(MultipartFile file, String username) {
        validateFile(file);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new IllegalArgumentException("File name is invalid");
        }

        originalFilename = Paths.get(originalFilename).getFileName().toString();

        String extension = getExtension(originalFilename);
        String storedFilename = UUID.randomUUID() + extension;
        Path targetPath = uploadDirectory.resolve(storedFilename).normalize();

        try{
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Could not store file", e);
        }

        Document document = new Document(
                originalFilename,
                storedFilename,
                file.getContentType(),
                file.getSize(),
                LocalDateTime.now(),
                user
        );
        return new DocumentDto(documentRepository.save(document));
    }

    public List<DocumentDto> getUserDocuments(String username) {
        return documentRepository
                .findByUserUsernameOrderByUploadedAtDesc(username)
                .stream()
                .map(DocumentDto::new)
                .toList();
    }

    public Document getDocument(Long id, String username) {
        return documentRepository.findByIdAndUserUsername(id, username).orElseThrow(() -> new IllegalArgumentException("Document not found"));
    }

    public Resource downloadFile(Long id, String username) {
        Document document = getDocument(id, username);
        Path filePath = uploadDirectory.resolve(document.getStoredFilename()).normalize();

        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new IllegalArgumentException("File not found");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not read file", e);
        }
    }

    public void deleteFile(Long id, String username) {
        Document document = getDocument(id, username);
        Path filePath = uploadDirectory.resolve(document.getStoredFilename()).normalize();

        try{
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file", e);
        }
        documentRepository.delete(document);
    }
}
