import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import { ROUND } from "../../constants/round";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <AppContainer>
      <Header>
        <h1>DevConf</h1>
        <p>개발자 컨퍼런스 모아보기</p>
        <MyPageButton onClick={() => navigate("/mypage")}>
          My Page →
        </MyPageButton>
      </Header>
      <MainContent>
        <Card variant="schedule" onClick={() => navigate("/dev-conf")}>
          <Icon>
            <svg
              width="130"
              height="142"
              viewBox="0 0 130 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M111.944 27.5933H18.0555C14.0668 27.5933 10.8333 31.123 10.8333 35.4771V122.199C10.8333 126.553 14.0668 130.083 18.0555 130.083H111.944C115.933 130.083 119.167 126.553 119.167 122.199V35.4771C119.167 31.123 115.933 27.5933 111.944 27.5933Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.8333 59.1285H119.167"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M39.7205 39.419V11.8257"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M90.2795 39.419V11.8257"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Icon>
          <CardTitle>개발자 컨퍼런스</CardTitle>
          <CardDescription>일정 모아보기</CardDescription>
        </Card>
        <Card variant="board" onClick={() => navigate("/dev-board")}>
          <Icon>
            <svg
              width="130"
              height="130"
              viewBox="0 0 130 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M68.2246 75.2865L50.3528 77.843L52.9045 59.9664L98.8647 14.0063C100.896 11.9747 103.652 10.8334 106.525 10.8334C109.398 10.8334 112.153 11.9747 114.185 14.0063C116.216 16.0378 117.358 18.7932 117.358 21.6663C117.358 24.5394 116.216 27.2947 114.185 29.3263L68.2246 75.2865Z"
                stroke="#5D5A88"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M99.3052 75.8353V111.945C99.3052 113.86 98.5443 115.697 97.1899 117.051C95.8356 118.406 93.9986 119.167 92.0833 119.167H19.8643C17.9489 119.167 16.112 118.406 14.7577 117.051C13.4033 115.697 12.6424 113.86 12.6424 111.945V39.7259C12.6424 37.8105 13.4033 35.9736 14.7577 34.6192C16.112 33.2648 17.9489 32.504 19.8643 32.504H55.9738"
                stroke="#5D5A88"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Icon>
          <CardTitle>개발자 이모저모</CardTitle>
          <CardDescription>게시판</CardDescription>
        </Card>
      </MainContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 40px;

  h1 {
    font-size: 30px;
    color: ${COLORS.sig};
  }

  p {
    color: ${COLORS.sig};
  }
`;

const MyPageButton = styled.button`
  background-color: ${COLORS.sig};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.sig};
  }
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: end;
  align-items: baseline;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 6px gray;

  &:hover {
    box-shadow: 0 4px 10px gray;
  }

  ${(props) =>
    props.variant === "schedule" &&
    `
      background-color: ${COLORS.sig};
      color: white;
    `}

  ${(props) =>
    props.variant === "board" &&
    `
      background-color: white;
      color: ${COLORS.sig};
    `}
`;

const Icon = styled.div`
  font-size: 100px;
  margin-bottom: 10px;
`;

const CardTitle = styled.div`
  font-size: 30px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const CardDescription = styled.div`
  font-size: 60px;
  font-weight: bold;
`;
