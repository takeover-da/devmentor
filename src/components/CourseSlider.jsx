// import React from 'react';
// import Slider from 'react-slick';
// import styled from 'styled-components';
// import { Button } from '@mui/material';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// // 강의 영상 목록
// const courseItems = [
//   { title: '무료강의 1', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+1' },
//   { title: '무료강의 2', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+2' },
//   { title: '유료강의 1', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+3' },
//   { title: '유료강의 2', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+4' },
//   { title: '웹 개발', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+5' },
//   { title: '인공지능', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+6' },
//   { title: '데이터 사이언스', imageUrl: 'https://via.placeholder.com/400x200.png?text=Course+7' },
// ];

// const CourseSlider = () => {
//   const settings = {
//     infinite: true,
//     slidesToShow: 3,  // 한 번에 3개씩 보이도록 설정
//     slidesToScroll: 1,  // 한 번에 1개씩 이동
//     dots: true,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//   };

//   return (
//     <SliderWrapper>
//       <Slider {...settings}>
//         {courseItems.map((course, index) => (
//           <CourseCard key={index}>
//             <img src={course.imageUrl} alt={course.title} />
//             <h3>{course.title}</h3>
//             <Button variant="contained" color="primary" className="view-btn">
//               자세히 보기
//             </Button>
//           </CourseCard>
//         ))}
//       </Slider>
//     </SliderWrapper>
//   );
// };

// // Slider를 감싸는 Wrapper 스타일
// const SliderWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   .slick-slide {
//     padding: 0 10px; // 슬라이드 간격 조정
//   }
// `;

// const CourseCard = styled.div`
//   text-align: center;
//   padding: 10px;
  
//   img {
//     width: 100%;
//     height: auto;
//     object-fit: cover;
//     border-radius: 8px; // 이미지에 약간의 둥근 모서리를 추가
//   }

//   h3 {
//     margin-top: 10px;
//     font-size: 18px;
//     color: #333;
//   }

//   .view-btn {
//     margin-top: 10px;
//     font-size: 14px;
//   }
// `;

// export default CourseSlider;
