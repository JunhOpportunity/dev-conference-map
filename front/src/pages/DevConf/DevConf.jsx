import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ConferenceCard from "./ConferenceCard";
import ConferenceModal from "./ConferenceModal";
import API_ENDPOINTS from "../../apis/apiEndpoints";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #5d5a88;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  color: #6b6b85;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #4a4a5a;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6b6b85;
  font-size: 1rem;
  cursor: pointer; /* 클릭 가능하도록 설정 */
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#6b5efb" : "#ccc")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(props) => (props.active ? "20px" : "2px")};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: left 0.3s ease;
  }
`;

const CardGrid = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  place-items: center;
  margin: 0 auto;
`;

export default function DevConf() {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "최신순" ? "인기순" : "최신순"));
  };

  const toggleOnlineOnly = () => {
    setOnlineOnly((prev) => !prev);
  };

  useEffect(() => {
    // API 요청
    fetch(API_ENDPOINTS.CONFERENCES.GET_ALL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch from API");
        }
        return response.json();
      })
      .then((data) => setConferences(data.conferences))
      .catch((error) => {
        console.error("API fetch failed, falling back to local JSON:", error);
        
        // 실패할 경우 로컬 JSON으로 대체
        fetch("/data/conferences.json")
          .then((response) => response.json())
          .then((localData) => setConferences(localData.conferences))
          .catch((localError) =>
            console.error("Error loading local JSON:", localError)
          );
      });
  }, []);

  const openModal = (conference) => {
    setSelectedConference(conference);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedConference(null);
    setIsModalOpen(false);
  };

  // 데이터 필터링 및 정렬
  const filteredAndSortedConferences = conferences
    .filter((conf) => !onlineOnly || conf.category.includes("온라인"))
    .sort((a, b) => {
      if (sortOrder === "최신순") {
        return new Date(b.registration_period.start_date) - new Date(a.registration_period.start_date);
      } else {
        return b.popularity - a.popularity; // 인기순 정렬
      }
    });

  return (
    <AppContainer>
      <Title>컨퍼런스 일정 모아보기</Title>

      <ControlsContainer>
        <SortButton onClick={toggleSortOrder}>
        {sortOrder}
        </SortButton>
        <ToggleContainer onClick={toggleOnlineOnly}>
          <span>온라인 행사만 보기</span>
          <ToggleSwitch active={onlineOnly} />
        </ToggleContainer>
      </ControlsContainer>

      <CardGrid>
        {filteredAndSortedConferences.map((conf) => (
          <ConferenceCard key={conf.id} conference={conf} onClick={() => openModal(conf)} />
        ))}
      </CardGrid>

      {isModalOpen && (
        <ConferenceModal conference={selectedConference} onClose={closeModal} />
      )}
    </AppContainer>
  );
};
