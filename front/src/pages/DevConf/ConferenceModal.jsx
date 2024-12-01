import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  max-width: 500px;
  width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalDetails = styled.p`
  font-size: 1rem;
  color: #555;
`;

const WebsiteLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #6200ea;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ConferenceModal ({ conference, onClose }) {
  return (
    <Backdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>{conference.title}</ModalTitle>
        <p>{conference.description}</p>
        <p>
          등록 기간: {conference.registration_period.start_date} ~ {conference.registration_period.end_date}
        </p>
        <WebsiteLink href={conference.website} target="_blank" rel="noopener noreferrer">
          공식 웹사이트로 이동 →
        </WebsiteLink>
      </ModalContent>
    </Backdrop>
  );
};
