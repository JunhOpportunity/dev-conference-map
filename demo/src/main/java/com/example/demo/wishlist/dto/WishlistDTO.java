package com.example.demo.wishlist.dto;

import com.example.demo.conference.entity.ConferenceEntity;
import com.example.demo.login.UserEntity;
import com.example.demo.wishlist.WishlistEntity;

import java.time.LocalDate;

public class WishlistDTO {
    private Long id;
    private String conferenceName;
    private LocalDate date; // LocalDate로 변경
    private Long conferenceId; // ConferenceEntity의 ID
    private String place;
    private Long userId; // UserEntity의 ID

    // 기본 생성자
    public WishlistDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getConferenceName() { return conferenceName; }
    public void setConferenceName(String conferenceName) { this.conferenceName = conferenceName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Long getConferenceId() { return conferenceId; }
    public void setConferenceId(Long conferenceId) { this.conferenceId = conferenceId; }

    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    // DTO -> Entity 변환
    public WishlistEntity toEntity() {
        WishlistEntity entity = new WishlistEntity();
        entity.setId(this.id);
        entity.setConferenceName(this.conferenceName);
        entity.setDate(this.date); // LocalDate로 설정
        entity.setPlace(this.place);

        // ConferenceEntity와 연결
        ConferenceEntity conference = new ConferenceEntity();
        conference.setId(this.conferenceId);  // ConferenceEntity에서 ID로 설정
        entity.setConference(conference);

        // UserEntity와 연결
        UserEntity user = new UserEntity();
        user.setId(this.userId);  // UserEntity에서 ID를 설정
        entity.setUser(user);

        return entity;
    }

    // Entity -> DTO 변환 (Optional, 필요시 사용)
    public static WishlistDTO fromEntity(WishlistEntity entity) {
        WishlistDTO dto = new WishlistDTO();
        dto.setId(entity.getId());
        dto.setConferenceName(entity.getConferenceName());
        dto.setDate(entity.getDate());
        dto.setPlace(entity.getPlace());
        dto.setConferenceId(entity.getConference() != null ? entity.getConference().getId() : null);  // 컨퍼런스 ID 설정
        dto.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);  // 사용자 ID 설정
        return dto;
    }
}
