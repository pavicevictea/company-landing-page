package com.example.companylandingpage.dto;

public class ContentUpdateRequest {

    private String title;

    private String content;

    public ContentUpdateRequest() {}

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
