import { useEffect, useState } from "react";
import { loginUser } from "../../API/apiServices";
import { useRecoilState } from "recoil";
import { authTokenState, loggedInState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loggedIn,setLoggedIn] = useRecoilState(loggedInState);
  const [authToken,setAuthToken] =useRecoilState(authTokenState)
  const navigate = useNavigate();

useEffect(()=>{
  const token = localStorage.getItem('authToken')

  if(token){
    setAuthToken(authToken)
    setLoggedIn(true)
  }
},[])

  useEffect(()=>{
    if(loggedIn){
      navigate('/dashboard')
    }
  },[loggedIn])
  const [userData,setUserData]= useState({
    email:'',
    password:''
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange =(event)=>{
    const {name,value}=event.target
    setUserData(prevData =>({
      ...prevData,
      [name]:value
    }))
    
  }
  const loginStateSet =(token)=>{
    localStorage.setItem('authToken',token)
    setAuthToken(token)
    setLoggedIn(true)


  }

const handleLogin=async()=>{
  const res = await loginUser(userData)
  console.log(res.token)
  if(!res){
    console.log("LOGIN FAILED")
  }
  else{
    loginStateSet(res.token)
 
  }

}






  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-b from-sky-500 via-blue-600 to-indigo-800 h-screen">
        <div className="text-white text-center">
          <div className="font-kodemono font-semibold text-lg">WELCOME,Back !!</div>
          {console.log(authTokenState)}
          <div>
            <input
              className="border-emerald-950 text-black rounded-lg p-2 m-2"
              type="email"
              value ={userData.email}
              onChange={handleChange}
              placeholder="Enter you Email"
              name="email"
            />
          </div>
          <div className="relative">
            <input
              className="border-emerald-950 text-black rounded-lg p-2 m-2"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible?<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>:
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>}
            </button>
          </div>
          <div>
            <button className=" p-2 m-2 font-kodemono border rounded-md border-gray-800" onClick={handleLogin}>
              Login
            </button>
            <br/>
            <button className=" p-2 m-2 font-kodemono text-xs border rounded-md border-gray-800" onClick={()=>console.log("Password reset is yet to apply")}>
              Forgot Password !?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
