import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./Login.css"
const Login = () => {

    const [refresh,setRefresh] = useState(true)

    useEffect(()=>{
      setTimeout(() => {
        setRefresh(false)
      }, 1200);
    },[])

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
    <form className='login-form' >
    <div>
      <label htmlFor="userName">:שם משתמש</label>
      <input
        type="text"
        // value={userName}
        // onChange={(e) => setUserName(e.target.value)}
      />
    </div>
    
    <br />
    <div>
      <label htmlFor="password">:סיסמא</label>
      <input
        type="password"
        id="password"
        required={true}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
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
