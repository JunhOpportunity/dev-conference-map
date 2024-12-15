package com.example.demo.conference;

import com.example.demo.conference.dto.ConferenceAllDTO;
import com.example.demo.conference.dto.ConferenceDTO;
import com.example.demo.conference.service.ConferenceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/conferences")
public class ConferenceController {

    @Autowired
    private MarkdownCrawler markdownCrawler;

    @Autowired
    private ConferenceParser conferenceParser;

    @Autowired
    private ConferenceService conferenceService;

    @GetMapping("/save")
    public String getConferences() throws IOException {
        // 마크다운 파일을 URL에서 크롤링
        String markdownText = markdownCrawler.crawlMarkdownFromUrl("https://raw.githubusercontent.com/brave-people/Dev-Event/master/README.md");

        // 크롤링된 텍스트에서 컨퍼런스 정보 파싱
        List<ConferenceDTO> conferences = conferenceParser.parseConferences(markdownText);

        // 파싱된 데이터를 DB에 저장
        conferenceService.saveConferences(conferences);

        return "Conferences saved successfully!";
    }

    @GetMapping("/all")
    public List<ConferenceAllDTO> getAllConferences() {
        // 서비스 계층에서 모든 컨퍼런스 데이터를 가져옴
        return conferenceService.getAllConferences();
    }
}

/*
ConferenceController
역할: 클라이언트 요청을 처리하고 필요한 서비스를 호출.
/conferences 엔드포인트에서 마크다운 파일을 크롤링 → 파싱 → 데이터를 데이터베이스(DB)에 저장.
 */
