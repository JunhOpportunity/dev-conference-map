import React, { useEffect, useRef } from "react";
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  max-width: 600px;
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

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

export default function ConferenceModal({ conference, onClose }) {
  const mapRef = useRef(null);

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
        console.log("Geocoding response:", response);
  
        if (status === window.naver.maps.Service.Status.OK) {
          if (response && response.v2 && response.v2.addresses.length > 0) {
            const result = response.v2.addresses[0];
            console.log("Geocoded coordinates:", result);
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
  

  

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{conference.title}</h2>
        <p>{conference.description}</p>
        <p>위치: {conference.location}</p>

        {/* 지도 컨테이너 */}
        <MapContainer ref={mapRef}></MapContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}
