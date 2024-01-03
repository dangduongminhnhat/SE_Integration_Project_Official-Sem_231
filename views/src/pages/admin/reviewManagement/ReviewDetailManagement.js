import { useEffect, useState } from 'react';
import ReviewMain from '../../../component/ReviewMain';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import LoadingElement from '../../../component/LoadingElement';
import CommentReviewList from '../../user/forum/CommentReviewList';

function ReviewDetailManagement() {
  const { id } = useParams();
  const [ , setUser] = useState(null);
  const [review, setReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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
      .post("http://localhost:8080/api/review/reviewContentAll",
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
        setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
      });
  }, [id]);
  
  return (
    <div className='w-full px-0 py-10 sm:px-36 lg:px-60 xl:px-72'>
      {review !== null ? <>
      <ReviewMain item={review} />
      <CommentReviewList review_id={id} />
      </>
      : errorMessage !== '' ?
        <h2 className="text-center text-lg font-semibold">{errorMessage}</h2>
      :
        <LoadingElement />
      }
    </div>
  );
}

export default ReviewDetailManagement;