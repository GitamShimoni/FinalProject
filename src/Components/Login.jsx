import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./Login.css"
const Login = () => {
    
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [refresh,setRefresh] = useState(true)

    useEffect(()=>{
      setTimeout(() => {
        setRefresh(false)
      }, 1200);
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("UserName:", userName);
      console.log("Password:", password);
      try{
       
        const token = await axios.post(
          "http://localhost:5000/authenticate/login",{userName:userName, password: password}
          )
          window.location.reload();
          console.log(token.data);
          localStorage.setItem('user',JSON.stringify(token.data))
          window.location.href = '/homepage';
      }catch (err) {
        if (err.response && err.response.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else {
          console.log(err);
        }
      }
  
      setUserName('');
      setPassword('');
    };

  return (
    <div className='userpage'>
    {refresh ? (
      <div className="banter-loader">
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
    </div>
    ):(
    <div className='login-block'>
    <form className='login-form' onSubmit={handleSubmit}>
    <div>
      <label htmlFor="userName">:שם משתמש</label>
      <input
        id='userName'
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
    
    <br />
    <div>
      <label htmlFor="password">:סיסמא</label>
      <input
        type="password"
        id="password"
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button className='login-btn' type="submit">Login</button>
    <br />
  </form>
    </div>)}
  </div>
)
}

export default Login
