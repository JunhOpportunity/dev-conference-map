package com.example.demo.conference;

import org.springframework.stereotype.Service;

import com.example.demo.conference.dto.CategoryDTO;
import com.example.demo.conference.dto.ConferenceDTO;
import com.example.demo.conference.dto.RegistrationPeriodDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ConferenceParser {

    public List<ConferenceDTO> parseConferences(String markdownText) {
        List<ConferenceDTO> conferences = new ArrayList<>();

        Pattern yearPattern = Pattern.compile("##\\s*(\\d{2})년");
        Matcher yearMatcher = yearPattern.matcher(markdownText);

        String currentYear = null;
        if (yearMatcher.find()) {
            currentYear = "20" + yearMatcher.group(1); // "24" -> "2024"
        }

        if (currentYear == null) {
            throw new IllegalArgumentException("문서에서 연도를 찾을 수 없습니다.");
        }

        // 컨퍼런스 정보 추출 패턴
        Pattern conferencePattern = Pattern.compile(
            "- __\\[(.*?)\\]\\((.*?)\\).*?분류:\\s*`([^`]+(?:`, `[^`]+)*)`.*?" + // 제목, 링크, 분류
            "주최:\\s*(.*?)\\s*접수:\\s*(\\d{2}\\.\\s*\\d{2})\\s*\\([^)]*\\)\\s*~\\s*(\\d{2}\\.\\s*\\d{2})\\s*\\([^)]*\\)"
        );
        Matcher conferenceMatcher = conferencePattern.matcher(markdownText);

        Long idCounter = 1L;

        while (conferenceMatcher.find()) {
            String title = conferenceMatcher.group(1);
            String website = conferenceMatcher.group(2);
            String category = conferenceMatcher.group(3);
            String organizer = conferenceMatcher.group(4);
            String start_date = conferenceMatcher.group(5); // 시작 날짜
            String end_date = conferenceMatcher.group(6); // 종료 날짜

            // 날짜에 연도를 추가
            start_date = addYearToDate(start_date, currentYear, null); // 시작 날짜는 기본 연도 사용
            end_date = addYearToDate(end_date, currentYear, start_date); // 종료 날짜는 시작 날짜와 비교해 연도 설정

            String[] categories = category.replace("`", "").split(",");

            // Trim categories
            List<CategoryDTO> categoryDTOList = new ArrayList<>();
            String location = null;
            for (String cat : categories) {
                cat = cat.trim();
                if (cat.startsWith("온라인") || cat.startsWith("오프라인")) {
                    location = cat;
                } else {
                    categoryDTOList.add(new CategoryDTO(cat));
                }
            }

            // "오프라인" 또는 "온라인"이 포함된 경우 처리
            if (location != null) {
                // "오프라인" 뒤에 글씨가 있을 때만 "오프라인"을 제거
                if (location.startsWith("오프라인") && location.length() > "오프라인".length()) {
                    location = location.substring("오프라인".length()).trim(); // "오프라인"을 제거하고, 나머지 지역 이름만 남김

                    // 괄호 안의 내용만 추출
                    Pattern pattern = Pattern.compile("\\((.*?)\\)"); // 괄호 안의 내용을 추출하는 정규 표현식
                    Matcher matcher = pattern.matcher(location);
                    if (matcher.find()) {
                        location = matcher.group(1).trim(); // 괄호 안의 내용만 추출
                    } else {
                        location = null; // 괄호 안의 내용이 없으면 location을 null로 설정
                    }
                }
            }

            // Remove trailing "-" from organizer
            organizer = organizer.replaceAll("-\\s*$", "").trim();

            RegistrationPeriodDTO registrationPeriodObj = new RegistrationPeriodDTO(start_date, end_date);

            // List로 감싸서 전달
            List<RegistrationPeriodDTO> registrationPeriods = new ArrayList<>();
            registrationPeriods.add(registrationPeriodObj);

            // Create Conference object
            ConferenceDTO conference = new ConferenceDTO(idCounter++, title, categoryDTOList, organizer, registrationPeriods, website, location);
            conferences.add(conference);
        }

        return conferences;
    }

    private String addYearToDate(String date, String year, String startDate) {
        // 날짜 형식이 "MM. dd"인 경우 연도 추가
        if (date.matches("^\\d{2}\\.\\s*\\d{2}$")) {
            int currentYear = Integer.parseInt(year); // 기본 연도
            String[] dateParts = date.split("\\.");
            int month = Integer.parseInt(dateParts[0].trim());

            // 시작 날짜가 제공된 경우, 종료 연도를 조정
            if (startDate != null) {
                String[] startParts = startDate.split("-");
                int startMonth = Integer.parseInt(startParts[1]); // 시작 날짜의 월

                // 종료 월이 1월이고 시작 월이 12월인 경우, 종료 연도를 다음 해로 간주
                if (startMonth == 12 && month == 1) {
                    currentYear += 1;
                }
                // 종료 월이 시작 월보다 작으면 다음 해로 설정
                else if (month < startMonth) {
                    currentYear += 1;
                }
            }

            return currentYear + "-" + String.format("%02d", month) + "-" + dateParts[1].trim();
        }
        return date; // 이미 연도가 포함된 경우 그대로 반환
    }
}