package com.example.demo.login.dto;

import java.util.List;

import com.example.demo.posts.dto.PostUserDTO;
import com.example.demo.wishlist.dto.WishlistUserDTO;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String interest;
    private List<PostUserDTO> posts; // 게시글 목록을 담을 필드 추가
    private List<WishlistUserDTO> wishlist; // 위시리스트 항목 추가

    // 기본 생성자
    public UserDTO() {}

    // Getter와 Setter 메서드: 각 필드의 값을 가져오고 설정할 수 있도록 하는 메서드들
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }

    public List<PostUserDTO> getPosts() { return posts; }
    public void setPosts(List<PostUserDTO> posts) { this.posts = posts; }

    public List<WishlistUserDTO> getWishlist() { return wishlist; }
    public void setWishlist(List<WishlistUserDTO> wishlist) { this.wishlist = wishlist; }
}

/* 
UserDTO: DTO(Data Transfer Object)는 계층 간에 데이터를 전송하는 객체로, 일반적으로 서비스와 컨트롤러 간에 데이터를 주고받을 때 사용됩니다.
Getter와 Setter: 각 필드의 값을 읽거나 수정하기 위해 제공됩니다.
 */