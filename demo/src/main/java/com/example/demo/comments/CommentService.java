package com.example.demo.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.comments.dto.CommentDTO;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

     // 댓글 저장
    public void saveComment(CommentEntity comment) {
        // 댓글을 저장하는 로직
        commentRepository.save(comment);
    }

    // 특정 게시글의 모든 댓글을 반환하는 메서드
    public List<CommentDTO> getCommentsByPostId(Long postId) {
        List<CommentEntity> comments = commentRepository.findByPostId(postId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        return comments.stream().map(comment -> {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            commentDTO.setPostId(comment.getPost().getId());
            commentDTO.setUserName(comment.getUser().getName());
            commentDTO.setContent(comment.getContent());
            commentDTO.setCreatedAt(dateFormat.format(comment.getCreatedAt()));

            return commentDTO;
        }).collect(Collectors.toList());
    }
}
