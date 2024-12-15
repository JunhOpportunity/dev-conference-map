package com.example.demo.conference.dto;

import java.util.List;

public class ConferenceDTO {
    private Long id;
    private String title;
    private List<CategoryDTO> category;
    private String organizer;
    private List<RegistrationPeriodDTO> registrationPeriods;
    private String website;
    private String location; // 추가된 필드

    public ConferenceDTO() { }

    public ConferenceDTO(Long id, String title, List<CategoryDTO> category, String organizer, List<RegistrationPeriodDTO> registrationPeriods, String website, String location) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.organizer = organizer;
        this.registrationPeriods = registrationPeriods;
        this.website = website;
        this.location = location; // 추가된 필드 초기화
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<CategoryDTO> getCategory() { return category; }
    public void setCategory(List<CategoryDTO> category) { this.category = category; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public List<RegistrationPeriodDTO> getRegistrationPeriods() { return registrationPeriods; }
    public void setRegistrationPeriods(List<RegistrationPeriodDTO> registrationPeriods) { this.registrationPeriods = registrationPeriods; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
