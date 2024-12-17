import React, { useState } from 'react';

const AdminMypage = () => {
  const [activeTab, setActiveTab] = useState('userManagement'); // 기본 카테고리는 '회원관리'
  
  // 회원 정보 상태 관리
  const [users, setUsers] = useState([
    { id: 1, username: 'dooly123', email: 'dooly@example.com' },
    { id: 2, username: 'john456', email: 'john@example.com' },
  ]);
  
  // 강의 정보 상태 관리
  const [courses, setCourses] = useState([
    { id: 1, title: 'React 기초', status: '승인 대기' },
    { id: 2, title: 'Vue 기초', status: '승인됨' },
  ]);

  // 유저 수정, 삭제 핸들러
  const handleUserEdit = (userId) => {
    alert(`유저 ${userId} 정보 수정`);
    // 실제 수정 폼 띄우거나 API 호출 등을 할 수 있음
  };

  const handleUserDelete = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // 강의 수정, 삭제, 승인 핸들러
  const handleCourseEdit = (courseId) => {
    alert(`강의 ${courseId} 수정`);
    // 실제로는 강의 수정 폼을 띄우거나 API 호출 등을 할 수 있음
  };

  const handleCourseDelete = (courseId) => {
    setCourses(prevCourses => prevCourses.map(course =>
      course.id === courseId ? { ...course, isDeleted: true } : course
    ));
  };

  const handleCourseApprove = (courseId) => {
    setCourses(prevCourses => prevCourses.map(course =>
      course.id === courseId ? { ...course, status: '승인됨' } : course
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'left', margin: 0, padding: '10px 0', fontSize: '24px' }}>
        관리자 마이페이지
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
          onClick={() => setActiveTab('userManagement')}
        >
          회원관리
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
          onClick={() => setActiveTab('courseManagement')}
        >
          강의관리
        </button>
      </div>

      {/* 내용 출력 */}
      {activeTab === 'userManagement' && (
        <section style={{ marginTop: '20px' }}>
          <h3>회원 관리</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <p>아이디: {user.username}</p>
                <p>이메일: {user.email}</p>
                <button onClick={() => handleUserEdit(user.id)}>수정</button>
                <button onClick={() => handleUserDelete(user.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'courseManagement' && (
        <section style={{ marginTop: '20px' }}>
          <h3>강의 관리</h3>
          <ul>
            {courses.map(course => (
              !course.isDeleted && (
                <li key={course.id}>
                  <p>제목: {course.title}</p>
                  <p>승인 상태: {course.status}</p>
                  <button onClick={() => handleCourseEdit(course.id)}>수정</button>
                  <button onClick={() => handleCourseDelete(course.id)}>삭제</button>
                  {course.status === '승인 대기' && (
                    <button onClick={() => handleCourseApprove(course.id)}>승인</button>
                  )}
                </li>
              )
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AdminMypage;
