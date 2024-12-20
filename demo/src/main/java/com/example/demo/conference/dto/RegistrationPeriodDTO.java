package com.example.demo.conference.dto;

public class RegistrationPeriodDTO {
    private String start_date;
    private String end_date;

    public RegistrationPeriodDTO() { }
    public RegistrationPeriodDTO(String start_date, String end_date) {
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public String getStart_date() { return start_date; }
    public void setStart_date(String start_date) { this.start_date = start_date; }

    public String getEnd_date() { return end_date; }
    public void setEnd_date(String end_date) { this.end_date = end_date; }
}

/*
RegistrationPeriodDTO
역할: Conference의 접수 기간 정보를 관리하는 DTO.
접수 시작 날짜와 종료 날짜를 저장.
 */