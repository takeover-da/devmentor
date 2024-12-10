import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/Home';
import CoursePage from './features/CoursePage';
import RoadmapPage from './features/RoadmapPage';
import MentoringPage from './features/MentoringPage';
import CommunityPage from './features/CommunityPage';

function App() {
  return (
    <div>
      <Routes>

        {/* Layout 컴포넌트로 감싸서 중첩 라우트 구성 */}
        <Route path='/' element={<Layout />}>
          {/* 홈 화면 */}
          <Route path='/' element={<Home />} />

          {/* 강의 */}
          <Route path='/CoursePage' element={<CoursePage />} />
          {/* 카테고리별 강의 목록 화면 */}
          <Route path='/courses/:category' element={<CoursePage />} />

          {/* 로드맵 */}
          <Route path='/RoadmapPage' element={<RoadmapPage/>}/>

          {/* 멘토링 */}
          <Route path='/MentoringPage' element={<MentoringPage/>}/>

          {/* 커뮤니티 */}
          <Route path='/CommunityPage' element={<CommunityPage/>}/>


        </Route>

      </Routes>
    </div>
  );
}

export default App;
