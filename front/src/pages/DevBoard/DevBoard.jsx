import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import WritePost from "./WritePost";
import { useNavigate } from "react-router-dom";


const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;  // 네비게이션 바 높이(70px) + 여유 공간을 고려하여 수정
  min-height: 100vh;  
  position: relative;  

  h1 {
    color: ${COLORS.sig};
    margin-bottom: 50px; 
  }
`;

const PostsWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  position: relative;
  padding-bottom: 100px; 
`;

const PostItem = styled.div`
  padding: 20px;
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(93, 90, 136, 0.1);

  &:hover {
    background-color: ${COLORS.bg};
    padding: 80px 20px;
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(93, 90, 136, 0.2);
    margin: 5px 0;
  }
`;

const WriteButton = styled.button`
  padding: 8px 18px;
  background-color: ${COLORS.sig};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  position: absolute;
  right: -45px;
  top: -40px;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const SortButton = styled.button`
  padding: 12px 24px;
  background-color: transparent;
  color: gray;  
  border: none;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: -25px;
  font-size: 15px;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.sig};
    transform: scale(1.1);
    transition: 0.1s;
  }
`;

const PostContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: ${COLORS.sig};
`;

const PostInfo = styled.p`
  margin: 0;
  color: ${COLORS.sig};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 15px;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${COLORS.sig};
  background-color: ${props => props.active ? COLORS.sig : 'white'};
  color: ${props => props.active ? 'white' : COLORS.sig};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4d4a73;
    color: white;
    transform: scale(1.2);
    transition: all 0.3s;
  }
`;

export default function DevBoard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsPerPage = 7;
  
  // 더미 데이터(나중에 API 연동으로 대체)
  const posts = [
    { id: 1, title: "1 번째 게시글", name: "가나다", date: "2024-01-01" },
    { id: 2, title: "2 번째 게시글", name: "라마바", date: "2024-01-02" },
    { id: 3, title: "3 번째 게시글", name: "사아자", date: "2024-01-03" },
    { id: 4, title: "4 번째 게시글", name: "차카타", date: "2024-01-04" },
    { id: 5, title: "5 번째 게시글", name: "파하파", date: "2024-01-05" },
    { id: 6, title: "6 번째 게시글", name: "홍길동", date: "2024-01-06" },
    { id: 7, title: "7 번째 게시글🥲", name: "김철수", date: "2024-01-07" },
    { id: 8, title: "8 번째 게시글", name: "가나다", date: "2024-01-08" },
    { id: 9, title: "9 번째 게시글", name: "라마바", date: "2024-01-09" },
    { id: 10, title: "10 번째 게시글", name: "사아자", date: "2024-01-10" },
    { id: 11, title: "11 번째 게시글", name: "차카타", date: "2024-01-11" },
    { id: 12, title: "12 번째 게시글", name: "파하파", date: "2024-01-12" },
    { id: 13, title: "13 번째 게시글", name: "홍길동", date: "2024-01-13" },
    { id: 14, title: "14 번째 게시글🥲", name: "김철수", date: "2024-01-14" },
    { id: 15, title: "15 번째 게시글", name: "가나다", date: "2024-01-15" },
    { id: 16, title: "16 번째 게시글", name: "라마바", date: "2024-01-16" },
    { id: 17, title: "17 번째 게시글", name: "사아자", date: "2024-01-17" },
    { id: 18, title: "18 번째 게시글", name: "차카타", date: "2024-01-18" },
    { id: 19, title: "19 번째 게시글", name: "파하파", date: "2024-01-19" },
    { id: 20, title: "20 번째 게시글", name: "홍길동", date: "2024-01-20" },
    { id: 21, title: "21 번째 게시글🥲", name: "김철수", date: "2024-01-21" },
  ];

  // 정렬된 게시글 목록 생성
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'desc') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePostClick = (postId) => {
    navigate(`/dev-board/${postId}`);
  };

  return (
    <>
      <BoardContainer>
        <h1>게시판</h1>
        <PostsWrapper>
          <SortButton onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
            {sortOrder === 'desc' ? '최신순' : '오래된순'}
          </SortButton>
          <WriteButton onClick={() => setIsModalOpen(true)}>📝 글쓰기</WriteButton>
          {currentPosts.map(post => (
            <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostInfo>작성자: {post.name} | 작성일: {post.date}</PostInfo>
              </PostContent>
            </PostItem>
          ))}
          <PaginationWrapper>
            {pageNumbers.map(number => (
              <PageButton
                key={number}
                active={currentPage === number}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PageButton>
            ))}
          </PaginationWrapper>
        </PostsWrapper>
      </BoardContainer>
      {isModalOpen && <WritePost onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
