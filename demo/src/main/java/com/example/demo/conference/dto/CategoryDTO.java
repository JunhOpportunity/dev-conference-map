package com.example.demo.conference.dto;

public class CategoryDTO {

    private String categoryName;

    // 생성자
    public CategoryDTO() { }
    public CategoryDTO(String categoryName) { this.categoryName = categoryName; }

    // Getter 및 Setter 메서드
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}

/*
CategoryDTO
역할: Conference의 카테고리 정보를 관리하는 DTO.
각 카테고리의 이름을 저장.
 */
