// import React, { useContext, useState } from 'react'
// import { CustomCard, CustomContainer } from '../components/Styles'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { Context } from '../index';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {login} from '../store/memberSlice'
// import { useDispatch } from 'react-redux';

// const Login = () => {

//   // dispath: 스토어의 state를 변경하기 위한 도구
//   const dispath = useDispatch();

//   // 서버 API 주소
//   const {host} = useContext(Context);

//   const navigate = useNavigate();

//   // 사용자가 입력한 로그인 데이터를 저장할 state
//   const [user, setUser] = useState();

//   // 입력필드의 이벤트 함수
//   const handleChange = (event) => {
//     const {name, value} = event.target;
//     const newUser = {...user};
//     newUser[name] = value;
//     setUser(newUser);
//   }

//   // form 이벤트 함수
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const response = await axios.post(
//       `${host}/login`, user
//     );

//     // 로그인 성공시 홈화면으로 이동 및 응답 데이터를 스토어에 저장
//     if(response.status === 200) {
//       // 리듀서함수를 사용하여 스토어에 있는 state를 변경
//       dispath(login(response.data));
//       navigate('/')
//     } else {
//       throw new Error(`api error: ${response.status} ${response.statusText}`);
//     }
//   }

//   return (
//     <CustomCard>
//       <CustomContainer>
//         <h3>로그인</h3>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="member.id">
//             <Form.Label>아이디</Form.Label>
//             <Form.Control type="text" onChange={handleChange} name='id'/>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="member.password">
//             <Form.Label>패스워드</Form.Label>
//             <Form.Control type="password" onChange={handleChange} name='password'/>
//           </Form.Group>
//           <Button variant="primary" type="submit">로그인</Button>
//         </Form>
//       </CustomContainer>
//     </CustomCard>
//   )
// }

// export default Login