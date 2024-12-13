import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import WritePost from "./WritePost";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";
import { useSelector, useDispatch } from "react-redux";

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
    padding: 60px 20px;
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(93, 90, 136, 0.2);
    margin: 5px 0;
    font-size: 0px;
  }

  .post-preview {
    height: 0;
    opacity: 0;
    transition: all 0.4s ease;
    color: #666;
    font-size: 0px;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &:hover .post-preview {
    height: auto;
    opacity: 1;
    margin-top: 15px;
    font-size: 18px;
    max-height: 50%;
    max-width: 90%;
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
  display: flex;
  align-items: center;
  gap: 10px;
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
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userPosts = useSelector(state => state.user.posts);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 7;
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BOARDS.GET_ALL);
        const data = await response.json();
        setPosts([...data, ...userPosts]); // Redux store의 posts와 서버 데이터 병합
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
      }
    };

    fetchPosts();
  }, [userPosts]);

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
                <div className="post-preview">
                  {post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content}
                </div>
                <PostInfo>
                  <span>{post.name} | {post.date}</span>
                </PostInfo>
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
