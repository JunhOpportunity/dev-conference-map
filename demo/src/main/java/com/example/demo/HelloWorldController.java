package com.example.demo;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @CrossOrigin(origins = "http://localhost:5173") // 프론트엔드 주소 허용
    @GetMapping("/api/hello")
    public String test() {
        // System.out.println("헬로 출력");
        return "Hello, world!";
    }
}