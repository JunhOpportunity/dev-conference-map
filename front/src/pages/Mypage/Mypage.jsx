import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { addUser } from "../../store/slices/userSlice";

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
`

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
  const userId = user.id; // Redux 상태에서 userId 가져오기

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

  // 게시글 삭제 함수 (생략)...

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
                  {/* 삭제 아이콘 */}
                </IconButton>
              </IconContainer>
            </PostItem>
          ))}
        </PostList>
      </PostSection>
    </PageContainer>
  );
}
