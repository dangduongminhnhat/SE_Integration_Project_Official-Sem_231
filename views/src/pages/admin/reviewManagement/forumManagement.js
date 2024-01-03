/*
    tương tự với eventManagement
    Hiển thị danh sách bài đăng cũ dưới dạng bảng (đang thắc mắc giao diện của phần này thiệt @@@)
    bao gồm thứ tự, tên bài đăng, ngày tháng đăng bài, tên tác giả (tác giả là admin hoặc member), 
    link đến bài đăng, click vào sẽ ra trang event/detail/:eventPostId
    ngoài ra còn có thêm cái là duyệt bài thảo luận/review, hoặc xóa bài đó đi
*/

import React, { useEffect, useState } from 'react';
import ReviewRequest from './ReviewRequest';
import ReviewManagement from './ReviewManagement';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import LoadingElement from '../../../component/LoadingElement';

function ForumManagement() {
  const [ , setUser] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = cookies.get("TOKEN");
    const info = cookies.get("info");
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      token = null;
    }
    axios
      .post('http://localhost:8080/api/authorization/content', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(info);
      })
      .catch((error) => {
        navigate('/403');
      });
    axios
      .post("http://localhost:8080/api/review/reviewListAll", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setReviewList(response.data.reviewList);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
      });
  }, [triggerFetch]);
  
  const options = [
    { id: 1, label: 'Bài review đã duyệt/từ chối' },
    { id: 2, label: 'Bài review chờ duyệt' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  
  return (
    <div className="container  max-w-screen-xl mx-auto my-8">
      <h1 className='text-4xl font-bold mb-8'>Quản lý diễn đàn</h1>
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option.id}
            className={`${selectedOption.id === option.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded`}
            onClick={() => handleOptionChange(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {reviewList.length > 0 && errorMessage === '' ?
      <div className="mt-8">
        {selectedOption.id === 1 && <ReviewManagement data={reviewList.filter((value) => value.status !== 'Chờ duyệt')} triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch} />}
        {selectedOption.id === 2 && <ReviewRequest data={reviewList.filter((value) => value.status === 'Chờ duyệt')} triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch} />}
      </div>
      : errorMessage !== '' ?
        <h2 className="text-center text-lg font-semibold">{errorMessage}</h2>
      :
        <LoadingElement />
      }
    </div>
  );
}

export default ForumManagement;