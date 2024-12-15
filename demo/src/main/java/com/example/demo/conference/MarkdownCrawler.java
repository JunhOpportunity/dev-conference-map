package com.example.demo.conference;

import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

@Service
public class MarkdownCrawler {

    public String crawlMarkdownFromUrl(String url) throws IOException {
        // URL에서 마크다운 파일을 가져와 Document 객체로 변환
        Document document = Jsoup.connect(url).get();
        
        // 페이지의 텍스트를 가져옵니다 (마크다운 형식)
        return document.body().text();
    }
}

/*
MarkdownCrawler
역할: 마크다운 파일을 URL로부터 가져오는 기능.
Jsoup 라이브러리를 사용하여 특정 URL의 HTML 데이터를 가져와 텍스트(마크다운 형식)로 반환.
 */