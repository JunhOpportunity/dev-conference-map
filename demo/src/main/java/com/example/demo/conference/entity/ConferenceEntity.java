package com.example.demo.conference.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "conferences")
public class ConferenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String organizer;
    private String website;
    private String location; // 온라인/오프라인 정보 저장

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistrationPeriodEntity> registrationPeriods = new ArrayList<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<CategoryEntity> categories = new ArrayList<>();

    // Getter and Setter methods
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public List<RegistrationPeriodEntity> getRegistrationPeriods() { return registrationPeriods; }
    public void setRegistrationPeriods(List<RegistrationPeriodEntity> registrationPeriods) { this.registrationPeriods = registrationPeriods; }

    public List<CategoryEntity> getCategories() { return categories; }
    public void setCategories(List<CategoryEntity> categories) { this.categories = categories; }
}

/*
ConferenceEntity
역할: 컨퍼런스 데이터를 데이터베이스에 저장하기 위한 JPA 엔티티.
RegistrationPeriodEntity와 CategoryEntity와의 관계를 정의.
 */