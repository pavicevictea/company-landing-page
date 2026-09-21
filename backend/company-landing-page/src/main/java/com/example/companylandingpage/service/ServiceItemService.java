package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.ServiceCreateRequest;
import com.example.companylandingpage.dto.ServiceUpdateRequest;
import com.example.companylandingpage.model.ServiceItem;
import com.example.companylandingpage.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceItemService {

    private final ServiceRepository serviceRepository;

    public ServiceItemService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceItem> getAll() {
        return serviceRepository.findAll();
    }

    public ServiceItem getById(Long id) {
        return serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
    }

    public ServiceItem create(ServiceCreateRequest request) {
        ServiceItem service = new ServiceItem(request.getTitle(), request.getDescription());
        return serviceRepository.save(service);
    }

    public ServiceItem update(Long id, ServiceUpdateRequest request) {
        ServiceItem existing = getById(id);
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        return serviceRepository.save(existing);
    }

    public void delete(Long id) {
        ServiceItem existing = getById(id);
        serviceRepository.delete(existing);
    }
}
