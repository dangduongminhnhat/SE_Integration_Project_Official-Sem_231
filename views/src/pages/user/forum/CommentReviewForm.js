import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function CommentReviewForm({ review_id, forceRerender }) {
  const [user, setUser] = useState(null);
  const [cmtContent, setCmtContent] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const info = cookies.get("info");
  
  useEffect(() => {
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      setUser(null);
    }
    axios
      .post('http://localhost:8080/api/authorization/collab', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(info);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
      });
  }, [])
  
  const handleInputChange = (e) => {
    setCmtContent(e.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/review/addComment',
      {
        review_id: review_id,
        cmt_content: cmtContent
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCmtContent('');
      setErrorMessage('');
      forceRerender();
    }
    catch (error) {
      setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
    }
  }
  
  return (
    <>
      {user !== null && (
        <div className='mb-6'>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Bình luận</h2>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-4 rounded-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">Hãy viết bình luận về bài review</label>
              <textarea
                id="comment"
                name="cmtContent"
                rows="5"
                className="py-2 px-4 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Viết bình luận"
                value={cmtContent}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 text-xs font-semibold text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200"
            >
              Gửi bình luận
            </button>
            {errorMessage && <h6 className="font-bold text-lg text-center text-red-500 mt-2">{errorMessage}</h6>}
          </form>
        </div>
      )}
    </>
  );
}

export default CommentReviewForm;