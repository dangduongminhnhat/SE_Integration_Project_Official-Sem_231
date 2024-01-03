import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function ReviewRequest({ data, triggerFetch, setTriggerFetch }) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  
  const handleAcceptRequest = async (id) => {
    try {
      const response = await axios.post('http://localhost:8080/api/review/acceptReview',
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
  
  const handleRejectRequest = async (id) => {
    try {
      const response = await axios.post('http://localhost:8080/api/review/rejectReview',
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
    <div>
      <table className="min-w-full border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Mã số sinh viên</th>
            <th className="border px-4 py-2">Họ và tên</th>
            <th className="border px-4 py-2">Tên sách</th>
            <th className="border px-4 py-2">Tên bài review</th>
            <th className="border px-4 py-2">Ngày đăng tải</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request.review_id}>
              <td className="border px-4 py-2">{request.review_id}</td>
              <td className="border px-4 py-2">{request.student_id}</td>
              <td className="border px-4 py-2">{request.student_name}</td>
              <td className="border px-4 py-2">{request.book_name}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/forum-management/detail/${request.review_id}`} className='text-primary-700'>
                  {request.title}
                </Link>
              </td>
              <td className="border px-4 py-2">{new Date(request.submit_date).toLocaleDateString('en-GB')}</td>
              <td className="border px-4 py-2">
                <button type="button" className="bg-green-500 text-white px-2 py-1 mb-2" onClick={() => handleAcceptRequest(request.review_id)}>Chấp nhận</button>
                <button type="button" className="bg-red-500 text-white px-2 py-1" onClick={() => handleRejectRequest(request.review_id)}>Từ chối</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewRequest;