package com.example.demo.login;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.login.dto.UserDTO;
import com.example.demo.posts.PostEntity;
import com.example.demo.posts.PostRepository;
import com.example.demo.posts.dto.PostUserDTO;
import com.example.demo.wishlist.WishlistEntity;
import com.example.demo.wishlist.WishlistRepository;
import com.example.demo.wishlist.dto.WishlistUserDTO;

@Service // 이 클래스는 서비스 계층으로 인식되어야 하므로 @Service 어노테이션을 추가하여 Spring이 서비스 클래스로 등록하게 함
public class UserService {

    @Autowired // @Autowired: 의존성 주입(DI) 어노테이션으로, userRepository 객체를 자동으로 주입합니다. UserRepository는 DB와 상호작용하는 역할을 합니다.
    private UserRepository userRepository; // UserRepository는 DB와 상호작용하는 리포지토리 클래스입니다.

    @Autowired
    private PostRepository postRepository; // 게시글 정보를 조회할 리포지토리 추가

    @Autowired
    private WishlistRepository wishlistRepository;

    // 사용자 정보를 저장하는 메서드
    public void saveUser(UserEntity user) { // saveUser: 전달받은 UserEntity 객체를 userRepository.save() 메서드를 사용하여 DB에 저장합니다.
        userRepository.save(user); // User 엔티티를 DB에 저장
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null); // ID를 기반으로 사용자 조회
    }

    // 사용자 ID로 사용자 정보와 게시글 목록을 반환하는 메서드
    public UserDTO getUserWithPosts(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);

        if (userEntity == null) {
            return null; // 사용자가 존재하지 않으면 null 반환
        }

        // 날짜 형식 지정
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        // UserDTO 객체에 사용자 정보 설정
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setName(userEntity.getName());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setInterest(userEntity.getInterest());

        // 해당 사용자가 작성한 게시글 목록을 가져오기
        List<PostEntity> posts = postRepository.findByUserId(id);

        // 게시글 목록을 PostSummaryDTO로 변환
        List<PostUserDTO> postSummaryDTOList = posts.stream().map(post -> {
            PostUserDTO postSummaryDTO = new PostUserDTO();
            postSummaryDTO.setId(post.getId());
            postSummaryDTO.setTitle(post.getTitle());
            postSummaryDTO.setCreatedAt(dateFormat.format(post.getCreatedAt()));

            return postSummaryDTO;
        }).collect(Collectors.toList());

        // 게시글 목록을 UserDTO에 설정
        userDTO.setPosts(postSummaryDTOList);

        // 위시리스트 목록 추가 (WishlistDTO로 변환하여 추가)
        List<WishlistEntity> wishlistEntities = wishlistRepository.findByUserId(id);
        List<WishlistUserDTO> wishlistDTOs = wishlistEntities.stream()
                .map(wishlist -> {
                    WishlistUserDTO dto = new WishlistUserDTO();
                    dto.setConfName(wishlist.getConferenceName());
                    dto.setDate(wishlist.getDate().toString()); // 날짜를 문자열로 변환
                    dto.setConfId(wishlist.getConference().getId().toString());
                    dto.setPlace(wishlist.getPlace());
                    return dto;
                })
                .collect(Collectors.toList());

        userDTO.setWishlist(wishlistDTOs);

        return userDTO;
    }

    public UserEntity checkLogin(String email, String rawPassword) {
        UserEntity user = userRepository.findByEmail(email); // 이메일로 사용자 조회
        
        if (user == null) {
            return null; // 사용자가 없으면 null 반환
        }
    
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
        // 입력된 비밀번호(rawPassword)가 DB에 저장된 암호화된 비밀번호와 일치하는지 확인
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user; // 로그인 성공 시 사용자 엔티티 반환
        } else {
            return null; // 로그인 실패 시 null 반환
        }
    }

    /* 유저가 db에 있는지만 확인해서 boolean 타입으로 보내기
    public boolean checkLogin(String email, String rawPassword) {
        UserEntity user = userRepository.findByEmail(email); // 이메일로 사용자 조회
        
        if (user == null) {
            return false; // 사용자가 없으면 로그인 실패
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // 입력된 비밀번호(rawPassword)가 DB에 저장된 암호화된 비밀번호와 일치하는지 확인
        return passwordEncoder.matches(rawPassword, user.getPassword());
    } */
}
