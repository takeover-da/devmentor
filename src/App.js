import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/Home';
import CoursePage from './features/CoursePage';
import RoadmapPage from './features/RoadmapPage';
import MentoringPage from './features/MentoringPage';
import CommunityPage from './features/CommunityPage';
import Login from './features/Login';
import Register from './features/Register';
import CourseDetail from './features/CourseDetail';
import LectureMypage from "./features/LectureMypage";
import LearnerMypage from './features/LearnerMypage';
import AdminMypage from './features/AdminMypage';
import RoadmapDetail from './features/RoadmapDetail';


function App() {
  return (
    <div>
      <Routes>

      <Route path="/" element={<Navigate to="/home" />} />

        {/* Layout 컴포넌트로 감싸서 중첩 라우트 구성 */}
        <Route path='/' element={<Layout />}>

          {/* 홈 화면: 기본으로 /home 경로에 연결되도록 설정 */}
          <Route path='/home' element={<Home />} />

          {/* 로그인 */}
          <Route path='/login' element={<Login/>}/>

          {/* 회원가입 */}
          <Route path='/register' element={<Register/>}/>

          {/* 강의 */}
          <Route path='/CoursePage' element={<CoursePage />} />

          {/* 강의 상세페이지 */}
          <Route path="/lecture/read/:lectureNo" element={<CourseDetail />} />

          {/* 로드맵 */}
          <Route path='/RoadmapPage' element={<RoadmapPage />} />

          {/* 로드맵 상세페이지 */}
          <Route path='/RoadmapDetail' element={<RoadmapDetail />}/>

          {/* 멘토링 */}
          <Route path='/MentoringPage' element={<MentoringPage />} />

          {/* 커뮤니티 */}
          <Route path='/CommunityPage' element={<CommunityPage />} />
        </Route>

        {/* 교육자 마이페이지 */}
        <Route path='/LectureMypage' element={<LectureMypage />}/>

        {/* 학습자 마이페이지 */}
        <Route path='/LearnerMypage' element={<LearnerMypage />}/>

        {/* 관리자 마이페이지 */}
        <Route path='/AdminMypage' element={<AdminMypage />}/>


      </Routes>
    </div>
  );
}

export default App;
