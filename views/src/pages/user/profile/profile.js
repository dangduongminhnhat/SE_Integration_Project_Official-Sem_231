/**
 * trang cá nhân người dùng gồm thông tin cá nhân như mssv, họ và tên, avatar thì hardcode, ...
 * thống kê số lượng yêu cầu mượn sách/ số lượng sách đang mượn, ấn vào nó sẽ ra trang chi tiết
 * trang chi tiết này gồm 2 bảng: 1 bảng là thông tin sách đang mượn, 1 bảng là những yêu cầu mượn trước đó
 * ở dưới sẽ có những thống kê như số lượng sách viết đã quyên góp, ấn vào nó sẽ hiện danh sách
 * số lượng bài review/topic đã tạo, ấn vào nó sẽ hiện danh sách, ấn vào 1 dòng trong danh sách nó sẽ ra cái bài review/topic chi tiết trong forum
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [numOfBorrow, setNumOfBorrow] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.get("TOKEN");
    const info = cookies.get("info");
    if (!token || !info) {
      setUser(null);
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      navigate('/401');
    } else {
      setUser(info);
      // Error: Cannot get borrowhistory so I just comment this
      axios.post("http://localhost:8080/api/loanManagement/customer/borrowhistory", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          // console.log(JSON.parse(response.data.borrowHistory))
          setNumOfBorrow(JSON.parse(response.data.borrowHistory).length);
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
        });
      axios
        .post("http://localhost:8080/api/review/reviewListMember", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setNumOfReviews(response.data.reviewList.length);
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
        });
    }
  }, []);
  if (!user) {
    return <></>;
  }
  
  return (
    <div className='flex flex-grow justify-center '>
      <div className='flex flex-row gap-20'>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100 border border-gray-300 px-10 rounded-xl bg-blue-100">
            <div className="py-8 px-8 w-full space-y-2 sm:py-4 sm:flex sm:justify-center sm:items-center sm:space-y-0 sm:space-x-6">
              <img 
                className="block mx-auto w-24 h-24 object-cover rounded-full sm:mx-0 sm:shrink-0"
                src={user.avatar_url}
                alt="Student Avatar"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">Họ và Tên: </dt>
              <dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">{user.student_name}</dd>
              
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">MSSV: </dt>
              <dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">{user.student_id}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">Email: </dt>
              <dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">{user.email}</dd>
            </div>
            {/*Not developed yet*/}
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">Số sách đã quyên góp: </dt>
              <Link to="#"><dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">1 <span className='text-blue-300'>(Click để xem chi tiết)</span></dd></Link>
            </div> */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">Số sách đang mượn: </dt>
              <Link to="/borrow-history"><dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">{numOfBorrow} <span className='text-blue-300'>(Click để xem chi tiết)</span></dd></Link>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-medium leading-6 text-blue-700">Các chủ đề đã tạo: </dt>
              <Link to="/review-history"><dd className="mt-1  leading-6 text-blue-500 sm:col-span-2 sm:mt-0">{numOfReviews} <span className='text-blue-300'>(Click để xem chi tiết)</span></dd></Link>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}