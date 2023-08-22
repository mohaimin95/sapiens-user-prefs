import React, { useContext, useState } from 'react'
import Auth from './Auth'
import Input from '../Input/Input'
import Button from '../Button/Button'
import axios from '../../utils/axios';
import { mainContext } from '../../contexts/MainContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { setUser, setPrimaryColor } = useContext(mainContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const onChangeInput = ({ target }) => {
        setLoginForm({
        ...loginForm,
        [target.name]: target.value,
      });
    };
    const navigate = useNavigate();
    const onSubmit = e => {
        e.preventDefault();
        if(!loginForm.username.trim()) {
          return alert("Enter username!");
        }
        if(!loginForm.password.trim()) {
          return alert("Enter password!");
        }
        axios.post('/api/user/login', loginForm).then((res) => {
            axios.get('/api/user').then(({data})=>{
                setUser(() => data.user);
                if(data.user && data.user.preferences && data.user.preferences.primaryColor) setPrimaryColor(data.user.preferences.primaryColor)
                navigate("/")
            }).catch(()=>{
                setUser(() => null);
                alert("Something went wrong!")
            })
        }).catch(err=>{
            alert(err.response.data.message);
        })
    }
  return (
    <>
        <Auth title={'Login'}>
            <form onSubmit={onSubmit}>
                <Input label={"Username"} placeholder={"Enter your username"} type={"text"} value={loginForm.username} name="username" onChange={onChangeInput} />
                <Input label={"Password"} placeholder={"Enter your password"} type={"password"} value={loginForm.password} name="password" onChange={onChangeInput} />
                <div className="text-center">
                    <Button type='submit'>Login</Button>
                </div>
            </form>
        </Auth>
    </>
  )
}
