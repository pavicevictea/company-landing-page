package com.example.companylandingpage.dto;

public class ContentCreateRequest {

    private String title;

    private String content;

    public ContentCreateRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
