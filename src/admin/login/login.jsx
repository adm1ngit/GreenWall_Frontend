import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Oldindan belgilangan login va parol
  const hardcodedUser = {
    username: 'admin',
    password: '123',
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (email === hardcodedUser.username && password === hardcodedUser.password) {
      // Login muvaffaqiyatli
      localStorage.setItem('token', 'fake-token'); // Token o‘rniga soxta token
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      setErrorMessage('Login yoki parol noto‘g‘ri!');
    }
  };

  return (
    <section>
      <div className="backdrop-blur-md w-full h-full static"></div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <Link to='/login' className="flex items-center mb-12 text-xl font-semibold text-gray-100 dark:text-white">
          <img className="mr-3 font-serif w-80" src={logo} alt="logo" />
        </Link>
        <div className="w-1/2 h-auto bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-100">
          <div className="mx-16 my-12 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl text-black font-medium leading-tight tracking-tight md:text-2xl">
              Login
            </h1>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <form className="space-y-4 md:space-y-6 text-black" onSubmit={loginHandler}>
              <div>
                <input
                  type="text"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-gray-100 border-b-2 border-gray-950 focus:outline-none w-full p-2.5 font-serif"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="dark:bg-gray-100 border-b-2 border-gray-950 focus:outline-none w-full p-2.5 font-serif mb-10"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-black hover:text-[#0C4840] hover:outline-[#0C4840] focus:ring focus:ring-[#0C4840] text-sm px-5 py-2.5 text-center bg-[#0C4840] rounded-3xl font-serif"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
