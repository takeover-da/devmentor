import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

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
    justify-content: space-between;  // 라디오 버튼을 한 줄로 배치
    gap: 10px;  // 라디오 버튼 사이 간격 설정
  }
`;

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('회원가입');
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <StyledForm onSubmit={handleRegister}>
        <Form.Group className="form-group" controlId="formUsername">
          <Form.Control type="text" placeholder="이름" />
        </Form.Group>
        <Form.Group className="form-group" controlId="formId">
          <Form.Control type="text" placeholder="아이디" />
        </Form.Group>
        <Form.Group className="form-group" controlId="formEmail">
          <Form.Control type="email" placeholder="이메일" />
        </Form.Group>
        <Form.Group className="form-group" controlId="formPassword">
          <Form.Control type="password" placeholder="비밀번호" />
        </Form.Group>
        <Form.Group className="form-group" controlId="formRadioGroup">
          <div className="radio-group">
            <Form.Check
              type="radio"
              label="학습자"
              name="userType"
              id="student"
            />
            <Form.Check
              type="radio"
              label="교육자"
              name="userType"
              id="instructor"
            />
            <Form.Check
              type="radio"
              label="관리자"
              name="userType"
              id="admin"
            />
          </div>
        </Form.Group>
        <Button className="submit-btn" type="submit">회원가입</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default Register;
