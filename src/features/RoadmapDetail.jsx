import React from "react";

const RoadmapDetail = () => {
  return (
    <div>
      {/* 강의 제목 */}
      <h1>김영한의 자바 입문 - 코드로 시작하는 자바 첫걸음</h1>

      {/* 강의 상세 컨테이너 */}
      <div
        style={{
          backgroundColor: "#f0f0f0", // 배경색 설정
          padding: "20px", // 여백 추가
          borderRadius: "8px", // 모서리 둥글게
        }}
      >

        {/* 이미지 */}
        <img
          src="../images/김영한씨.png"
          alt="강의 이미지"
          style={{
            width: "100%", // 이미지를 부모 컨테이너에 맞게 조정
            borderRadius: "8px", // 이미지 모서리 둥글게
            marginTop: "20px", // 이미지 위쪽에 여백
          }}
        />

        {/* 내용 텍스트 */}
        <p className="pre-wrap">
          {`이제 막 프로그래밍에 입문하고자 하는 분들이라면 한 번쯤 이런 고민을 하셨을 것입니다.
  ‘다른 프로그래밍 언어도 많은데, 왜 자바를 배우는 것이 좋은가?’ 하고요.

  이유는 뚜렷합니다. 자바가 가진 장점이 많지만, 특히 실무에서 많이 사용되는 언어이기 때문입니다.

  개발자가 담당하는 분야에는 여러 가지가 있습니다.

  웹 브라우저 화면의 동작을 담당하는 프론트엔드 개발
  데이터베이스와 상호작용하는 서버 로직을 담당하는 백엔드 개발
  모바일 기기에서 동작하는 모바일 앱 개발 (iOS/Android)
  이밖에 수많은 분야
  소프트웨어 개발 분야 실무 수요 : 모바일 앱 개발 10%, 프론트엔드 개발 20%, 백엔드 앱 개발 70%
  현재 이 중에서 가장 수요가 많은 분야는 단연 백엔드 개발자입니다.
  더욱이 네이버 · 카카오를 비롯한 국내 메이저 회사들의 백엔드 시스템 역시 대부분 자바 기반으로 개발합니다.

  기회를 더 많이 열어두고 싶다면, 자바는 ‘가장 가능성 있는’ 선택지입니다.
  지금 당장 취업을 하거나 좋은 회사에 가는 것이 아니더라도, 자바로 꾸준하게 실력을 쌓아두면 메이저 회사에 갈 가능성이 다른 언어를 사용하는 것보다는 훨씬 높아집니다.

  프로그래밍에 처음 입문하시는 분들이 이번 자바 입문 강의를 통해 첫 단추를 단단하게 꿰어 보시기를 바랍니다.`}
        </p>

        {/* 바로 수강 버튼 */}
        <button
          onClick={() => alert("바로 수강 버튼 클릭!")} // 버튼 클릭 시 알림
          style={{
            marginTop: "20px", // 버튼 위쪽에 여백
            padding: "10px 20px", // 버튼 안의 여백
            fontSize: "16px", // 버튼 글자 크기
            backgroundColor: "#333", // 버튼 배경색
            color: "white", // 글자 색
            border: "none", // 테두리 없애기
            borderRadius: "4px", // 버튼 모서리 둥글게
            cursor: "pointer", // 마우스 커서 모양 변경
            transition: "background-color 0.3s ease", // 배경색 변화 애니메이션
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#555")} // 마우스 올릴 때 색 변화
          onMouseOut={(e) => (e.target.style.backgroundColor = "#333")} // 마우스 뗄 때 원래 색으로 돌아옴
        >
          바로 수강
        </button>
      </div>
    </div>
  );
};

export default RoadmapDetail;
