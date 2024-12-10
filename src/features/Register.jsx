// import React, { useContext, useState } from 'react'
// import { CustomCard, CustomContainer } from '../components/Styles'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import { Context } from '../index';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   // 새로운 회원정보를 저장할 state 선언
//   const [member, setMember] = useState(null);

//   // 입력필드의 이벤트 함수
//   const handleChange = (event) => {
//     const {name, value} = event.target;
//     const newMember ={...member};
//     newMember[name] = value;
//     setMember(newMember);
//   }

//   const navigate = useNavigate();

//   // API 주소 가져오기
//   const {host} = useContext(Context);

//   // form 이벤트 함수
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // 회원가입 API 호출
//     // 인자: 주소, 바디데이터
//     const response = await axios.post(
//       `${host}/register`, member
//     );
//     if(response.status === 201) {
//       navigate('/login')
//     }else{
//       throw new Error(`api error: ${response.status} ${response.statusText}`);
//     }
//   }
//   return (
//     <CustomCard>
//       <CustomContainer>
//       <h3>회원가입</h3>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="member.id">
//           <Form.Label>아이디</Form.Label>
//           <Form.Control type="text" onChange={handleChange} name='id'/>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="member.password">
//           <Form.Label>비밀번호</Form.Label>
//           <Form.Control type="password" onChange={handleChange} name='password'/>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="member.name">
//           <Form.Label>이름</Form.Label>
//           <Form.Control type="text" onChange={handleChange} name='name'/>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="member.role">
//           <Form.Check
//             type="radio"
//             label="사용자"
//             id="member.role1"
//             name="role"
//             value="ROLE_USER"
//             onChange={handleChange}
//           />
//           <Form.Check
//             type="radio"
//             label="관리자"
//             id="member.role2"
//             name="role"
//             value="ROLE_ADMIN"
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">Submit</Button>
//       </Form>

//       </CustomContainer>
//     </CustomCard>
    
//   )
// }

// export default Register