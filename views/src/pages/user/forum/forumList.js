/**
 * Đồ họa giống dạng danh sách cái topic gồm chủ đề, lượt cmt, lượt like bên ngoài, tác giả đăng, thời gian đăng
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import ReviewList from '../../../component/Review';
import axios from 'axios';
import LoadingElement from '../../../component/LoadingElement';
import Cookies from 'universal-cookie';

const Forum = () => {
  const [user, setUser] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();
  
  useEffect(() => {
    let token = cookies.get("TOKEN");
    const info = cookies.get("info");
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      token = null;
    }
    axios
      .post('http://localhost:8080/api/authorization/collab', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(info);
      })
      .catch((error) => {
        cookies.remove("TOKEN", { path: "/" });
        cookies.remove("info", { path: "/" });
      });
    axios
      .post("http://localhost:8080/api/review/reviewListAccepted", {})
      .then((response) => {
        setReviewList(response.data.reviewList);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
      });
  }, []);
  
  return (
    <div className="flex-grow flex px-20 pt-14 bg-blue-50">
      <div className="flex-grow overflow-y-auto">
        <h1 className='text-3xl font-bold text-center text-blue-500 mb-10'>Review sách</h1>
        {user !== null &&
        <div className="px-28 mb-4">
          <Link
            role="button"
            to="/forum/create-review"
            className="inline-flex items-center bg-primary-500 hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded"
          >
            <FaUpload className="mr-2" />
            <span>Gửi bài review</span>
          </Link>
        </div>
        }
        {reviewList.length > 0 && errorMessage === '' ?
          <ReviewList data={reviewList} />
        : errorMessage !== '' ?
          <h2 className="text-center text-lg font-semibold">{errorMessage}</h2>
        :
          <LoadingElement />
        }
      </div>
    </div>
  );
};

export default Forum;