package com.example.demo.wishlist.dto;

// import java.time.LocalDate;

public class WishlistUserDTO {
    private String conf_name;
    private String date;
    private String conf_id;
    private String place;

    // 기본 생성자
    public WishlistUserDTO() {}

    // Getter와 Setter 메서드
    public String getConfName() { return conf_name; }
    public void setConfName(String conf_name) { this.conf_name = conf_name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getConfId() { return conf_id; }
    public void setConfId(String conf_id) { this.conf_id = conf_id; }

    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }
}
