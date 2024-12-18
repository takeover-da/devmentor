import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../store/memberSlice';
import { useDispatch } from 'react-redux';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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
`;

const Login = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { host } = useContext(Context);
  const navigate = useNavigate();

  const [user, setUser] = useState({ id: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${host}/login`, user);
      if (response.status === 200) {
        dispatch(login(response.data));
        navigate('/'); // 로그인 성공 후 홈 화면으로 이동
        closeModal();  // 로그인 후 모달 닫기
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <FormContainer>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <Input 
            type="text" 
            name="id" 
            value={user.id} 
            onChange={handleChange} 
            placeholder="아이디" 
          />
        </div>
        <div>
          <Input 
            type="password" 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
            placeholder="비밀번호" 
          />
        </div>
        <Button type="submit">로그인</Button>
      </form>
    </FormContainer>
  );
};

export default Login;
