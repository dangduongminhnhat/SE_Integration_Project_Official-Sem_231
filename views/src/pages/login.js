import axios from "axios";
import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginForm = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const cookies = new Cookies();
  
  const handleChange = (e) => {
    setFormValue({
      ...formValue, 
      [e.target.name]: e.target.value
    });
    setShowErrors(false);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = {
        email: formValue.email,
        password: formValue.password
      };
      const response = await axios.post('http://localhost:8080/api/signin', info);
      cookies.set("TOKEN", response.data.token, {
        path: "/",
        expires: new Date(Date.now() + 3600 * 1000)
      });
      cookies.set('info', response.data.member, {
        path: "/",
        expires: new Date(Date.now() + 3600 * 1000)
      });
      setTimeout(() => {
        window.location.assign('/');
      }, 200);
    }
    catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
      else {
        setError('Có lỗi xảy ra! Vui lòng thử lại sau.');
      }
      setShowErrors(true);
    }
  }
  
  return (
    <div className="flex flex-grow p-10 justify-center bg-blue-100">
      <div className="w-full max-w-sm p-4 bg-blue-300 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 mt-8 mb-16">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đăng nhập
            </h5>
          </div>
          {error && showErrors &&
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <BsInfoCircleFill className='flex-shrink-0 inline w-4 h-4 me-3' />
            <span className="sr-only">Lỗi</span>
            <div>{error}</div>
          </div>
          }
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="email@domain.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Đăng nhập
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
            Chưa có tài khoản?{' '}
            <Link to="/sign-up" className="text-blue-700 hover:underline ">
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;