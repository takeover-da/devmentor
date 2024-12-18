import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import RegisterAdmin from "./RegisterAdmin";
import Register from "./Register";
import Login from "./Login";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-weight: 600;
`;

const StyledForm = styled(Form)`
  .form-group {
    margin-bottom: 20px;
  }

  .form-control {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }
  }

  .radio-group {
    display: flex;
    justify-content: space-between; // 라디오 버튼을 한 줄로 배치
    gap: 10px; // 라디오 버튼 사이 간격 설정
  }
`;

const RegisterInstructor = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [activeRegisterForm, setActiveRegisterForm] = useState("INSTRUCTOR");
  const { host } = useContext(Context);

  const [member, setMember] = useState({
    memberId: "",
    name: "",
    password: "",
    email: "",
    role: "INSTRUCTOR",
  });

  useEffect(() => {
    if (member.name === "학습자") {
      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => setActiveRegisterForm("LEARNER"), 300); // 300ms 뒤에 INSTRUCTOR 모달 열기
      }, 300);
    }

    if (member.name === "관리자") {
      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => setActiveRegisterForm("ADMIN"), 300); // 300ms 뒤에 ADMIN 모달 열기
      }, 300);
    }
  }, [member.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host}/register`, member);

      if (response.status !== 201) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  if (activeRegisterForm === "LEARNER") {
    return <Register closeModal={() => setActiveRegisterForm("INSTRUCTOR")} />;
  }

  if (activeRegisterForm === "ADMIN") {
    return (
      <RegisterAdmin closeModal={() => setActiveRegisterForm("INSTRUCTOR")} />
    );
  }
  if (isLogin) {
    return <Login />;
  }

  return (
    <FormContainer style={{ display: isModalOpen ? "block" : "none" }}>
      <Title>교육자 회원가입</Title>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="member.name">
          <Form.Control
            type="text"
            placeholder="이름"
            onChange={handleChange}
            name="name"
            value={member.name}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="member.id">
          <Form.Control
            type="text"
            placeholder="아이디"
            onChange={handleChange}
            name="memberId"
            value={member.memberId}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="member.email">
          <Form.Control
            type="email"
            placeholder="이메일"
            onChange={handleChange}
            name="email"
            value={member.email}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="member.password">
          <Form.Control
            type="password"
            placeholder="비밀번호"
            onChange={handleChange}
            name="password"
            value={member.password}
          />
        </Form.Group>

        <Button className="submit-btn" type="submit">
          회원가입
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default RegisterInstructor;