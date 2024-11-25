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
        <MyPageButton onClick={() => navigate("/mypage")}>My Page →</MyPageButton>
      </Header>
      <MainContent>
        <Card variant="schedule" onClick={() => navigate("/conf")}>
          <Icon>📅</Icon>
          <CardTitle>개발자 컨퍼런스</CardTitle>
          <CardDescription>일정 모아보기</CardDescription>
        </Card>
        <Card variant="board" onClick={() => navigate("/dev-board")}>
          <Icon>✏️</Icon>
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
