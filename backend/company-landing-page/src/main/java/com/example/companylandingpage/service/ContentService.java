package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.ContentCreateRequest;
import com.example.companylandingpage.dto.ContentUpdateRequest;
import com.example.companylandingpage.model.ContentItem;
import com.example.companylandingpage.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

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

    public ContentItem create(ContentCreateRequest request) {
        ContentItem contentItem = new ContentItem(
                "dynamic",
                request.getTitle(),
                request.getContent(),
                true
        );
        return contentRepository.save(contentItem);
    }

    public ContentItem update(Long id, ContentUpdateRequest request) {
        ContentItem existing = getById(id);
        existing.setTitle(request.getTitle());
        existing.setContent(request.getContent());
        return contentRepository.save(existing);
    }

    public void delete(Long id) {
        ContentItem existing = getById(id);
        if(!existing.isDeletable()) {
            throw new IllegalStateException("Default content cannot be deleted");
        }
        contentRepository.deleteById(id);
    }

    public List<ContentItem> getBySection(String section) {
        return contentRepository.findBySectionOrderByIdAsc(section);
    }
}
