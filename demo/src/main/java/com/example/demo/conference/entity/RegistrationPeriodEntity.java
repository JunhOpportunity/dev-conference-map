package com.example.demo.conference.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "registration_periods")
public class RegistrationPeriodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "conference_id")
    private ConferenceEntity conference;

    // Getter and Setter methods
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public ConferenceEntity getConference() { return conference; }
    public void setConference(ConferenceEntity conference) { this.conference = conference; }
}

/*
RegistrationPeriodEntity
역할: 컨퍼런스의 접수 기간을 데이터베이스에 저장하기 위한 JPA 엔티티.
시작 날짜와 종료 날짜를 저장하며, ConferenceEntity와의 관계를 정의.
 */