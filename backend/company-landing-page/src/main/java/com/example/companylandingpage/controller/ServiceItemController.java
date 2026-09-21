package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ServiceCreateRequest;
import com.example.companylandingpage.dto.ServiceUpdateRequest;
import com.example.companylandingpage.model.ServiceItem;
import com.example.companylandingpage.service.ServiceItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ServiceItemController {

    private final ServiceItemService serviceItemService;

    public ServiceItemController(ServiceItemService serviceItemService) {
        this.serviceItemService = serviceItemService;
    }

    @GetMapping
    public List<ServiceItem> getAll() {
        return serviceItemService.getAll();
    }

    @GetMapping("/{id}")
    public ServiceItem getById(@PathVariable Long id) {
        return serviceItemService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceItem create(@Valid @RequestBody ServiceCreateRequest request) {
        return serviceItemService.create(request);
    }

    @PutMapping("/{id}")
    public ServiceItem update(@PathVariable Long id, @Valid @RequestBody ServiceUpdateRequest request) {
        return serviceItemService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        serviceItemService.delete(id);
    }
}
