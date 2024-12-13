package com.example.demo.login;

import jakarta.persistence.*;
// import java.util.List;

@Entity // 이 클래스는 JPA 엔티티 클래스임을 명시
@Table(name = "users") // 데이터베이스 테이블 이름을 "users"로 지정
public class UserEntity {
    @Id // id 필드를 기본 키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 값은 자동 증가로 생성
    private Long id;

    @Column(nullable = false) // name 필드는 필수 입력 사항
    private String name;

    @Column(nullable = false, unique = true) // email 필드는 필수이며, 중복되지 않도록 유니크 제약 조건을 추가
    private String email;

    @Column(nullable = false)
    private String password;

    private String interest; // 관심사 필드는 선택 사항

    // 기본 생성자
    public UserEntity() {}

    // Getters and Setters: 각 필드에 대한 getter와 setter 메서드
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }
}

/* 
@Entity: JPA 엔티티 클래스임을 지정합니다. 이 클래스는 데이터베이스 테이블과 매핑됩니다.
@Table(name = "users"): 이 클래스가 매핑되는 테이블 이름을 "users"로 지정합니다.
@Id: 이 필드는 테이블의 기본 키(primary key)로 설정됩니다.
@GeneratedValue(strategy = GenerationType.IDENTITY): 기본 키의 값은 자동으로 증가하도록 설정됩니다.
@Column: 각 필드를 데이터베이스 컬럼과 매핑합니다. nullable = false는 필수 입력 항목임을 지정하고, unique = true는 유니크 제약을 설정합니다.
 */