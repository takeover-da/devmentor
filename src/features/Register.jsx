import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { Context } from '../index';
import { useNavigate } from 'react-router-dom';


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

  const navigate = useNavigate();
  
  const [member, setMember] = useState({});

  const {host} = useContext(Context);

  function handleChange(e) {
    const {name, value} = e.target;
    const newMember = {...member};
    newMember[name] = value;
    setMember(newMember);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${host}/register`, member);

    if (response.status !== 201) {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="member.name">
          <Form.Control type="text" placeholder="이름" onChange={handleChange} name="name"/>
        </Form.Group>
        <Form.Group className="form-group" controlId="member.id">
          <Form.Control type="text" placeholder="아이디"  onChange={handleChange} name="id"/>
        </Form.Group>
        <Form.Group className="form-group" controlId="member.email">
          <Form.Control type="email" placeholder="이메일"  onChange={handleChange} name="email"/>
        </Form.Group>
        <Form.Group className="form-group" controlId="member.password">
          <Form.Control type="password" placeholder="비밀번호"  onChange={handleChange} name="password"/>
        </Form.Group>
        <Form.Group className="form-group" controlId="formRadioGroup">
          <div className="radio-group" controlId='member.role'>
            <Form.Check
              type="radio"
              label="학습자"
              name="role"
              id="LEARNER"
              onChange={handleChange} />

            <Form.Check
              type="radio"
              label="교육자"
              name="role"
              id="INSTRUCTOR"
              onChange={handleChange} />

            <Form.Check
              type="radio"
              label="관리자"
              name="role"
              id="ADMIN"
              onChange={handleChange} />

          </div>
        </Form.Group>
        <Button className="submit-btn" type="submit">회원가입</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default Register;
