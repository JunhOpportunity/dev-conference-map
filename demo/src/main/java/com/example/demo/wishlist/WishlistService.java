package com.example.demo.wishlist;

import com.example.demo.conference.entity.ConferenceEntity;
import com.example.demo.conference.repository.ConferenceRepository;
import com.example.demo.conference.repository.RegistrationPeriodRepository;
import com.example.demo.login.UserEntity;
import com.example.demo.login.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class WishlistService {

        @Autowired
        private ConferenceRepository conferenceRepository;

        @Autowired
        private RegistrationPeriodRepository registrationPeriodRepository;


        @Autowired
        private WishlistRepository wishlistRepository;

        @Autowired
        private UserRepository userRepository; // UserRepository 추가

        public void addConferenceToWishlist(Long userId, Long confId) {
                // 1. UserEntity 가져오기
                UserEntity user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                // 2. conference title 가져오기
                String confName = conferenceRepository.findById(confId)
                        .map(conference -> conference.getTitle())
                        .orElseThrow(() -> new RuntimeException("Conference not found"));

                // 3. registration_periods에서 end_date 가져오기
                LocalDate date = registrationPeriodRepository.findByConferenceId(confId)
                        .map(registrationPeriod -> registrationPeriod.getEndDate())
                        .orElseThrow(() -> new RuntimeException("Registration period not found"));

                // 4. categories에서 "온라인" 또는 "오프라인"이 포함된 category_name 가져오기 (풀네임 그대로 저장)
                String place = conferenceRepository.findById(confId)
                        .map(conference -> conference.getLocation())
                        .orElse(null);
                
                 // 5. 해당 유저와 컨퍼런스가 이미 위시리스트에 있는지 확인
                boolean exists = wishlistRepository.existsByUserIdAndConferenceId(userId, confId);
                if (exists) {
                throw new RuntimeException("Conference is already in the wishlist");
                }

                // 5. WishlistEntity 객체 생성 후 설정
                WishlistEntity wishlistEntity = new WishlistEntity();
                wishlistEntity.setConferenceName(confName);
                wishlistEntity.setDate(date);
                wishlistEntity.setPlace(place);

                // UserEntity와 ConferenceEntity 설정
                wishlistEntity.setUser(user);  // UserEntity와 연결
                ConferenceEntity conference = new ConferenceEntity();
                conference.setId(confId);
                wishlistEntity.setConference(conference); // ConferenceEntity와 연결

                // 6. WishlistEntity 저장
                wishlistRepository.save(wishlistEntity);
        }

        public void removeConferenceFromWishlistById(Long wishlistId) {
                // 위시리스트 항목 조회
                WishlistEntity wishlist = wishlistRepository.findById(wishlistId)
                        .orElseThrow(() -> new RuntimeException("Wishlist item not found"));
        
                // 항목 삭제
                wishlistRepository.delete(wishlist);
        }
}
