import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice"; // Redux 액션 가져오기

const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 100px auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #3a3a5a;
  margin-bottom: 20px;
`;

const UserInfoSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const UserInfoCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 20px;
  color: #6b6b85;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReadOnlyInput = styled.div`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f4f4f9;
  color: #6b6b85;
  font-size: 0.9rem;
`;

const TagContainer = styled.div`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f4f4f9;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background: #e9e9f5;
  color: #6b6b85;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 20px;
`;

const WishlistTitle = styled.h2`
  font-size: 1.2rem;
  color: #3a3a5a;
  margin-bottom: 10px;
`;

const WishlistSection = styled.div`
  flex: 1;
  background: #f9f9ff;
  padding: 20px;
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WishlistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WishlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
`;

const WishlistItemInfo = styled.div`
  flex: 1;
  margin-right: 10px;

  h3 {
    font-size: 1rem;
    color: #3a3a5a;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.9rem;
    color: #6b6b85;
  }
`;

const LearnMore = styled.a`
  font-size: 0.9rem;
  color: #6b5efb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PostSection = styled.div`
  margin-top: 30px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #6b6b85;
  cursor: pointer;
`;

export default function MyPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = user.id; // Redux 상태에서 사용자 ID 가져오기

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/users/get/${userId}`);
        if (!response.ok) {
          throw new Error("사용자 정보를 가져오지 못했습니다.");
        }
        const userData = await response.json();

        // Redux 상태 업데이트
        dispatch(
          addUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            interest: userData.interest,
            wishlist: userData.wishlist,
            posts: userData.posts,
          })
        );
      } catch (error) {
        console.error("사용자 정보 요청 중 오류:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, dispatch]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // 삭제 후 상태 업데이트 (삭제된 게시물 제거)
        dispatch(
          addUser({
            ...user,
            posts: user.posts.filter((post) => post.id !== postId),
          })
        );
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <PageContainer>
      <Header>마이페이지</Header>
      <UserInfoSection>
        <UserInfoCard>
          <InputContainer>
            <Label>유저명</Label>
            <ReadOnlyInput>{user.name}</ReadOnlyInput>
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <ReadOnlyInput>{user.email}</ReadOnlyInput>
          </InputContainer>
          <InputContainer>
            <Label>관심 분야</Label>
            <TagContainer>
              {user.interest.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagContainer>
          </InputContainer>
        </UserInfoCard>
        <WishlistSection>
          <WishlistTitle>컨퍼런스 즐겨찾기</WishlistTitle>
          <WishlistList>
            {user.wishlist.map((item, index) => (
              <WishlistItem key={index}>
                <WishlistItemInfo>
                  <h3>{item.title}</h3>
                  <p>{item.registration_period.start_date}</p>
                  <LearnMore href={item.website}>Learn more →</LearnMore>
                </WishlistItemInfo>
              </WishlistItem>
            ))}
          </WishlistList>
        </WishlistSection>
      </UserInfoSection>
      <PostSection>
        <WishlistTitle>내가 쓴 글</WishlistTitle>
        <PostList>
          {user.posts.map((post) => (
            <PostItem key={post.id}>
              <div>
                <strong>{post.title}</strong>
                <p>{post.created_at}</p>
              </div>
              <IconContainer>
                <IconButton onClick={() => handleDeletePost(post.id)}>
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3848 19.4615H5.61561C5.20758 19.4615 4.81627 19.2995 4.52775 19.0109C4.23924 18.7224 4.07715 18.3311 4.07715 17.9231V4.07693H17.9233V17.9231C17.9233 18.3311 17.7612 18.7224 17.4727 19.0109C17.1842 19.2995 16.7929 19.4615 16.3848 19.4615Z"
                      stroke="#5D5A88"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.69238 14.8462V8.69232"
                      stroke="#5D5A88"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.3076 14.8462V8.69232"
                      stroke="#5D5A88"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 4.07693H21"
                      stroke="#5D5A88"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.3081 1H8.69276C8.28473 1 7.89342 1.16209 7.6049 1.45061C7.31638 1.73912 7.1543 2.13044 7.1543 2.53846V4.07692H14.8466V2.53846C14.8466 2.13044 14.6845 1.73912 14.396 1.45061C14.1075 1.16209 13.7162 1 13.3081 1Z"
                      stroke="#5D5A88"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </IconContainer>
            </PostItem>
          ))}
        </PostList>
      </PostSection>
    </PageContainer>
  );
}
