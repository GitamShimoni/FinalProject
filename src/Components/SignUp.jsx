import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password should be at least 8 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        'Password should contain at least one uppercase letter and one number'
      );
      return;
    }

    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('phoneNumber',phoneNumber);
    localStorage.setItem('email', email);

    setName('');
    setPassword('');

    alert('Signup successful!');

    navigate('/projects')
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id='signup-header'>Sign-Up</h2>
      <div className='sign-inputs'>
        <label className='input-label'>
          First Name: <br />
          <input className='input'
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <div className='sign-inputs'>
        <label className='input-label'>
          Password: <br />
          <input className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className='sign-inputs'>
        <label className='input-label'>
          Password: <br />
          <input className='input'
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
      </div>
      <div className='sign-inputs'>
        <label className='input-label'>
          Password: <br />
          <input className='input'
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
      </div>
      <div className='sign-inputs'>
        <label className='input-label'>
          Password: <br />
          <input className='input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className='login-buttons'>Sign Up</button>
    </form>
  );
};

export default SignUp;