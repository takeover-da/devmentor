import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// 마이페이지 전용 스타일
const MyPageContentContainer = styled.div`
margin: 0;
max-width: 1500px;
padding: 20px;
font-family: Arial, sans-serif;
`;

const LectureMypage = () => {
  // 상태 관리
  const [nickname, setNickname] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [userId, setUserId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCourseFile, setNewCourseFile] = useState(null);

  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [newRoadmapDescription, setNewRoadmapDescription] = useState('');
  const [newRoadmapFile, setNewRoadmapFile] = useState(null);

  const { host } = useContext(Context);
  const token = localStorage.getItem('token');
  
  const user = useSelector(state => state.member.info);

  useEffect(() => {
    if (!user.memberId) return;

    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(`${host}/member/read?memberId=${user.memberId}`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          const { name, memberId, email } = response.data;
          setNickname(name);
          setMemberId(memberId);
          setEmail(email);
          setFullName(name);
          setUserId(memberId);
        }
      } catch (error) {
        console.error('강사 정보 불러오기 실패:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${host}/lecture/list`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error('강의 목록 불러오기 실패:', error);
      }
    };

    fetchInstructorData();
    fetchCourses();
  }, [host, token, user.memberId]);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (newCourseTitle && newCourseDescription) {
      const formData = new FormData();
      formData.append('title', newCourseTitle);
      formData.append('description', newCourseDescription);
      formData.append('approvalStatus', '승인 대기');
      formData.append('instructorName', nickname);  
      if (newCourseFile) formData.append('file', newCourseFile);

      try {
        const response = await axios.post(`${host}/lecture/register`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          setCourses([...courses, response.data]);
          setNewCourseTitle('');
          setNewCourseDescription('');
          setNewCourseFile(null);
          alert('강의가 등록되었습니다.');
        }
      } catch (error) {
        console.error('강의 등록 실패:', error);
        if (error.response) {
          alert(`서버 오류: ${error.response.status} - ${error.response.data.message || error.message}`);
        } else {
          alert('서버와의 통신에 실패했습니다.');
        }
      }
    } else {
      alert('강의 제목과 설명을 모두 입력해주세요.');
    }
  };

  const handleRoadmapSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    alert('로그인이 필요합니다.');
    return;
  }

  if (newRoadmapTitle && newRoadmapDescription) {
    const formData = new FormData();
    formData.append('title', newRoadmapTitle);
    formData.append('description', newRoadmapDescription);
    formData.append('instructorName', nickname);

    // 이미지 파일을 'detail_img'라는 이름으로 첨부
    if (newRoadmapFile) {
      formData.append('thumnailFile', newRoadmapFile); // 컬럼명에 맞게 수정
    }

    try {
      const response = await axios.post(`${host}/roadmap/register`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('로드맵이 등록되었습니다.');
        setNewRoadmapTitle('');
        setNewRoadmapDescription('');
        setNewRoadmapFile(null);
      }
    } catch (error) {
      console.error('로드맵 등록 실패:', error);
      if (error.response) {
        alert(`서버 오류: ${error.response.status} - ${error.response.data.message || error.message}`);
      } else {
        alert('서버와의 통신에 실패했습니다.');
      }
    }
  } else {
    alert('로드맵 제목과 설명을 모두 입력해주세요.');
  }
};


  // 강의 수정 핸들러
  const handleCourseEdit = async (courseId) => {
    // 강의 수정 로직 (모달을 열거나 수정 페이지로 이동하는 등의 처리)
    console.log(`강의 수정, id: ${courseId}`);
  };

  // 강의 삭제 핸들러
  const handleCourseDelete = async (courseId) => {
    // 삭제 확인을 위한 팝업
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        // 강의 삭제 API 호출
        const response = await axios.delete(`${host}/lecture/delete/${courseId}`, {
          headers: {
            Authorization: token,
          },
        });
        
        if (response.status === 200) {
          // 삭제된 강의를 courses 배열에서 제거
          setCourses(courses.filter(course => course.id !== courseId));
          alert('강의가 삭제되었습니다.');
        }
      } catch (error) {
        console.error('강의 삭제 실패:', error);
        alert('강의 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <MyPageContentContainer>
    <div style={styles.container}>
      <h1 style={styles.title}>교육자 마이페이지</h1>
  
      {/* 교육자 정보 섹션 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>나의 정보</h2>
        <div style={styles.profileInfo}>
          <div style={styles.avatarContainer}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="프로필" style={styles.avatar} />
            ) : (
              <div style={styles.avatarPlaceholder}>{nickname[0]}</div>
            )}
          </div>
          <div>
            <h3 style={styles.name}>{fullName}</h3>
            <p style={styles.userInfo}>{userId}</p>
            <p style={styles.userInfo}>{email}</p>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="nickname" style={styles.label}>별명</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={styles.input}
            placeholder="별명 입력"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="profile-photo" style={styles.label}>프로필 사진</label>
          <input
            id="profile-photo"
            type="file"
            onChange={(e) => setProfilePhoto(URL.createObjectURL(e.target.files[0]))}
            style={styles.fileInput}
          />
        </div>
        <button style={styles.button}>정보 저장</button>
      </div>
  
      {/* 강의 등록과 강의 목록 섹션을 한 줄에 배치 */}
      <div style={styles.flexRow}>
        {/* 강의 등록 섹션 */}
        <div style={styles.flexItem}>
          <h2 style={styles.sectionTitle}>NEW 강의 등록</h2>
          <form onSubmit={handleCourseSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="course-title" style={styles.label}>강의 제목</label>
              <input
                id="course-title"
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                style={styles.input}
                placeholder="강의 제목을 입력하세요"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="course-description" style={styles.label}>강의 내용</label>
              <textarea
                id="course-description"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
                style={styles.textarea}
                placeholder="강의 설명을 입력하세요"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="course-image" style={styles.label}>강의 이미지</label>
              <input
                id="course-image"
                type="file"
                onChange={(e) => setNewCourseFile(e.target.files[0])}
                style={styles.fileInput}
              />
            </div>
            <p style={styles.instructorName}>강사명: {nickname}</p>
            <button type="submit" style={styles.button}>등록</button>
          </form>
        </div>
  
        {/* 강의 목록 섹션 */}
        <div style={styles.flexItem}>
          <h2 style={styles.sectionTitle}>나의 강의 목록</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>강의 제목</th>
                <th style={styles.th}>승인 상태</th>
                <th style={styles.th}>관리</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td style={styles.td}>{course.title}</td>
                  <td style={styles.td}>{course.approvalStatus}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleCourseEdit(course.id)} style={styles.smallButton}>
                      수정
                    </button>
                    <button onClick={() => handleCourseDelete(course.id)} style={styles.smallButton}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* 새 로드맵 등록 섹션 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>NEW 로드맵 등록</h2>
        <form onSubmit={handleRoadmapSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="roadmap-title" style={styles.label}>로드맵 제목</label>
            <input
              id="roadmap-title"
              type="text"
              value={newRoadmapTitle}
              onChange={(e) => setNewRoadmapTitle(e.target.value)}
              style={styles.input}
              placeholder="로드맵 제목을 입력하세요"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="roadmap-description" style={styles.label}>로드맵 내용</label>
            <textarea
              id="roadmap-description"
              value={newRoadmapDescription}
              onChange={(e) => setNewRoadmapDescription(e.target.value)}
              style={styles.textarea}
              placeholder="로드맵 설명을 입력하세요"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="roadmap-detail_img" style={styles.label}>로드맵 이미지</label>
            <input
              id="roadmap-detail_img"
              type="file"
              onChange={(e) => setNewRoadmapFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>
          <p style={styles.instructorName}>강사명: {nickname}</p>
          <button type="submit" style={styles.button}>등록</button>
        </form>
      </div>
  
      {/* 로드맵 목록 섹션 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>강의 선택</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>강의 제목</th>
              <th style={styles.th}>선택 상태</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={styles.td}>{course.title}</td>
                <td style={styles.td}>{course.approvalStatus}</td>
                <td style={styles.td}>
                  <button onClick={() => handleCourseEdit(course.id)} style={styles.smallButton}>
                    선택
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
    </div>
    </MyPageContentContainer>
  );
  
};

// 스타일링
const styles = {
  container: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  section: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  avatarContainer: {
    width: '80px',
    height: '80px',
    marginRight: '20px',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#555',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  userInfo: {
    fontSize: '14px',
    color: '#555',
    margin: '0',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },

  // 강의 등록과 강의 목록을 한 줄로 배치
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',  // 섹션들 사이에 공간을 배분
    gap: '20px',  // 섹션 간격
  },
  flexItem: {
    flex: 1,  // 각 섹션이 동일한 너비를 가지도록 설정
    minWidth: '48%',  // 너무 좁지 않게 최소 너비 설정
  },

  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  fileInput: {
    fontSize: '14px',
    marginTop: '10px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  smallButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  th: {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f1f1f1',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  instructorName: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default LectureMypage;
