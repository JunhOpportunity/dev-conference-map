package com.example.demo.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.comments.CommentRepository;
import com.example.demo.comments.dto.CommentAllDTO;
import com.example.demo.posts.dto.PostAllDTO;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    public void savePost(PostEntity post) {
        postRepository.save(post);
    }

    public boolean deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }    

    // 모든 게시글 목록을 반환하는 메서드
    public List<PostAllDTO> getAllPosts() {
        List<PostEntity> posts = postRepository.findAll();

        // posts가 null이면 빈 리스트 반환
        if (posts == null) {
            return new ArrayList<>();
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        return posts.stream().map(post -> {
            // Post 데이터를 DTO로 변환
            PostAllDTO postDTO = new PostAllDTO();
            postDTO.setId(post.getId());
            postDTO.setTitle(post.getTitle());
            postDTO.setName(post.getUser().getName());
            postDTO.setDate(dateFormat.format(post.getCreatedAt()));
            postDTO.setContent(post.getContent());


            // 댓글 데이터를 DTO로 변환하여 추가
            List<CommentAllDTO> comments = commentRepository.findByPostId(post.getId())
                    .stream()
                    .map(comment -> {
                        CommentAllDTO commentAllDTO = new CommentAllDTO();
                        commentAllDTO.setName(comment.getUser().getName());
                        commentAllDTO.setNameId(comment.getUser().getId());
                        commentAllDTO.setDate(dateFormat.format(comment.getCreatedAt()));
                        commentAllDTO.setContent(comment.getContent());
                        return commentAllDTO;
                    }).collect(Collectors.toList());

            postDTO.setComments(comments);
            return postDTO;
        }).collect(Collectors.toList());
    }
}
