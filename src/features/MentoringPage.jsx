import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const MentoringPageContainer = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const ContentCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ContentTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ContentDetail = styled.p`
  font-size: 14px;
  color: #555;
`;

const Pagination = styled.div`
  text-align: center;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const MentoringPage = () => {
  const [selectedField, setSelectedField] = useState('');  // 선택된 분야
  const [page, setPage] = useState(1);  // 현재 페이지

  const contentData = [
    // 예시 데이터 (제목, 직무, 경력, 작성자)
    { title: "백엔드 취준, 주니어 이력서 + 포트폴리오 첨삭", job: "백엔드/ 서버 개발자", experience: "미들(4~8년)", author: "생각등대" },
    { title: "프론트엔드 개발자 취업 전략", job: "프론트엔드 개발자", experience: "초급(0~2년)", author: "이해진" },
    { title: "풀스택 개발자의 경력 쌓기", job: "풀스택 개발자", experience: "상급(8~15년)", author: "김민수" },
    { title: "DevOps 전문가의 커리어", job: "DevOps 엔지니어", experience: "미들(4~8년)", author: "박지훈" },
    { title: "데이터 사이언티스트 커리어 로드맵", job: "데이터 사이언티스트", experience: "초급(0~2년)", author: "조은별" },
    { title: "ML 전문가로 성장하는 법", job: "머신러닝 엔지니어", experience: "상급(8~15년)", author: "강한결" },
    // 더 많은 데이터를 추가할 수 있습니다
  ];

  const filteredData = contentData.filter(item => {
    if (!selectedField) return true;  // 필터가 없다면 모든 데이터를 표시
    return item.job.includes(selectedField);
  });

  const itemsPerPage = 24;  // 한 페이지당 보여줄 항목 수 (4개씩 6줄)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleResetFilter = () => {
    setSelectedField('');
  };

  return (
    <MentoringPageContainer>
      <FilterContainer>
        <div>
          <RadioButton
            type="radio"
            id="backend"
            name="field"
            value="백엔드"
            checked={selectedField === '백엔드'}
            onChange={handleFieldChange}
          />
          <label htmlFor="backend">백엔드</label>
        </div>
        <div>
          <RadioButton
            type="radio"
            id="frontend"
            name="field"
            value="프론트엔드"
            checked={selectedField === '프론트엔드'}
            onChange={handleFieldChange}
          />
          <label htmlFor="frontend">프론트엔드</label>
        </div>
        <div>
          <button onClick={handleResetFilter}>필터 초기화</button>
        </div>
      </FilterContainer>

      {/* 컨텐츠 목록 */}
      <ContentContainer>
        {filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((content, index) => (
          <ContentCard key={index}>
            <ContentTitle>{content.title}</ContentTitle>
            <ContentDetail>직무: {content.job}</ContentDetail>
            <ContentDetail>경력: {content.experience}</ContentDetail>
            <ContentDetail>작성자: {content.author}</ContentDetail>
          </ContentCard>
        ))}
      </ContentContainer>

      {/* 페이지 네비게이션 */}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PageNumber key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PageNumber>
        ))}
      </Pagination>
    </MentoringPageContainer>
  );
};

export default MentoringPage;
