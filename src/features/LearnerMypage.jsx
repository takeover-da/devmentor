import React, { useState } from 'react';

const LearnerMypage = () => {
  const [activeTab, setActiveTab] = useState('enrolled'); // 기본 카테고리는 '수강중인 강의 목록'

  // 강의 목록 상태 관리
  const [enrolledCourses, setEnrolledCourses] = useState([
    { id: 1, title: 'React 기초', status: '수강중' },
    { id: 2, title: 'Vue 기초', status: '수강중' },
  ]);
  
  const [wishlistedCourses, setWishlistedCourses] = useState([
    { id: 3, title: 'Angular 기초', status: '찜한 강의' },
  ]);
  
  const [purchasedCourses, setPurchasedCourses] = useState([
    { id: 4, title: 'Node.js 기초', status: '구매한 강의' },
  ]);
  
  const [cartCourses, setCartCourses] = useState([
    { id: 5, title: 'Python 기초', status: '장바구니' },
  ]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'left', margin: 0, padding: '10px 0', fontSize: '24px' }}>
        학습자 마이페이지
      </h1>

      {/* 상단 카테고리 */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setActiveTab('enrolled')}
        >
          수강중인 강의 목록
        </button>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setActiveTab('wishlist')}
        >
          찜한 강의 목록
        </button>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setActiveTab('purchased')}
        >
          구매한 강의 목록
        </button>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setActiveTab('cart')}
        >
          장바구니 강의 목록
        </button>
      </div>

      {/* 내용 출력 */}
      {activeTab === 'enrolled' && (
        <section style={{ marginTop: '20px' }}>
          <h3>수강중인 강의 목록</h3>
          <ul>
            {enrolledCourses.map((course) => (
              <li key={course.id}>
                <p>제목: {course.title}</p>
                <p>상태: {course.status}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'wishlist' && (
        <section style={{ marginTop: '20px' }}>
          <h3>찜한 강의 목록</h3>
          <ul>
            {wishlistedCourses.map((course) => (
              <li key={course.id}>
                <p>제목: {course.title}</p>
                <p>상태: {course.status}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'purchased' && (
        <section style={{ marginTop: '20px' }}>
          <h3>구매한 강의 목록</h3>
          <ul>
            {purchasedCourses.map((course) => (
              <li key={course.id}>
                <p>제목: {course.title}</p>
                <p>상태: {course.status}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'cart' && (
        <section style={{ marginTop: '20px' }}>
          <h3>장바구니 강의 목록</h3>
          <ul>
            {cartCourses.map((course) => (
              <li key={course.id}>
                <p>제목: {course.title}</p>
                <p>상태: {course.status}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default LearnerMypage;
