package com.example.companylandingpage.controller;

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
    public ContentItem create(@Valid @RequestBody ContentItem contentItem) {
        return  contentService.create(contentItem);
    }

    @PutMapping("/id")
    public ContentItem update(@PathVariable Long id, @Valid @RequestBody ContentItem contentItem) {
        return contentService.update(id, contentItem);
    }

    @DeleteMapping("/id")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        contentService.delete(id);
    }
}
