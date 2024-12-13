package com.example.demo.wishlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.wishlist.dto.WishlistDTO;
import com.example.demo.wishlist.dto.WishlistRemoveDTO;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<String> addWishlist(@RequestBody WishlistDTO request) {
        Long userId = request.getUserId();  // 요청에서 userId를 추출
        Long confId = request.getConferenceId();  // 요청에서 conferenceId를 추출

        // userId와 conferenceId가 null인지 체크
        if (userId == null) {
            return ResponseEntity.badRequest().body("Error: userId must not be null.");
        }
        if (confId == null) {
            return ResponseEntity.badRequest().body("Error: conferenceId must not be null.");
        }

        try {
            // WishlistService를 통해 위시리스트에 컨퍼런스 추가
            wishlistService.addConferenceToWishlist(userId, confId);
            return ResponseEntity.ok("Conference added to wishlist successfully.");
        } catch (RuntimeException e) {
            // 예외 발생 시 에러 메시지 반환
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // wishlistId를 받아 삭제하는 메서드
    @PostMapping("/remove")
    public ResponseEntity<String> removeWishlist(@RequestBody WishlistRemoveDTO request) {
        Long wishlistId = request.getWishlistId();

        if (wishlistId == null) {
            return ResponseEntity.badRequest().body("Error: wishlistId must not be null.");
        }

        try {
            wishlistService.removeConferenceFromWishlistById(wishlistId);
            return ResponseEntity.ok("Wishlist item removed successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
