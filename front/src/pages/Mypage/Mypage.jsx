import React from "react";
import styled from "styled-components";

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

// Main Component
export default function MyPage() {
  const user = {
    id: 1,
    name: "김준호",
    email: "example@email.com",
    socialLogin: "Google",
    socialEmail: "example@gmail.com",
    interest: ["프론트엔드", "백엔드", "디자인"],
    wishlist: [
      {
        id: 1,
        title: "우아한형제들 기술이사 김민태의 데브캠프",
        category: ["온라인", "유료", "프론트엔드"],
        organizer: "패스트캠퍼스",
        location: "서울특별시 강남구 영동대로 513",
        registration_period: {
          start_date: "2024-10-23",
          end_date: "2024-12-01",
        },
        description:
          "우아한형제들 기술이사가 전하는 프론트엔드 최신 트렌드와 실전 경험을 공유합니다.",
        website: "https://fastcampus.co.kr/devcamp2024",
      },
      {
        id: 2,
        title: "경기도 판교 Next.js 실전 컨퍼런스",
        category: ["오프라인", "유료", "풀스택"],
        organizer: "Next Academy",
        location: "경기도 판교",
        registration_period: {
          start_date: "2024-11-15",
          end_date: "2024-12-10",
        },
        description:
          "Next.js 기반의 풀스택 개발을 실전에서 활용하기 위한 노하우를 공유하는 컨퍼런스.",
        website: "https://nextacademy.io/conference",
      },
      {
        id: 3,
        title: "우아한형제들 기술이사 김민태의 데브캠프",
        category: ["온라인", "유료", "프론트엔드"],
        organizer: "패스트캠퍼스",
        location: "서울특별시 강남구 영동대로 513",
        registration_period: {
          start_date: "2024-10-23",
          end_date: "2024-12-01",
        },
        description:
          "우아한형제들 기술이사가 전하는 프론트엔드 최신 트렌드와 실전 경험을 공유합니다.",
        website: "https://fastcampus.co.kr/devcamp2024",
      },
      {
        id: 4,
        title: "경기도 판교 Next.js 실전 컨퍼런스",
        category: ["오프라인", "유료", "풀스택"],
        organizer: "Next Academy",
        location: "경기도 판교",
        registration_period: {
          start_date: "2024-11-15",
          end_date: "2024-12-10",
        },
        description:
          "Next.js 기반의 풀스택 개발을 실전에서 활용하기 위한 노하우를 공유하는 컨퍼런스.",
        website: "https://nextacademy.io/conference",
      },
    ],
    posts: [
      {
        id: 101,
        title: "FECONF2024 티켓 양도합니다",
        created_at: "2024-11-21",
      },
      {
        id: 102,
        title: "TEO CONF 같이 가실 분 구합니다",
        created_at: "2024-11-15",
      },
    ],
  };

  // 게시글 삭제 함수
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // 서버 요청 성공 시, UI에서 해당 게시글 제거
        setUser((prevState) => ({
          ...prevState,
          posts: prevState.posts.filter((post) => post.id !== postId),
        }));
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
            <Label>소셜 로그인</Label>
            <ReadOnlyInput>
              <span role="img" aria-label="Google">
                🌐
              </span>{" "}
              {user.socialEmail}
            </ReadOnlyInput>
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
