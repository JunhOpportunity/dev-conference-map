package com.example.demo.conference.service;

import com.example.demo.conference.dto.CategoryDTO;
import com.example.demo.conference.dto.ConferenceDTO;
import com.example.demo.conference.dto.RegistrationPeriodDTO;
import com.example.demo.conference.entity.CategoryEntity;
import com.example.demo.conference.entity.ConferenceEntity;
import com.example.demo.conference.entity.RegistrationPeriodEntity;
import com.example.demo.conference.repository.ConferenceRepository;
import com.example.demo.conference.dto.ConferenceAllDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConferenceService {

    @Autowired
    private ConferenceRepository conferenceRepository;

    public void saveConferences(List<ConferenceDTO> conferences) {
        for (ConferenceDTO conferenceDTO : conferences) {
            boolean exists = false;

            // 각 등록 기간에 대해 중복 여부 확인
            for (RegistrationPeriodDTO registrationPeriodDTO : conferenceDTO.getRegistrationPeriods()) {
                LocalDate startDate = LocalDate.parse(registrationPeriodDTO.getStart_date());
                LocalDate endDate = LocalDate.parse(registrationPeriodDTO.getEnd_date());

                exists = conferenceRepository.existsByTitleAndWebsiteAndRegistrationPeriodsStartDateAndRegistrationPeriodsEndDate(
                    conferenceDTO.getTitle(), 
                    conferenceDTO.getWebsite(), 
                    startDate, 
                    endDate
                );

                if (exists) {
                    System.out.println("이미 저장된 컨퍼런스: " + conferenceDTO.getTitle());
                    break;
                }
            }

            // 중복이 없을 경우에만 저장
            if (!exists) {
                // ConferenceEntity 생성 및 설정
                ConferenceEntity conferenceEntity = new ConferenceEntity();
                conferenceEntity.setTitle(conferenceDTO.getTitle());
                conferenceEntity.setOrganizer(conferenceDTO.getOrganizer());
                conferenceEntity.setWebsite(conferenceDTO.getWebsite());
                conferenceEntity.setLocation(conferenceDTO.getLocation()); // location 설정

                // CategoryEntity 리스트 생성 및 설정
                List<CategoryEntity> categoryEntities = new ArrayList<>();
                for (CategoryDTO categoryDTO : conferenceDTO.getCategory()) {
                    CategoryEntity categoryEntity = new CategoryEntity();
                    categoryEntity.setCategoryName(categoryDTO.getCategoryName());
                    categoryEntity.setConference(conferenceEntity); // 관계 설정
                    categoryEntities.add(categoryEntity);
                }
                conferenceEntity.setCategories(categoryEntities);

                // RegistrationPeriodEntity 리스트 생성 및 설정
                List<RegistrationPeriodEntity> registrationPeriodEntities = new ArrayList<>();
                for (RegistrationPeriodDTO registrationPeriodDTO : conferenceDTO.getRegistrationPeriods()) {
                    RegistrationPeriodEntity registrationPeriodEntity = new RegistrationPeriodEntity();
                    registrationPeriodEntity.setStartDate(LocalDate.parse(registrationPeriodDTO.getStart_date()));
                    registrationPeriodEntity.setEndDate(LocalDate.parse(registrationPeriodDTO.getEnd_date()));
                    registrationPeriodEntity.setConference(conferenceEntity); // 관계 설정
                    registrationPeriodEntities.add(registrationPeriodEntity);
                }
                conferenceEntity.setRegistrationPeriods(registrationPeriodEntities);

                // DB에 저장
                conferenceRepository.save(conferenceEntity);
            }
        }
    }

    // 모든 컨퍼런스 데이터를 가져와 DTO로 변환
    public List<ConferenceAllDTO> getAllConferences() {
        List<ConferenceEntity> entities = conferenceRepository.findAll();
    
        // 엔티티를 DTO로 변환
        return entities.stream().map(entity -> {
            ConferenceAllDTO dto = new ConferenceAllDTO();
            dto.setId(entity.getId());
            dto.setTitle(entity.getTitle());
            dto.setOrganizer(entity.getOrganizer());
            dto.setWebsite(entity.getWebsite());
            dto.setLocation(entity.getLocation()); // location 추가
    
            // CategoryEntity -> List<String> 변환
            List<String> categories = entity.getCategories().stream()
                    .map(CategoryEntity::getCategoryName)
                    .collect(Collectors.toList());
            dto.setCategory(categories);
    
            // RegistrationPeriodEntity -> List<RegistrationPeriodDTO> 변환
            List<RegistrationPeriodDTO> registrationPeriods = entity.getRegistrationPeriods().stream()
                    .map(rp -> new RegistrationPeriodDTO(rp.getStartDate().toString(), rp.getEndDate().toString()))
                    .collect(Collectors.toList());
            dto.setRegistrationPeriod(registrationPeriods);
    
            return dto;
        }).collect(Collectors.toList());
    }    
}