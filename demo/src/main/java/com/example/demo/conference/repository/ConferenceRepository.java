package com.example.demo.conference.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.conference.entity.ConferenceEntity;

@Repository
public interface ConferenceRepository extends JpaRepository<ConferenceEntity, Long> {
    // 제목, 웹사이트, 시작 날짜, 종료 날짜를 기준으로 중복 여부 확인
    boolean existsByTitleAndWebsiteAndRegistrationPeriodsStartDateAndRegistrationPeriodsEndDate(
        String title, String website, LocalDate startDate, LocalDate endDate);
}