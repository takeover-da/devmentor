import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Context } from "../index.js";

// 스타일드 컴포넌트 정의
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const CourseDetailWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

const CourseImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
`;

const CourseDescription = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-top: 20px;
`;

const EnrollButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const CourseDetail = () => {
  const { lectureNo } = useParams();
  const [course, setCourse] = useState(null); // 강의 세부 정보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { host } = useContext(Context);
  

  const token = localStorage.getItem("token");

  // 강의 정보를 API에서 가져오기
  
  useEffect(() => {
    console.log("Received lectureNo:", lectureNo); // lectureNo 값 확인용
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`${host}/lecture/read?lectureNo=${lectureNo}`, {
          headers: { Authorization: token },
        });
        setCourse(response.data); // 강의 세부 정보 업데이트
        setLoading(false); // 로딩 상태 false로 변경

      } catch (err) {
        setError("강의 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    if (lectureNo) {
      fetchCourseDetail(); // lectureNo 값이 있을 때만 API 호출
    } else {
      setError("유효한 강의 번호가 없습니다.");
      setLoading(false);
    }
  }, [lectureNo]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시
  }

  if (!course) {
    return <div>강의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      {/* 강의 제목 */}
      <Title>{course.title}</Title>

      {/* 강의 상세 컨테이너 */}
      <CourseDetailWrapper>
        {/* 강의 이미지 */}
        <CourseImage src={course.fileurl} alt="강의 이미지" />

        {/* 강의 설명 */}
        <CourseDescription>{course.description}</CourseDescription>

        {/* 강사명 */}
        <p><strong>강사명:</strong> {course.instructorName}</p>

        {/* 바로 수강 버튼 */}
        <EnrollButton
          onClick={() => alert("바로 수강 버튼 클릭!")}
        >
          바로 수강
        </EnrollButton>
      </CourseDetailWrapper>
    </Container>
  );
};

export default CourseDetail;
