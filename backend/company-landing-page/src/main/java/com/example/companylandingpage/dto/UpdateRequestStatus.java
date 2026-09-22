package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.InquiryStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateRequestStatus {

    @NotNull
    private InquiryStatus status;

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }
}
