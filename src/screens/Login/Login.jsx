import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user: '',
    password: ''
  })
  const [registerForm, setRegisterForm] = useState({
    user: '',
    password: ''
  })
  const [lastChange, setLastChange] = useState('user');
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    let name = event.target.name;
    if (!register) {
      setFocus(name);
      setForm({
        ...form,
        [name]: event.target.value
      })
    }
    else {
      setFocus(name);
      setRegisterForm({
        ...registerForm,
        [name]: event.target.value
      })

    }
  }

  const setFocus = (name) => {
    setLastChange(name)
  }

  const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

  const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #181828;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;

  const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

  const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

  const Button = styled.button`
  width: 122px;
  height: 66px;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #1A63D4;
  border: none;
  border-radius: 25px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  margin-left: 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

  const Title = styled.h1`
  font-family: DM Sans;
font-size: 42px;
color: #FEFEFE;
font-weight: 700;
line-height: 51px;
letter-spacing: 0em;
text-align: center;
`;

  const Body = styled.p`
  width: 322px;
  font-family: Epilogue;
  font-size: 18px;
  color: #FEFEFE;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: center;  
  margin: 7px 0px
  opacacity: 80%;
`;
  const InputDiv = styled.div`
align-self: center;
width: 330px;
height: fit-content;
background: #2F2F43;
background: #2F2F43;
color: #f03d4e;
border-radius: 18px;
padding: 11px 13px;
color: #f03d4e;
margin-bottom: 0.9rem;
outline: 0;
font-size: 14px;
transition: all 0.3s ease-out;
box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
:focus,
:hover {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
}
display:flex;
flex-direction:column;
`;
  const Label = styled.label.attrs((props) => ({
    htmlFor: props.htmlFor
  }))`
border-radius: 18px;
background: #2F2F43;
color: #FEFEFE;

font-size:0.75em;
height:16px;
`;

  const Input = styled.input.attrs((props) => ({
    type: props.type,
    value: props.value,
    placeholder: props.placeholder,
    id: props.id,
    onChange: props.onChange,
    name: props.name,
    autoFocus: props.autoFocus
  }))`

align-self: center;
width: 100%;
background: transparent;
color: #FEFEFE;
border: 1px solid transparent;
font-size: 14px;
transition: all 0.3s ease-out;
`
  const Link = styled.a`
font-size: 16px;
color: #FEFEFE;
Font-family: DM Sans;
font-weight: 400;
Line-height: 19.52px;
margin: 22px 25px 11px 25px;
text-decoration:none;
`;
  const AccountLink = styled.a`
font-size: 16px;
color: #FEFEFE;
Font-family: DM Sans;
font-weight: 400;
Line-height: 19.52px;
margin: 0px 25px 22px 25px;
`;

  const postRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registerForm.user, registerForm.password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate(`/history`);
      })
      .catch((error) => {
        alert(`ERROR -> code: ${error.code}, message: ${error.message}`)
      });
  }

  const postLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.user, form.password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate(`/history`);
      })
      .catch((error) => {
        alert(`ERROR -> code: ${error.code}, message: ${error.message}`)
      });
  }

  const DisplayForm = (title, body, form, linkText, buttonText, func) => {
    return (
      <Wrapper>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <Form>
          <InputDiv>
            <Label htmlFor="inputUser">{form.user ? 'User' : ''}</Label>
            <Input
              id="inputUser"
              value={form.user}
              placeholder="User"
              type="text"
              onChange={handleChange}
              name="user"
              autoFocus={lastChange === 'user'} />
          </InputDiv>

          <InputDiv>
            <Label htmlFor="inputPassword">{form.password ? 'Password' : ''}</Label>
            <Input
              id="inputPassword"
              value={form.password}
              placeholder="Password"
              type="password" onChange={handleChange}
              name="password" autoFocus={lastChange === 'password'} />
          </InputDiv>
          {!register && <Link href="#">Forgot your password?</Link>}
          <AccountLink onClick={() => { setRegister(!register); setFocus(`user`); }}>{linkText}</AccountLink>
          <Button onClick={func}>{buttonText}</Button>
        </Form>
      </Wrapper>)
  }

  return (
    <>
      <GlobalStyle />
      {!register ?
        DisplayForm("Welcome",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          form,
          "Create an account",
          "Login",
          postLogin)
        :
        DisplayForm("Register",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          registerForm,
          "Already have an account? Login",
          "Register",
          postRegister)
      }
    </>
  );
}

export default Login; 