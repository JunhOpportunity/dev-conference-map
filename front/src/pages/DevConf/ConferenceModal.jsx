import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
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
  padding: 30px;
  border-radius: 12px;
  position: relative;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b6b85;
`;

const StarIcon = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) => (props.isInWishlist ? "#FFD700" : "#ccc")};
  cursor: pointer;

  &:hover {
    color: #ffd700;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #3a3a5a;
  margin-bottom: 10px;
  text-align: left;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #6b6b85;
  margin-bottom: 20px;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoColumn = styled.div`
  flex: 1;
  text-align: left;

  &:first-child {
    margin-right: 20px;
  }

  p {
    font-size: 0.9rem;
    color: #6b6b85;
  }

  strong {
    font-size: 1rem;
    color: #3a3a5a;
  }
`;

const Link = styled.a`
  color: #6b5efb;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  background: #e9e9f5; /* 지도 로드 전 기본 배경 */
`;

export default function ConferenceModal({ conference, onClose }) {
  const mapRef = useRef(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (!window.naver || !window.naver.maps.Service) {
      console.error("Naver Maps API is not loaded.");
      return;
    }

    if (!mapRef.current || !conference.location) {
      console.error("Map container or location is missing.");
      return;
    }

    window.naver.maps.Service.geocode(
      { query: conference.location },
      (status, response) => {
        if (status === window.naver.maps.Service.Status.OK) {
          if (response && response.v2 && response.v2.addresses.length > 0) {
            const result = response.v2.addresses[0];
            const lat = result.y;
            const lng = result.x;

            const map = new window.naver.maps.Map(mapRef.current, {
              center: new window.naver.maps.LatLng(lat, lng),
              zoom: 14,
            });

            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(lat, lng),
              map,
              title: conference.location,
            });
          } else {
            console.error("No addresses found in Geocoding response.");
          }
        } else {
          console.error("Geocoding failed with status:", status);
        }
      }
    );
  }, [conference.location]);

  const handleWishlistToggle = async () => {
    const newValue = !isInWishlist;

    // 백엔드 API 요청 (예시, 실제 API 엔드포인트 수정 필요)
    const response = await fetch("/api/wishlist", {
      method: newValue ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conferenceId: conference.id }),
    });

    if (response.ok) {
      setIsInWishlist(newValue);
    } else {
      console.error("Failed to update wishlist.");
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <StarIcon
          isInWishlist={isInWishlist}
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle();
          }}
        >
          {isInWishlist ? "★" : "☆"}
        </StarIcon>
        <Title>{conference.title}</Title>
        <Description>{conference.description}</Description>
        <InfoRow>
          <InfoColumn>
            <strong>위치</strong>
            <p>{conference.location}</p>
          </InfoColumn>
          <InfoColumn>
            <strong>Link</strong>
            <p>
              <Link
                href={conference.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                홈페이지
              </Link>
            </p>
          </InfoColumn>
        </InfoRow>
        {/* 지도 컨테이너 */}
        <MapContainer ref={mapRef}></MapContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}
