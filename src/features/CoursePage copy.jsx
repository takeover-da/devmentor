// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';

// const CoursePage = () => {
//   // 강의 데이터 (임시 더미 데이터)
//   const allCourses = [
//     { title: '김영한의 실전 자바 -기본편', image: 'https://via.placeholder.com/150?text=Course+1', description: '김영한', category: '개발,프로그래밍' },
//     { title: 'Windows 시스템 프로그래밍 - 기본', image: 'https://via.placeholder.com/150?text=Course+2', description: '널널한 개발자', category: '게임개발' },
//     { title: '파이썬 주식 매매 봇으로 주식시장 자동사냥하기', image: 'https://via.placeholder.com/150?text=Course+3', description: 'MoneyPouch', category: '데이터사이언스' },
//     { title: '김영한의 실전 자바 -중급편', image: 'https://via.placeholder.com/150?text=Course+4', description: '김영한', category: '개발,프로그래밍' },
//     { title: '[백문이불여일타] 데이터 분석을 위한 기초 SQL', image: 'https://via.placeholder.com/150?text=Course+5', description: '데이터리안', category: '데이터사이언스' },
//     { title: '[켠김에 출시까지] UE5 다크앤다커 스타일의 익스트랙션 RPG (D1)', image: 'https://via.placeholder.com/150?text=Course+6', description: 'Rookiss', category: '게임개발' },
//     { title: '웹 개발의 핵심, HTTP 완벽마스터하기!', image: 'https://via.placeholder.com/150?text=Course+1', description: '김정환', category: '개발,프로그래밍' },
//     { title: '[게임 프로그래머 입문 올인원] C++ & 자료구조/알고리즘 & STL & 게임 수학 & Windows API & 게임 서버', image: 'https://via.placeholder.com/150?text=Course+2', description: 'Rookiss', category: '게임개발' },
//     { title: '[2024 리뉴얼] 처음하는 SQL과 데이터베이스(MySQL) 부트캠프 [입문부터 활용까지]', image: 'https://via.placeholder.com/150?text=Course+3', description: '잔재미코딩 DaveLee', category: '데이터사이언스' },
//     { title: '넓고 얕게 외워서 컴공 전공자 되기', image: 'https://via.placeholder.com/150?text=Course+4', description: '널널한 개발자', category: '개발,프로그래밍' },
//     { title: '비전공자를 위한 수학 통계 기초(이론)', image: 'https://via.placeholder.com/150?text=Course+5', description: 'SW School', category: '데이터사이언스' },
//     { title: '[나만의 게임 텍스처 제작] 서브스탠스 디자이너의 모든 것', image: 'https://via.placeholder.com/150?text=Course+6', description: '광명땅콩', category: '게임개발' },
//   ];

//   const { category } = useParams();  // URL 파라미터 가져오기
//   const [filteredCourses, setFilteredCourses] = useState([]);

//   // URL 파라미터에 맞춰 강의 필터링
//   useEffect(() => {
//     if (category === '전체' || !category) {
//       setFilteredCourses(allCourses);
//     } else {
//       setFilteredCourses(allCourses.filter(course => course.category === category));
//     }
//   }, [category]);

//   const navigate = useNavigate();

//   // 카테고리 버튼 클릭 시 해당 카테고리로 URL 이동
//   const handleCategoryClick = (category) => {
//     navigate(`/courses/${category}`); // 해당 카테고리로 이동
//   };

//   // styled-components
//   const CategoryFilter = styled.div`
//     display: flex;
//     gap: 10px;
//     margin-bottom: 20px;
//   `;

//   const Button = styled.button`
//     padding: 10px 20px;
//     font-size: 16px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;

//     &:hover {
//       background-color: #0056b3;
//     }
//   `;

//   const GridContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 항목 */
//     gap: 20px;
//     padding: 20px;
//   `;

//   const GridItem = styled.div`
//     background-color: #f0f0f0;
//     border: 1px solid #ccc;
//     padding: 15px;
//     text-align: center;
//     font-size: 16px;
//     border-radius: 8px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   `;

//   const CourseImage = styled.img`
//     width: 100%;
//     height: 150px;
//     object-fit: cover;
//     border-radius: 8px;
//   `;

//   return (
//     <div>
//       {/* 카테고리 버튼 */}
//       <CategoryFilter>
//         <Button onClick={() => handleCategoryClick('전체')}>전체</Button>
//         <Button onClick={() => handleCategoryClick('개발,프로그래밍')}>개발,프로그래밍</Button>
//         <Button onClick={() => handleCategoryClick('게임개발')}>게임개발</Button>
//         <Button onClick={() => handleCategoryClick('데이터사이언스')}>데이터사이언스</Button>
//       </CategoryFilter>

//       {/* 필터링된 강의 리스트 출력 */}
//       <GridContainer>
//         {filteredCourses.map((course, index) => (
//           <GridItem key={index}>
//             <CourseImage src={course.image} alt={course.title} />
//             <h3>{course.title}</h3>
//             <p>{course.description}</p>
//           </GridItem>
//         ))}
//       </GridContainer>
//     </div>
//   );
// };

// export default CoursePage;
