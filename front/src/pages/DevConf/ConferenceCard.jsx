import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #f9f9ff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  background: #f4f4fc;
  border-radius: 8px;
  height: 150px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RandomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(4px); /* 이미지 흐림 효과 */
  transition: filter 0.3s ease;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #3a3a5a;
  margin: 10px 0;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #6b6b85;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background: #e9e9f5;
  color: #6b6b85;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
`;

const LearnMore = styled.a`
  font-size: 0.9rem;
  color: #6b5efb;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const StarIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: #6b5efb;
`;

export default function ConferenceCard({ conference, onClick }) {
  const randomImageUrl = `https://picsum.photos/seed/${conference.id}/300/150`;
  console.log(randomImageUrl);
  return (
    <Card onClick={onClick}>
      <ImageContainer>
        <RandomImage src={randomImageUrl} alt="Random Developer" />
      </ImageContainer>
      <Title>{conference.title}</Title>
      <Description>일정 상세</Description>
      <Tags>
        {conference.category.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <LearnMore href="#">Learn more →</LearnMore>
    </Card>
  );
};
