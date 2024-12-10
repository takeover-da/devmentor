import React from 'react';
import AdBanner from '../components/AdBanner';
import { Link } from 'react-router-dom';
import CourseSlider from '../components/CourseSlider';
// import CourseList from './CourseList';


const Home = () => {
  return (
    <div>
      
      {/* AdBanner에 marginBottom을 추가하여 AdBanner와 CourseSlider 사이 간격을 늘립니다. */}
      <AdBanner style={{ marginBottom: '50px' }} />  {/* AdBanner 아래 50px 간격 추가 */}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        maxWidth: '1200px',  // 최대 너비 설정
        margin: '0 auto',  // 가운데 정렬
        padding: '20px',    // padding 추가
      }}>
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px',  // 위쪽 간격 추가
          }}>
          무료강의
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} /> {/* CourseSlider와 Link 사이에 간격 추가 */}

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          유료강의
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} />

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          웹 개발
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} />

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          인공지능
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} />

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          데이터 사이언스
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} />

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          보안/네트워크
        </Link>
        <CourseSlider style={{ marginBottom: '50px' }} />

        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '25px', 
            marginTop: '30px', 
          }}>
          게임 개발
        </Link>
        <CourseSlider />
      </div>
    </div>
  );
};

export default Home;
