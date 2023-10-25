import React, { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import { login, register,register1,login1 ,sendTokenToBackend,sendTokenToBackend1} from './api/auth';

import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import Footer from '@/components/footer';
import { Card } from '@/components/card';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const [Username,setUsername]=useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(Username,Username, password).then((data)=> {


      })


    
      // Handle successful registration, e.g., redirect to login page
  } catch (error) {
      // Handle registration error, e.g., show error message
      console.error('Registration failed:', error.message);
  }
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
     
      await 
       login(Username,password)

    
      // Handle successful registration, e.g., redirect to login page
  } catch (error) {
      // Handle registration error, e.g., show error message
      alert('Login failed:', error.message);
      
  }
  };

  const handleRegister1 = async (e) => {
    e.preventDefault();
    try {
      await register1(Username,Username, password).then((data)=> {


      })


    
      // Handle successful registration, e.g., redirect to login page
  } catch (error) {
      // Handle registration error, e.g., show error message
      console.error('Registration failed:', error.message);
  }
  };

  const handlelogin1 = async (e) => {
    e.preventDefault();
    try {
     
      await 
       login1(Username,password)

    
      // Handle successful registration, e.g., redirect to login page
  } catch (error) {
      // Handle registration error, e.g., show error message
      alert('Login failed:', error.message);
      
  }
  };

  const responseGoogle = async (response) => {
    console.log(response)
    if (response.credential) {
      const accessToken = response.credential;
      console.log(response)
      
      // Now you can send this accessToken to your Django backend
      try {
        // Assuming sendTokenToBackend is an async function
        await sendTokenToBackend(accessToken)
        
        // After sending the token to the backend successfully, navigate to "/fillform"
   
      } catch (error) {
        // Handle any errors that occur during the sendTokenToBackend operation
        console.error("Error sending token to backend:", error);
        alert("Google login failed");
      }
    
    
   
    } else {
      // Handle error
      alert("Google login failed");
    }
  };
  const responseGoogle1 = async (response) => {
   
    if (response.credential) {
      const accessToken = response.credential;
      
      
      // Now you can send this accessToken to your Django backend
      try {
        // Assuming sendTokenToBackend is an async function
        await sendTokenToBackend1(accessToken);
        
        // After sending the token to the backend successfully, navigate to "/fillform"
       
      } catch (error) {
        // Handle any errors that occur during the sendTokenToBackend operation
        console.error("Error sending token to backend:", error);
        alert("Google login failed");
      }
    
   
    } else {
      // Handle error
      alert("Google login failed");
    }
  };



  const[Switch,setswitch]=useState(true);
  const[Switch2,setswitch2]=useState(true);




  return (
    Switch2?<GoogleOAuthProvider clientId='809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com'> <div className='bg-white h-full p-0 m-0'>
    
    <Navbar />
   
    {Switch?
  
   
  <div className="sm:flex flex-row  items-center justify-center gap-[5%]     px-4 py-6 mt-6 mb-12 lg:py-0">
   <Card/>
       
      w-[90%]   <div className=" block  rounded-lg shadow dark:border md:mt-0 w-[100%] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        
          
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <button className="text-green-500"  onClick={()=>{setswitch2(!Switch2)}}>Register as Startup Founder ?</button>
          <button className='text-xl block mx-auto font-semibold rounded-lg bg-[#6a6af9] px-3 py-1' onClick={()=>{setswitch(!Switch)}}>Login</button>
          <h1 className="text-xl justify-center flex font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              OR
            </h1>
           
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister1}>
          

           


            <div>
                <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input
                  type="Username"
                  name="Username"
                  id="Username"
                  value={Username}
                  onChange={handleUsernameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
             
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 hover:bg-green-500 block mx-auto text-white bg-primary-600 hover:bg-primary-700 bg-blue-500 py-2 rounded-2xl"
              >
                Create an account
              </button>
              <h1 className='flex justify-center font-semibold mx-auto'>OR</h1>
              <div className='flex justify-center mx-auto '>
      <GoogleLogin className='rounded-4xl cursor-pointer'
        clientId="809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onClick={responseGoogle}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
         
        
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </div>


             
            </form>
          </div>
        </div>
      </div>
:
   
<div className="sm:flex flex-row  items-center justify-center gap-[5%]    px-4 py-6 mt-6 mb-12 lg:py-0">
   <Card/>
    <div className="w-full bg-white rounded-lg shadow dark:borde w-[90%]r md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <button className="text-green-500"  onClick={()=>{setswitch2(!Switch2)}}>Register as Startup Founder ?</button>
        <button className='text-xl block mx-auto font-semibold rounded-lg bg-[#6a6af9] px-3 py-1' onClick={()=>{setswitch(!Switch)}}>Register</button>
          <h1 className="text-xl justify-center flex font-bold leading-tight tracking-tight text-white md:text-2xl ">
              OR
            </h1>
           
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlelogin1}>
           


                <div>
                    <label for="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input type="Username"   value={Username}
                  onChange={handleUsernameChange} name="Username" id="Username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit"   className="px-5 hover:bg-green-500 block mx-auto text-white bg-primary-600 hover:bg-primary-700 bg-blue-500 py-2 rounded-2xl">Sign in</button>
                <h1 className='flex justify-center font-semibold mx-auto'>OR</h1>
              <div className='flex justify-center mx-auto '>
      <GoogleLogin className='rounded-4xl cursor-pointer'
        clientId="809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com"
        buttonText="Continue with Google"
      onClick={responseGoogle}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
       
      
        
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </div>
               
            </form>
        </div>
    </div>
</div>
}

  </div>
  <Footer/>
  </GoogleOAuthProvider> 
  :
  <GoogleOAuthProvider clientId='809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com'>
    <div className='bg-white h-full p-0 m-0'>
    
      <Navbar />
     
      {Switch?
     
      
        <div className="sm:flex flex-row items-center justify-center gap-[5%]    px-4 py-6 mt-6 mb-12 lg:py-0">
         <Card/>
          <div className="w-full bg-white rounded-lg shadow dark:border  w-[90%]md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <button className="text-green-500"  onClick={()=>{setswitch2(!Switch2)}}>Register as Public ?</button>
              
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <button className='text-xl block mx-auto font-semibold rounded-lg bg-[#6a6af9] px-3 py-1' onClick={()=>{setswitch(!Switch)}}>Login</button>
          <h1 className="text-xl justify-center flex font-bold leading-tight tracking-tight text-white md:text-2xl ">
              OR
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <div>
                  <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                  <input
                    type="Username"
                    name="Username"
                    id="Username"
                    value={Username}
                    onChange={handleUsernameChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
             
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 hover:bg-green-500 block mx-auto text-white bg-primary-600 hover:bg-primary-700 bg-blue-500 py-2 rounded-2xl"
                >
                  Create an account
                </button>
                <h1 className='flex justify-center font-semibold mx-auto'>OR</h1>
              <div className='flex justify-center mx-auto '>
      <GoogleLogin className='rounded-4xl cursor-pointer'
        clientId="809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com"
        buttonText="Continue with Google"
        text='Continue with Google'
      onClick={responseGoogle1}
      onSuccess={responseGoogle1}
      onFailure={responseGoogle1}
       useOneTap
      
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </div>
              
              </form>
            </div>
          </div>
        </div>
    :
     
  <div className="sm:flex flex-row  items-center justify-center gap-[5%]   px-4 py-6 mt-6 mb-12 lg:py-0">
      <Card/>
      <div className="w-full bg-white rounded-lg shadow dark:border w-[90%] md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <form className="space-y-4 md:space-y-6" onSubmit={handlelogin}>
              <button className='text-xl block mx-auto font-semibold rounded-lg bg-[#6a6af9] px-3 py-1' onClick={()=>{setswitch(!Switch)}}>Register</button>
          <h1 className="text-xl justify-center flex font-bold leading-tight tracking-tight text-white md:text-2xl ">
              OR
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
                  <div>
                      <label for="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                      <input type="Username"   value={Username}
                    onChange={handleUsernameChange} name="Username" id="Username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={handlePasswordChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit"   className="px-5 hover:bg-green-500 block mx-auto text-white bg-primary-600 hover:bg-primary-700 bg-blue-500 py-2 rounded-2xl">Sign in</button>
                  <h1 className='flex justify-center font-semibold mx-auto'>OR</h1>
              <div className='flex justify-center mx-auto '>
      <GoogleLogin className='rounded-4xl cursor-pointer '
        clientId="809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com"
        buttonText="Continue with Google"
      onClick={responseGoogle1}
      onSuccess={responseGoogle1}
      onFailure={responseGoogle1}
       useOneTap
      
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </div>
                
                
              </form>
          </div>
      </div>
  </div>
}

    </div>
    <Footer/>
    </GoogleOAuthProvider>
  );
}
