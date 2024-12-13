package com.example.demo.posts.dto;

import java.util.List;

import com.example.demo.comments.dto.CommentAllDTO;

public class PostAllDTO {
    private Long id;
    private String title;
    private String name; // 작성자 이름
    private String date; // 작성 날짜
    private String content; // 게시글 내용
    private int likes; // 좋아요 수
    private List<CommentAllDTO> comments; // 댓글 리스트

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

    public List<CommentAllDTO> getComments() { return comments; }
    public void setComments(List<CommentAllDTO> comments) { this.comments = comments; }
}
