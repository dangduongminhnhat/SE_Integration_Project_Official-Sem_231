/*
    Vào bài đăng forum chi tiết, hiển thị danh sách cmt của cái topic/review đó theo thời gian
    dạng như forum trong bkel chăng?
*/
import React, { useEffect, useState } from 'react';
import ReviewMain from '../../../component/ReviewMain';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingElement from '../../../component/LoadingElement';
import CommentReviewForm from './CommentReviewForm';
import CommentReviewList from './CommentReviewList';
import Cookies from 'universal-cookie';

const DiscussionSection = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [review, setReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [rerender, setRerender] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const info = cookies.get("info");
  
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/review/reviewContentMember",
      {
        review_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setReview(response.data.review);
      })
      .catch((error) => {
        axios
          .post("http://localhost:8080/api/review/reviewContentAccepted",
          {
            review_id: id
          })
          .then((response) => {
            setReview(response.data.review);
          })
          .catch((error) => {
            setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
          });
      });
  }, [id]);
  
  const forceRerender = () => setRerender(!rerender);
  
  return (
    <div className="px-0 sm:px-36 lg:px-60 xl:px-72 py-8 lg:py-10 w-full">
      {review !== null ? <>
        <ReviewMain item={review} />
        {review.status === 'Chấp nhận' && <>
        <CommentReviewForm review_id={id} forceRerender={forceRerender} />
        <CommentReviewList review_id={id} rerender={rerender} forceRerender={forceRerender} />
        </>}
      </>
      : errorMessage !== '' ?
        <h2 className="text-center text-lg font-semibold">{errorMessage}</h2>
      :
        <LoadingElement />
      }
    </div>
  );
};

export default DiscussionSection;