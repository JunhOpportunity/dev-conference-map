package com.example.demo.conference.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class CategoryEntity {

    @Id  // ID 필드를 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ID 값 자동 생성 전략
    private Long id;

    private String categoryName;

    @ManyToOne
    @JoinColumn(name = "conference_id")
    private ConferenceEntity conference;

    // Getter and Setter methods
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public ConferenceEntity getConference() { return conference; }
    public void setConference(ConferenceEntity conference) { this.conference = conference; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}

/*
CategoryEntity
역할: 컨퍼런스의 카테고리를 데이터베이스에 저장하기 위한 JPA 엔티티.
카테고리 이름과 컨퍼런스와의 관계를 정의.
 */