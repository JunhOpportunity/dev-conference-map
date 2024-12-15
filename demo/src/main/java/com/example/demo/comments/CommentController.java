package com.example.demo.comments;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.comments.dto.CommentDTO;
import com.example.demo.login.UserEntity;
import com.example.demo.login.UserRepository;
import com.example.demo.posts.PostEntity;
import com.example.demo.posts.PostRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostRepository postRepository; // PostRepository를 주입

    @Autowired
    private UserRepository userRepository;

    // 댓글 저장
    @PostMapping("/create")
    public ResponseEntity<String> createComment(@RequestBody CommentEntity commentEntity) {
        Long postId = commentEntity.getPost().getId();
        Long userId = commentEntity.getUser().getId();

        // 게시글 ID로 게시글 조회
        PostEntity post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Invalid Post ID");
        }

        // 유저 ID로 사용자 조회
        UserEntity user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid User ID");
        }

        // 댓글에 게시글과 사용자 설정
        commentEntity.setPost(post);
        commentEntity.setUser(user);
        commentService.saveComment(commentEntity);

        return ResponseEntity.ok("Comment created successfully");
    }

    // 특정 게시글의 모든 댓글 조회
    @GetMapping("/post/{postId}")
    public List<CommentDTO> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }
}
