package com.example.demo.wishlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {

    // 특정 사용자 ID로 위시리스트 검색
    List<WishlistEntity> findByUserId(Long userId);

    // 특정 컨퍼런스 ID로 위시리스트 검색
    List<WishlistEntity> findByConferenceId(Long conferenceId);

    // 사용자 ID와 컨퍼런스 ID로 특정 위시리스트 항목 검색
    WishlistEntity findByUserIdAndConferenceId(Long userId, Long conferenceId);
    public boolean existsByUserIdAndConferenceId(Long userId, Long confId);
}
