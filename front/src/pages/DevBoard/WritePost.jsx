import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { API_ENDPOINTS } from '../../apis/apiEndpoints';
import { addPost } from '../../store/slices/userSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 80%;
  height: 70%;
  max-width: 700px;
  max-height: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${COLORS.sig};
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 96%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
  background-color: ${COLORS.bg};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: ${COLORS.sig};
  }
`;

const TextArea = styled.textarea`
  width: 96%;
  height: calc(100% - 150px); 
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
  resize: none; 
  background-color: ${COLORS.bg};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: ${COLORS.sig};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: ${COLORS.sig};
  border: 1px solid ${COLORS.sig};
  &:hover {
    transform: scale(1.2);
    transition: all 0.3s;
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${COLORS.sig};
  color: white;
 border: 1px solid ${COLORS.sig};

  &:hover {
    transform: scale(1.2);
    transition: all 0.3s;
  }
`;

export default function WritePost({ onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const newPost = {
      title: title,
      content: content,
      created_at: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch(API_ENDPOINTS.BOARDS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        throw new Error('게시글 등록에 실패했습니다.');
      }

      dispatch(addPost({ userId: 1, post: newPost }));
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>📝 게시글 작성</Title>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
