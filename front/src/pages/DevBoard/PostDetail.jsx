import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";

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
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${COLORS.sig};
  margin-bottom: 10px;
`;

const PostInfo = styled.div`
  color: gray;
  font-size: 15px;
`;

const Content = styled.div`
  margin-top: 10px;
  line-height: 1.6;
  border: 1px solid ${COLORS.bg};
  border-radius:20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 330px;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  div {
    padding: 10px;
    max-width: 100%;
    white-space: pre-wrap;
    overflow-x: hidden;
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
  font-size: 22px;
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
  font-size: 16px;
  

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
  font-size: 15px;
  color: gray;
  margin-bottom: 5px;
  color: ${COLORS.sig};
`;

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BOARDS.GET_ALL);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('게시글 불러오는 데 실패했습니다. ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      postId: parseInt(postId),
      content: commentInput,
      name: user.name, // Redux store에서 사용자 정보 사용
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch(API_ENDPOINTS.BOARDS.COMMENT.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const data = await response.json();
        setPost({
          ...post,
          comments: [...post.comments, data]
        });
        setCommentInput('');
      }
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <MainContainer>
        <DetailContainer>
          <BackButton onClick={() => navigate('/dev-board')}>← 목록으로</BackButton>
          <PostHeader>
            <Title>{post.title}</Title>
            <InfoContainer>
              <PostInfo>
                작성자: {post.name} | 작성일: {post.date}
              </PostInfo>
            </InfoContainer>
          </PostHeader>
          <Content>
            <div>{post.content}</div>
          </Content>
          
          <CommentSection>
            <h3>댓글</h3>
            <CommentInputSection>
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInput 
                placeholder="댓글을 입력하세요"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <CommentButton type="submit">등록</CommentButton>
            </CommentForm>
            </CommentInputSection>
            
            <CommentList>
              {post.comments.map((comment) => (
                <CommentItem key={comment.nameId}>
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
