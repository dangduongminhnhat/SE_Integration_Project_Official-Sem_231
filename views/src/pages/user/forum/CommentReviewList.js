import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FiMessageCircle } from 'react-icons/fi';

function CommentReviewList({ review_id, rerender, forceRerender }) {
  const [user, setUser] = useState(null);
  const isAdmin = ["Thành viên ban chủ nhiệm", "Thành viên ban truyền thông", "Thành viên ban nội dung", "Thành viên ban hậu cần"].includes(user?.permission ?? '');
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const info = cookies.get("info");
  const [errorMessage, setErrorMessage] = useState('');
  const [commentList, setCommentList] = useState([]);
  
  useEffect(() => {
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
    }
    else {
      setUser(info);
    }
    axios
      .post("http://localhost:8080/api/review/getCommentList",
        {
          review_id: review_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setCommentList(response.data.commentList);
        setErrorMessage('');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage("Bạn phải đăng nhập để xem và thực hiện bình luận!");
        }
        else {
          setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
        }
      });
  }, [rerender]);
  
  const handleDelete = async (student_id, cmt_id) => {
    setErrorMessage('');
    try {
      if (user.student_id === student_id) {
        const response = await axios.post('http://localhost:8080/api/review/deleteOwnComment',
        {
          review_id: review_id,
          cmt_id: cmt_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(response.data.message);
        forceRerender();
      }
      else if (isAdmin) {
        const response = await axios.post('http://localhost:8080/api/review/deleteCommentForced',
        {
          review_id: review_id,
          cmt_id: cmt_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(response.data.message);
        forceRerender();
      }
      else {
        setErrorMessage('Bạn đang cố thực hiện tác vụ không dành cho bạn. Hãy dừng lại ngay!');
      }
    }
    catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau!!!!");
    }
  };
  
  return (
    <div className="mb-6">
      {errorMessage === '' ? <>
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <FiMessageCircle className="w-4 h-4 mr-1" />
          <span>{commentList.length} bình luận</span>
        </div>
        {commentList.map((comment) => (
        <article
          key={comment.cmt_id}
          className="py-6 text-base border-t border-gray-300"
        >
          <div className="flex items-center gap-3 text-sm text-gray-900 mb-2">
            <img
              className="w-6 h-6 rounded-full"
              src={comment.avatar_url}
              alt="Avatar of commenter"
            />
            <p className="font-semibold">{comment.student_name}</p>
            <p>
              <time
                dateTime={comment.cmt_datetime} // Set dateTime dynamically
                title={new Date(comment.cmt_datetime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              >
                {new Date(comment.cmt_datetime).toLocaleDateString('en-GB')}
              </time>
            </p>
            {(user.student_id === comment.student_id || isAdmin) &&
            <button
              type='button'
              className='flex-grow text-end'
              onClick={() => handleDelete(comment.student_id, comment.cmt_id)}
            >
              Xóa bình luận
            </button>
            }
          </div>
          <p className="text-gray-950">{comment.cmt_content}</p>
          {/* <div className="flex items-center text-sm mt-4 space-x-4">
            <button
              type="button"
              className="text-gray-500 hover:underline font-medium"
            >
              Phản hồi
            </button>
          </div> */}
          {/* Not developed yet */}
        </article>
        ))}</>
      :
        <h4 className="text-center text-lg font-semibold">{errorMessage}</h4>
      }
    </div>
  );
}

export default CommentReviewList;