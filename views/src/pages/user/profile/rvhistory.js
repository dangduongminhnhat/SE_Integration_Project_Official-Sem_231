import React, { useEffect, useState } from "react";
import ReviewList from "../../../component/Review";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function ReviewHistory() {
  const [user, setUser] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const info = cookies.get("info");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      navigate('/401');
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
        navigate('/401');
      });
    axios
      .post("http://localhost:8080/api/review/reviewListMember", {}, {
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
  }, []);
  
  return (
    <div className="flex-grow bg-gray-100">
      <div className="px-4 pt-14 md:px-40">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-10">Các chủ đề đã tạo</h1>
        <div className="flex flex-col justify-center py-4">
          <ReviewList data={reviewList} />
        </div>
      </div>
    </div>
  );
}

export default ReviewHistory;