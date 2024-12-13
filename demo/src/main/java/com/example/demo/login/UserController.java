package com.example.demo.login;

import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.login.dto.LoginDTO;
import com.example.demo.login.dto.UserSaveDTO;
import com.example.demo.login.dto.UserDTO;

@CrossOrigin(origins = "http://localhost:5173") // 프론트엔드가 실행 중인 도메인(포트)에 대한 CORS 허용
@RestController // RESTful 웹 서비스의 컨트롤러임을 나타내는 어노테이션
@RequestMapping("/api/users") // "/api/users" 경로로 시작하는 요청을 처리하는 컨트롤러
public class UserController {

    @Autowired
    private UserService userService; // UserService는 비즈니스 로직을 담당하는 서비스 클래스입니다.

    @PostMapping("/post") // "/post" 경로로 POST 요청이 들어오면 이 메서드가 실행됨
    public ResponseEntity<String> registerUser(@RequestBody UserSaveDTO userDTO) {
        // @RequestBody: 요청 본문에 포함된 JSON 데이터를 UserDTO 객체로 변환하여 전달받음

        // DTO를 엔티티로 변환 후 서비스 클래스에서 DB에 저장
        UserEntity userEntity = new UserEntity(); // UserDTO를 기반으로 UserEntity 객체 생성
        userEntity.setName(userDTO.getName()); // DTO에서 이름 값을 가져와 엔티티에 설정
        userEntity.setEmail(userDTO.getEmail()); // DTO에서 이메일 값을 가져와 엔티티에 설정
        userEntity.setPassword(PasswordUtil.encodePassword(userDTO.getPassword()));
        userEntity.setInterest(userDTO.getInterest()); // DTO에서 관심사 값을 가져와 엔티티에 설정

        userService.saveUser(userEntity); // 변환된 엔티티를 서비스 클래스에서 처리하여 DB에 저장
        return ResponseEntity.ok("회원가입 성공"); // 성공 메시지를 포함하여 응답 반환
    }

    // 유저가 db에 있으면 id 리턴
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest) {
        UserEntity user = userService.checkLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            UserDTO userDTO = userService.getUserWithPosts(user.getId()); // 로그인 성공 시 사용자 ID로 사용자 정보와 게시글 목록 조회
            return ResponseEntity.ok(userDTO); // 로그인 성공 시 사용자 ID를 포함한 응답 반환
        } else {
            // 로그인 실패 시 401 상태와 메시지 반환
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    /* 유저가 db에 있는지 확인만 하는 코드
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginRequest) {
        boolean isAuthenticated = userService.checkLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    } */
    

    @GetMapping("/get/all")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 사용자 ID로 사용자 정보와 게시글 목록을 함께 반환
    @GetMapping("/get/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserWithPosts(id);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO); // 사용자와 게시글 정보를 반환
        } else {
            return ResponseEntity.notFound().build(); // 사용자가 없으면 404 반환
        }
    }
}

/*
@RestController: 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냅니다. JSON 형식으로 데이터를 반환합니다.
@RequestMapping("/api/users"): 모든 요청 경로에 /api/users가 포함되는 요청을 처리하는 클래스입니다.
@PostMapping("/register"): /register 경로로 오는 POST 요청을 처리합니다. 이 메서드는 사용자가 제공한 데이터를 받아서 회원가입을 처리합니다.
@RequestBody: 클라이언트가 전송한 JSON 데이터를 UserDTO 객체로 변환하여 매개변수로 전달받습니다.
ResponseEntity.ok(): 성공적인 응답을 반환합니다.
 */