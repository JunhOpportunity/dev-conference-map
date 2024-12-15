package com.example.demo.conference.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.conference.entity.RegistrationPeriodEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationPeriodRepository extends JpaRepository<RegistrationPeriodEntity, Long> {

    // 특정 컨퍼런스 ID로 등록 기간 검색
    Optional<RegistrationPeriodEntity> findByConferenceId(Long conferenceId);

    // 종료일이 특정 날짜 이전인 등록 기간 검색
    List<RegistrationPeriodEntity> findByEndDateBefore(java.util.Date date);
}
