import React, { useState } from 'react';

const InstructorMypage = () => {
  const [activeTab, setActiveTab] = useState('instructor'); // 기본 카테고리는 '교육자 정보'

  // 교육자 정보 상태 관리
  const [nickname, setNickname] = useState('둘리');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState('김영한');
  const [userId, setUserId] = useState('dooly123'); // 아이디 상태 추가
  const [email, setEmail] = useState('dooly@example.com'); // 이메일 상태 추가

  // 강의 정보 상태 관리
  const [courses, setCourses] = useState([
    { id: 1, title: 'React 기초', approvalStatus: '승인 대기', instructor: '둘리' },
    { id: 2, title: 'Vue 기초', approvalStatus: '승인됨', instructor: '둘리' },
  ]);

  // 강의 등록 상태 관리
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');

  // 강의 수정, 삭제 핸들러
  const handleCourseEdit = (courseId) => {
    alert(`강의 ${courseId} 수정`);
    // 실제로는 강의 수정 폼을 띄우거나 API 호출 등을 할 수 있음
  };

  const handleCourseDelete = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, isDeleted: true } : course
      )
    );
  };

  // 강의 등록 핸들러
  const handleCourseSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

    if (newCourseTitle && newCourseDescription) {
      const newCourse = {
        id: courses.length + 1, // 강의 ID는 배열의 길이를 기반으로 자동 증가
        title: newCourseTitle,
        description: newCourseDescription,
        approvalStatus: '승인 대기',
        instructor: nickname, // 강사명은 별명으로 설정
      };

      setCourses([...courses, newCourse]); // 강의 추가
      setNewCourseTitle(''); // 제목 초기화
      setNewCourseDescription(''); // 설명 초기화
    } else {
      alert('강의 제목과 설명을 모두 입력해주세요.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'left', margin: 0, padding: '10px 0', fontSize: '24px' }}>
        교육자 마이페이지
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
          onClick={() => setActiveTab('instructor')}
        >
          교육자 정보
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
          onClick={() => setActiveTab('course')}
        >
          강의 정보
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
          onClick={() => setActiveTab('register')}
        >
          강의 등록
        </button>
      </div>

      {/* 내용 출력 */}
      {activeTab === 'instructor' ? (
        <section style={{ marginTop: '20px' }}>
          <div>
					<h3>나의 정보</h3>
            <p>이름: {fullName}</p>
            <p>아이디: {userId}</p>
            <p>이메일: {email}</p>
          </div>
          <div>
            <h3>별명</h3>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="별명 입력"
            />
          </div>
          <div>
            <h3>프로필 사진</h3>
            {profilePhoto && (
              <img
                src={profilePhoto}
                alt="프로필 사진"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            )}
            <input type="file" onChange={(e) => setProfilePhoto(URL.createObjectURL(e.target.files[0]))} />
          </div>
        </section>
      ) : activeTab === 'course' ? (
        <section style={{ marginTop: '20px' }}>
          {/* 나의 강의 목록 */}
          <div>
            <h3>나의 강의 목록</h3>
            <ul>
              {courses.map((course) => (
                !course.isDeleted && (
                  <li key={course.id}>
                    <p>제목: {course.title}</p>
                    <p>승인 상태: {course.approvalStatus}</p> {/* 승인 상태 표시 */}
                    <button onClick={() => handleCourseEdit(course.id)}>수정</button>
                    <button onClick={() => handleCourseDelete(course.id)}>삭제</button>
                  </li>
                )
              ))}
            </ul>
          </div>
        </section>
      ) : activeTab === 'register' ? (
        <section style={{ marginTop: '20px' }}>
          <h3>강의 등록</h3>
          <form onSubmit={handleCourseSubmit}>
            <div>
              <label>강의 제목</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="강의 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label>강의 설명</label>
              <textarea
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
                placeholder="강의 설명을 입력하세요"
                required
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}>
              등록
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default InstructorMypage;
