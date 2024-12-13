package com.example.demo.conference.dto;

import java.util.List;

public class ConferenceAllDTO {
    private Long id;
    private String title;
    private List<String> category;
    private String organizer;
    private List<RegistrationPeriodDTO> registrationPeriod;
    private String website;
    private String location; // 추가된 필드

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<String> getCategory() { return category; }
    public void setCategory(List<String> category) { this.category = category; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public List<RegistrationPeriodDTO> getRegistrationPeriod() { return registrationPeriod; }
    public void setRegistrationPeriod(List<RegistrationPeriodDTO> registrationPeriod) { this.registrationPeriod = registrationPeriod; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
