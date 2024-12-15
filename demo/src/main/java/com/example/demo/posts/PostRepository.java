package com.example.demo.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    // 모든 게시글을 반환하는 메서드
    @SuppressWarnings("null")
    List<PostEntity> findAll();

    // 사용자 ID로 해당 사용자의 모든 게시글을 가져오는 메서드
    List<PostEntity> findByUserId(Long userId);
}
