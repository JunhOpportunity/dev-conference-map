package com.example.demo.comments.dto;

public class CommentAllDTO {
    private String name; // 댓글 작성자 이름
    private Long nameId; // 댓글 작성자 ID
    private String date; // 댓글 작성 날짜
    private String content; // 댓글 내용

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getNameId() { return nameId; }
    public void setNameId(Long nameId) { this.nameId = nameId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
