import React, { useContext, useState } from "react";
import Auth from "./Auth";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { mainContext } from "../../contexts/MainContext";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(mainContext)
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeInput = ({ target }) => {
    setSignupForm({
      ...signupForm,
      [target.name]: target.value,
    });
  };
  const onSubmit = e => {
      e.preventDefault();
      if(!signupForm.username.trim()) {
        return alert("Enter username!");
      }
      if(!signupForm.password.trim()) {
        return alert("Enter password!");
      }
      if(signupForm.password.trim() !== signupForm.confirmPassword.trim()) {
        return alert("Passwords not matching!");
      }
      axios.post('/api/user/register', signupForm).then(() => {
          axios.get('/api/user').then(({data})=>{
              setUser(() => data.user || null);
              navigate("/");
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
      <Auth title={"Signup"}>
        <form onSubmit={onSubmit}>
          <Input
            label={"Username"}
            placeholder={"Enter your username"}
            type={"text"}
            value={signupForm.username}
            name="username"
            onChange={onChangeInput}
          />
          <Input
            label={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            value={signupForm.password}
            name="password"
            onChange={onChangeInput}
          />
          <Input
            label={"Confirm Password"}
            placeholder={"Confirm your password"}
            type={"password"}
            value={signupForm.confirmPassword}
            name="confirmPassword"
            onChange={onChangeInput}
          />
          <div className="text-center">
            <Button type="submit">Signup</Button>
          </div>
        </form>
      </Auth>
    </>
  );
}
