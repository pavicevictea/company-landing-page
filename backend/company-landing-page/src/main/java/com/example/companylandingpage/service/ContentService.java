package com.example.companylandingpage.service;

import com.example.companylandingpage.model.ContentItem;
import com.example.companylandingpage.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<ContentItem> getAll() {
        return contentRepository.findAll();
    }

    public ContentItem getById(Long id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));
    }

    public ContentItem create(ContentItem contentItem) {
        return contentRepository.save(contentItem);
    }

    public ContentItem update(Long id, ContentItem updatedItem) {
        ContentItem existing = getById(id);
        existing.setTitle(updatedItem.getTitle());
        existing.setContent(updatedItem.getContent());
        return contentRepository.save(existing);
    }

    public void delete(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found");
        }
        contentRepository.deleteById(id);
    }
}
