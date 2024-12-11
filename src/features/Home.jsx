import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const countRef = useRef(0); // count 상태를 useRef로 관리
  const titleRef = useRef(''); // 타이핑되는 텍스트를 useRef로 관리

  // 타이핑할 전체 문구
  const completionWord = `최고의 개발 경험, 모두 여기에.

개발자의 꿈을 실현할 강의와 로드맵,
1:1 멘토링과 활발한 커뮤니티가 기다립니다.

지금 바로 개발 여정을 시작하세요.
`;

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      titleRef.current = titleRef.current + completionWord[countRef.current];
      setBlogTitle(titleRef.current); // 새로운 텍스트를 state로 반영
      countRef.current += 1;

      // 텍스트가 끝나면 애니메이션을 멈추고 그대로 두기
      if (countRef.current >= completionWord.length) {
        clearInterval(intervalRef.current); // 타이핑 애니메이션 종료
      }
    }, 40); // 타이핑 속도

    return () => clearInterval(intervalRef.current); // 컴포넌트가 언마운트되면 인터벌을 클리어합니다.
  }, []); // 처음 한 번만 실행되도록 []로 설정

  const lines = blogTitle.split('\n'); // 줄바꿈 기준으로 텍스트 나누기

  return (
    <div className="home-container">
      <div className="banner">
        <h1 className="highlighted-text">{lines[0]}</h1> {/* 첫 번째 줄은 h1으로 */}
        {lines.slice(1).map((line, index) => (
          <p key={index}>{line}</p> // 나머지 줄들은 p로 출력
        ))}
      </div>
      
      {/* 비디오 삽입 */}
      <div className="video-container">
        <video width="100%" height="auto" autoPlay muted loop>
          <source src="/videos/coding.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <style jsx>{`
        html, body {
          height: 100%;  /* 페이지 높이를 100%로 설정 */
          margin: 0;
          overflow-y: auto; /* 전체 페이지에서 스크롤 */
        }

        .home-container {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          min-height: 100%; /* 화면보다 콘텐츠가 길어지면 스크롤을 활성화 */
          background-color: #ffffffad;
          margin: 0;
        }

        .banner {
          text-align: center;
          max-width: 900px;
          width: 100%;
          padding: 20px;
          margin-top: 0; /* banner 영역 상단 여백 제거 */
        }

        h1 {
          color: #ffffff;
          font-family: 'Noto Sans KR', 'Arial', sans-serif; /* 한글을 잘 지원하는 폰트 */
          font-weight: 400;
          font-size: 4rem; /* h1 크기 설정 */
          white-space: pre-line;
        }

        .highlighted-text {
          font-size: 4rem; /* 첫 번째 줄 텍스트 크기 키우기 */
          font-weight: bold;
          color: #000000; /* 원하는 색상으로 설정 */
        }

        p {
          color: #000000;
          font-family: 'Noto Sans KR', 'Arial', sans-serif;
          font-weight: 400;
          font-size: 1.5rem; /* p 크기 설정 */
          white-space: pre-line;
          margin-top: 10px;
        }

        .video-container {
          width: 100%;
          max-width: 1200px;
          padding: 20px;
          margin-top: 20px; /* 비디오 영역 위쪽 여백 */
          display: flex;
          justify-content: center;
        }

        video {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 10px; /* 비디오 모서리를 둥글게 만들기 */
        }
      `}</style>
    </div>
  );
};

export default Home;
