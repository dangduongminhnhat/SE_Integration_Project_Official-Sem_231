import axios from "axios";
import { useEffect, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function UpdateReview() {
  const { review_id } = useParams();
  const [ , setUser] = useState(null);
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    reviewForBook: '',
    bookAuthor: '',
    reviewSummary: '',
    reviewContent: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
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
      .post('http://localhost:8080/api/authorization/content', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(info);
        fetchData();
      })
      .catch((error) => {
        navigate('/403');
      });
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/review/reviewContentAll",
      {
        review_id: review_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const review = response.data.review;
      console.log(review);
      setReviewData({
        reviewTitle: review.title,
        reviewForBook: review.book_name,
        bookAuthor: review.book_author,
        reviewSummary: review.summary,
        reviewContent: review.content,
        image: review.image_url,
      });
    }
    catch (error) {
      setError(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
    }
  };
  
  const handleInputChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
    setShowErrors(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/review/editReview`,
        {
          title: reviewData.reviewTitle,
          book_name: reviewData.reviewForBook,
          book_author: reviewData.bookAuthor,
          summary: reviewData.reviewSummary,
          content: reviewData.reviewContent,
          image_url: reviewData.image,
          review_id: review_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(response.data.message);
      window.location.assign('/admin/forum-management');
    }
    catch (error) {
      setError(error.response?.data?.message);
      setShowErrors(true);
    }
  };
  
  return (
    <div className="w-1/3 mx-auto m-10 p-6 bg-blue-100 rounded-md shadow-md">
      <h1 className="text-center font-bold mb-4 text-2xl">Sửa bài review</h1>
      <p className="text-sm font-semibold text-gray-600 mb-2">Review ID: {review_id}</p>
      {error && showErrors &&
      <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        <BsInfoCircleFill className='flex-shrink-0 inline w-4 h-4 me-3' />
        <span className="sr-only">Lỗi</span>
        <div>{error}</div>
      </div>
      }
      <form
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="reviewTitle"
          className="block text-sm font-semibold text-gray-600"
        >
          Tựa đề bài review:
        </label>
        <input
          type="text"
          id="reviewTitle"
          name="reviewTitle"
          value={reviewData.reviewTitle}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        
        <label
          htmlFor="reviewForBook"
          className="block text-sm font-semibold text-gray-600"
        >
          Tên sách:
        </label>
        <input
          type="text"
          id="reviewForBook"
          name="reviewForBook"
          value={reviewData.reviewForBook}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        
        <label
          htmlFor="bookAuthor"
          className="block text-sm font-semibold text-gray-600"
        >
          Tác giả:
        </label>
        <input
          type="text"
          id="bookAuthor"
          name="bookAuthor"
          value={reviewData.bookAuthor}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        
        <label
          htmlFor="reviewSummary"
          className="block text-sm font-semibold text-gray-600"
        >
          Tóm tắt nội dung:
        </label>
        <textarea
          id="reviewSummary"
          name="reviewSummary"
          value={reviewData.reviewSummary}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-2 mt-1 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        ></textarea>
        
        <label
          htmlFor="reviewContent"
          className="block text-sm font-semibold text-gray-600"
        >
          Nội dung review:
        </label>
        <textarea
          id="reviewContent"
          name="reviewContent"
          value={reviewData.reviewContent}
          onChange={handleInputChange}
          rows="10"
          className="w-full px-4 py-2 mt-1 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        ></textarea>
        
        <label
          htmlFor="image"
          className="block text-sm font-semibold text-gray-600"
        >
          Link hình ảnh:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={reviewData.image}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
        >
          Chỉnh sửa
        </button>
      </form>
    </div>
  );
}

export default UpdateReview;