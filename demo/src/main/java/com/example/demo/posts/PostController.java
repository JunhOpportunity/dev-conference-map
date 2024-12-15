package com.example.demo.posts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.login.UserEntity;
import com.example.demo.login.UserService;
import com.example.demo.posts.dto.PostAllDTO;
import com.example.demo.posts.dto.PostCreateDTO;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody PostCreateDTO postDTO) {
        // 유저 확인
        UserEntity user = userService.getUserById(postDTO.getUserId());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid user ID");
        }

        // PostEntity 생성
        PostEntity post = new PostEntity();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setUser(user);

        postService.savePost(post);
        return ResponseEntity.ok("Post created successfully");
    }

    @GetMapping("/all")
    public List<PostAllDTO> getAllPosts() {
        return postService.getAllPosts();  // PostService 사용
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
    boolean isDeleted = postService.deletePost(id);
    if (isDeleted) {
        return ResponseEntity.ok("Post deleted successfully");
    } else {
        return ResponseEntity.badRequest().body("Post not found");
    }
}

}
