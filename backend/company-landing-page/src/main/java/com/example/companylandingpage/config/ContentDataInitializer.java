package com.example.companylandingpage.config;

import com.example.companylandingpage.model.ContentItem;
import com.example.companylandingpage.model.ServiceItem;
import com.example.companylandingpage.repository.ContentRepository;
import com.example.companylandingpage.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContentDataInitializer implements CommandLineRunner {
    private final ContentRepository contentRepository;
    private final ServiceRepository serviceRepository;

    public ContentDataInitializer(ContentRepository contentRepository, ServiceRepository serviceRepository) {
        this.contentRepository = contentRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public void run(String... args) {
        List<ContentItem> existingItems = contentRepository.findAll();
        for (ContentItem item : existingItems) {
            if (item.getSection() == null || item.getSection().trim().isEmpty()) {
                item.setSection("dynamic");
                item.setDeletable(true);
            }
        }
        contentRepository.saveAll(existingItems);
        createHeroContent();
        createServices();
        createAboutContent();
    }

    private void createHeroContent() {
        if (!contentRepository.findBySection("hero").isEmpty()) {
            return;
        }
        ContentItem hero = new ContentItem(
                "hero",
                "Software Built Around Your Business",
                "Custom web and software solutions designed to solve real business needs",
                false
        );
        contentRepository.save(hero);
    }

    private void createServices() {
        if (serviceRepository.count() > 0) {
            return;
        }
        serviceRepository.save(new ServiceItem(
                "Web Development",
                "We create websites and web applications that are fast, reliable, and easy to maintain"
        ));
        serviceRepository.save(new ServiceItem(
                "Cloud & DevOps",
                "We set up and manage the infrastructure needed to run your applications reliably"
        ));
        serviceRepository.save(new ServiceItem(
                "Backend Development",
                "We develop APIs, databases, and server-side systems that keep your applications running smoothly"
        ));
        serviceRepository.save(new ServiceItem(
                "Software Maintenance",
                "We maintain and improve existing software to keep it secure, stable, and up to date"
        ));
    }

    private void createAboutContent() {
        if (!contentRepository.findBySection("about").isEmpty()) {
            return;
        }
        contentRepository.save(new ContentItem(
                "about",
                "About Us",
                "Example Dev is a software development company focused on building practical and reliable solutions for businesses.",
                false
        ));
        contentRepository.save(new ContentItem(
                "about",
                "Our Approach",
                "We work on projects ranging from web applications and backend systems to cloud infrastructure and software maintenance. We believe that good software should be easy to use, maintain, and adapt as a business grows.",
                false
        ));
        contentRepository.save(new ContentItem(
                "about",
                "Our Goal",
                "Our goal is simple: to build software that works well today and remains useful as our clients' needs change over time.",
                false
        ));
    }
}
