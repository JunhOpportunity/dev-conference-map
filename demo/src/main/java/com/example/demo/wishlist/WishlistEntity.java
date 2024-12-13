package com.example.demo.wishlist;

import com.example.demo.login.UserEntity;
import com.example.demo.conference.entity.ConferenceEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wishlist") // 이 테이블 이름을 "wishlist"로 지정
public class WishlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // 여러 개의 아이템이 하나의 사용자에 속할 수 있으므로 다대일 관계
    @JoinColumn(name = "user_id", referencedColumnName = "id") // "user_id" 외래 키를 사용
    private UserEntity user; // 이 필드는 UserEntity와 연관 관계를 설정합니다.

    @Column(name = "conf_name") // DB의 conf_name과 매핑
    private String conferenceName;

    @Column(name = "date") // DB의 date와 매핑
    private LocalDate date;  // LocalDate로 변경

    @ManyToOne // 컨퍼런스와의 관계 설정 (Many-to-One)
    @JoinColumn(name = "conf_id", referencedColumnName = "id") // "conf_id"를 ConferenceEntity와 연결
    private ConferenceEntity conference; // ConferenceEntity와의 연관 관계

    @Column(name = "place") // DB의 place와 매핑
    private String place;

    // 기본 생성자
    public WishlistEntity() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }

    public String getConferenceName() { return conferenceName; }
    public void setConferenceName(String conferenceName) { this.conferenceName = conferenceName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public ConferenceEntity getConference() { return conference; }
    public void setConference(ConferenceEntity conference) { this.conference = conference; }

    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }
}
