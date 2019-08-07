import * as React from "react";
import * as LoginServices from "../services/login";
import { useState, useEffect } from "react";
import '../styles/login_styles.css';

const Login = (props: any) => {
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  

  useEffect(() => {
    setEmail(email);
    setPassword(password);
  }, [email, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
      setEmail(e.target.value);  
      break;
      case 'password':
      setPassword(e.target.value);  
      break;
      default:
        break;
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    // console.log(email);
    // console.log(password);
    const login = LoginServices.login(email, password);
    login.then((data: any) => {
      console.log(data)
        props.setLoggedIn(data.loggedin)
        props.setUser(data.user);
    });
    
  
    // console.log(login);
    // login.unsubscribe();
  };

  return (
    <div className="login-form">
      <h3>Locus Prime</h3>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          required
          />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          required
        />
        <button type="submit">Login/SignUp</button>
      </form>
    </div>
  );
};

export default Login;
