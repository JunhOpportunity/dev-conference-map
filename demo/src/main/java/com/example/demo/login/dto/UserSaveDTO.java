package com.example.demo.login.dto;

import java.util.List;

import com.example.demo.posts.dto.PostUserDTO;

public class UserSaveDTO {
    private String password;
    private String name;
    private String email;
    private String interest;
    private List<PostUserDTO> posts; // 게시글 목록을 담을 필드 추가

    // 기본 생성자
    public UserSaveDTO() {}

    // Getter와 Setter 메서드: 각 필드의 값을 가져오고 설정할 수 있도록 하는 메서드들
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<PostUserDTO> getPosts() { return posts; }
    public void setPosts(List<PostUserDTO> posts) { this.posts = posts; }
}

/* 
UserDTO: DTO(Data Transfer Object)는 계층 간에 데이터를 전송하는 객체로, 일반적으로 서비스와 컨트롤러 간에 데이터를 주고받을 때 사용됩니다.
Getter와 Setter: 각 필드의 값을 읽거나 수정하기 위해 제공됩니다.
 */