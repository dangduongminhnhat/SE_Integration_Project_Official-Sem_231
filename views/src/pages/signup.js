import axios from 'axios';
import React, { useState } from 'react';
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const SignupForm = () => {
  const [formValue, setFormValue] = useState({
    mssv: "",
    name: "",
    email: "",
    password: "",
    avatar_url: ""
  });
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    let avatar_url = formValue.avatar_url;
    if (avatar_url === '') {
      avatar_url = null;
    }
    try {
      const info = {
        student_id: formValue.mssv,
        student_name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        avatar_url: avatar_url
      };
      const response = await axios.post('http://localhost:8080/api/register', info);
      cookies.set("TOKEN", response.data.token, {
        path: "/",
        expires: new Date(Date.now() + 3600 * 1000)
      });
      cookies.set('info', response.data.member, {
        path: "/",
        expires: new Date(Date.now() + 3600 * 1000)
      });
      setShowModal(true);
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
      <div className="w-full max-w-sm p-4 bg-blue-300 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className='flex justify-center'>
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Đăng ký</h5>
          </div>
          {error && showErrors &&
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <BsInfoCircleFill className='flex-shrink-0 inline w-4 h-4 me-3' />
            <span className="sr-only">Lỗi</span>
            <div>{error}</div>
          </div>
          }
          <div>
            <label htmlFor="mssv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MSSV</label>
            <input
              type="text"
              name="mssv"
              id="mssv"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your name"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email@domain.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="avatar_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link Avatar</label>
            <input
              type="url"
              name="avatar_url"
              id="avatar_url"
              placeholder="https://www.example.com/"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="accept" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">Chấp nhận điều khoản</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Đăng ký
          </button>
        </form>
      </div>
      {showModal &&
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 py-5">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 grow">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Đăng ký thành công</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Chào mừng Cộng tác viên đến với CLB.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4">
                <Link to="/sign-in" role="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default SignupForm;