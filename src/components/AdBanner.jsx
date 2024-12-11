// import React from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
// import styled from 'styled-components';

// // Carousel Wrapper 스타일
// const CarouselWrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   height: 400px;
//   margin: 0 auto;
//   padding: 20px 0;
//   margin-bottom: 50px;  /* AdBanner 아래에 50px 간격 추가 */
// `;

// // 광고 이미지 스타일
// const Image = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
// `;

// const ItemWrapper = styled(Paper)`
//   padding: 10px;
//   text-align: center;
// `;

// const items = [
//   {
//     img: 'https://via.placeholder.com/1200x400.png?text=Ad+Image+1',
//     alt: '광고 이미지 1',
//   },
//   {
//     img: 'https://via.placeholder.com/1200x400.png?text=Ad+Image+2',
//     alt: '광고 이미지 2',
//   },
//   {
//     img: 'https://via.placeholder.com/1200x400.png?text=Ad+Image+3',
//     alt: '광고 이미지 3',
//   },
// ];

// const AdBanner = () => {
//   return (
//     <CarouselWrapper>
//       <Carousel
//         animation="slide"
//         indicators={true} // 인디케이터(점) 활성화
//         navButtonsAlwaysVisible={true} // 항상 좌우 네비게이션 버튼 표시
//         interval={5000} // 이미지 자동 전환 시간 (밀리초)
//       >
//         {items.map((item, index) => (
//           <Item key={index} item={item} />
//         ))}
//       </Carousel>
//     </CarouselWrapper>
//   );
// };

// const Item = ({ item }) => {
//   return (
//     <ItemWrapper>
//       <Image src={item.img} alt={item.alt} />
//       <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
//         자세히 보기
//       </Button>
//     </ItemWrapper>
//   );
// };

// export default AdBanner;
