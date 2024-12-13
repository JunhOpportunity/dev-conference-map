package com.example.demo.conference.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.conference.entity.CategoryEntity;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c.categoryName FROM CategoryEntity c WHERE c.conference.id = :conferenceId")
    List<String> findCategoryNameByConferenceId(Long conferenceId);
}
