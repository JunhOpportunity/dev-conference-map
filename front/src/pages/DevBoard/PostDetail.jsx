import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import NavigationBar from "../../components/layout/NavigationBar";  // 추가

const MainContainer = styled.div`
  border: 1px solid ${COLORS.bg};
  border-radius: 20px;
  margin: 100px auto;
  max-width: 1200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 20px;
  padding: 20px;
`;

const PostHeader = styled.div`
`;

const Title = styled.h1`
  color: ${COLORS.sig};
  margin-bottom: 10px;
`;

const PostInfo = styled.div`
  color: gray;
  font-size: 0.9rem;
`;

const Content = styled.div`
  margin-top: 10px;
  line-height: 1.6;
  border: 1px solid ${COLORS.bg};
  border-radius:20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 300px;

  div {
    padding: 10px;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: ${COLORS.sig};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s;
  }
`;

const CommentSection = styled.div`
  margin-top: 30px;
  h3 {
  color: ${COLORS.sig};
  }
`;

const CommentInputSection = styled.div`
  border-bottom: 3px solid ${COLORS.bg};
  padding-bottom: 20px;
`;
const CommentForm = styled.form`
  margin: 20px 0;
`;

const CommentInput = styled.textarea`
  width: 97.7%;
  padding: 10px;
  border: 1px solid ${COLORS.bg};
  border-radius: 10px;
  margin-bottom: 10px;
  resize: vertical;
  min-height: 80px;
  background-color: ${COLORS.bg};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: ${COLORS.sig};
  }
`;

const CommentButton = styled.button`
  padding: 8px 16px;
  background-color: ${COLORS.sig};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  float: right;

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s;
  }
`;

const CommentList = styled.div`
  margin-top: 40px;

`;

const CommentItem = styled.div`
  border: 1px solid ${COLORS.bg};
  border-radius: 15px;
  padding: 15px 0;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  div{
    padding: 1px;
    margin-left: 10px;
  }
`;

const CommentInfo = styled.div`
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 5px;
  color: ${COLORS.sig};
`;

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // 더미 데이터 (나중에 API로 대체...json 데이터)
  const post = {
    id: postId,
    title: "게시글 제목",
    content: "게시글 내용👍",
    name: "작성자",
    date: "2024-01-15"
  };

  // 더미 댓글 데이터
  const comments = [
    { id: 1, name: "홍길동", content: "좋은 글이네요!", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
    { id: 2, name: "김철수", content: "감사합니다.", date: "2024-01-16" },
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // 댓글 제출 로직 구현 예정
  };

  return (
    <>
      <NavigationBar />
      <MainContainer>
        <DetailContainer>
          <BackButton onClick={() => navigate('/dev-board')}>← 목록으로</BackButton>
          <PostHeader>
            <Title>{post.title}</Title>
            <PostInfo>
              작성자: {post.name} | 작성일: {post.date}
            </PostInfo>
          </PostHeader>
          <Content>
            <div>{post.content}</div>
          </Content>
          
          <CommentSection>
            <h3>댓글</h3>
            <CommentInputSection>
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInput placeholder="댓글을 입력하세요" />
              <CommentButton type="submit">등록</CommentButton>
            </CommentForm>
            </CommentInputSection>
            
            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentInfo>
                    {comment.name} | {comment.date}
                  </CommentInfo>
                  <div>{comment.content}</div>
                </CommentItem>
              ))}
            </CommentList>
          </CommentSection>
          
        </DetailContainer>
      </MainContainer>
    </>
  );
}
