package com.example.demo.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    // 특정 게시글에 대한 모든 댓글을 가져오는 메서드
    List<CommentEntity> findByPostId(Long postId);
}
