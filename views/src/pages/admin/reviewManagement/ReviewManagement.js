import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function ReviewManagement({ data, triggerFetch, setTriggerFetch }) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  
  const handleDeletePost = async (id) => {
    try {
      const response = await axios.post('http://localhost:8080/api/review/deleteReview',
        {
          review_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(response.data.message);
      setTriggerFetch(!triggerFetch);
    }
    catch(error) {
      alert(error.response?.data?.message ?? 'Hệ thống gặp vấn đề. Vui lòng thử lại sau');
    }
  };
  
  return (
    <div className="mt-8">
      <table className="min-w-full border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Mã số sinh viên</th>
            <th className="border px-4 py-2">Họ và tên</th>
            <th className="border px-4 py-2">Tên sách</th>
            <th className="border px-4 py-2">Tên bài review</th>
            <th className="border px-4 py-2">Ngày đăng tải</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.review_id}>
              <td className="border px-4 py-2">{post.review_id}</td>
              <td className="border px-4 py-2">{post.student_id}</td>
              <td className="border px-4 py-2">{post.student_name}</td>
              <td className="border px-4 py-2">{post.book_name}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/forum-management/detail/${post.review_id}`} className='text-primary-700'>
                  {post.title}
                </Link>
              </td>
              <td className="border px-4 py-2">{new Date(post.submit_date).toLocaleDateString('en-GB')}</td>
              <td className="border px-4 py-2">{post.status}</td>
              <td className="border px-4 py-2">
                {post.status === 'Chấp nhận' &&
                <Link role="button" className="inline-block bg-green-500 text-white px-2 py-1 mb-2" to={`edit/${post.review_id}`}>Sửa</Link>
                }
                <button type="button" className="bg-red-500 text-white px-2 py-1" onClick={() => handleDeletePost(post.review_id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewManagement;