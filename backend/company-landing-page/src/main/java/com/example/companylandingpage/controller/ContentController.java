package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ContentCreateRequest;
import com.example.companylandingpage.dto.ContentUpdateRequest;
import com.example.companylandingpage.model.ContentItem;
import com.example.companylandingpage.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public List<ContentItem> getAll() {
        return contentService.getAll();
    }

    @GetMapping("/{id}")
    public ContentItem getById(@PathVariable Long id) {
        return contentService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContentItem create(@RequestBody ContentCreateRequest request) {
        return  contentService.create(request);
    }

    @PutMapping("/{id}")
    public ContentItem update(@PathVariable Long id, @RequestBody ContentUpdateRequest request) {
        return contentService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        contentService.delete(id);
    }

    @GetMapping("/section/{section}")
    public List<ContentItem> getBySection(@PathVariable String section) {
        return contentService.getBySection(section);
    }
}
