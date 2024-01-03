import axios from "axios";
import { useEffect, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ForumCreateReview() {
  const [user, setUser] = useState(null);
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
  }, []);
  
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
      const response = await axios.post(`http://localhost:8080/api/review/submitNewReview`,
        {
          title: reviewData.reviewTitle,
          book_name: reviewData.reviewForBook,
          book_author: reviewData.bookAuthor,
          summary: reviewData.reviewSummary,
          content: reviewData.reviewContent,
          image_url: reviewData.image,
          student_id: user.student_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(response.data.message);
      window.location.assign('/forum');
    }
    catch (error) {
      setError(error.response?.data?.message);
      setShowErrors(true);
    }
  };
  
  return (
    <div className="w-1/3 mx-auto m-10 p-6 bg-blue-100 rounded-md shadow-md">
      <h1 className="text-center font-bold mb-4 text-2xl">Tạo bài review mới</h1>
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
          Gửi bài review
        </button>
      </form>
    </div>
  );
}