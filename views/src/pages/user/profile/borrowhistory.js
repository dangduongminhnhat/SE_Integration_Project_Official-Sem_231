import React, { useEffect, useState }  from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function BorrowHistory() {
  const [borrowHistory, setBorrowHistory] = useState([]);
  
  useEffect(() => {
    axios.post("http://localhost:8080/api/loanManagement/customer/borrowhistory", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200 && 'borrowHistory' in response.data) {
        setBorrowHistory(JSON.parse(response.data.borrowHistory));
      }
    })
    .catch((error) => {
      console.error("Error!!!!!!", error);
    });
  }, []);

  const requestReturn = (id, book_id, status) => {
    axios.post("http://localhost:8080/api/loanManagement/customer/returnrequest", {id: id, book_id: book_id, status: status}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200 && '300' in response.data) {
        //request mượn thành công
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error!!!!!!", error);
    });
  }

  return (
      <div className="flex-grow">
          <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
          <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue-500 pt-10">Lịch sử mượn</h1>
          <div className="flex flex-col justify-center py-4">
        {borrowHistory.map((item, index) => (
          <div className='flex items-center border-b border-gray-200 flex justify-between py-4 px-1'>
            <div className='flex flex-col'>
              <div className='sm:text-lg font-bold text-blue-500'>{item.doc_name}</div>
              <div style={{ margin: "10px 0 10px" }}> Trạng thái : <span className={item.status === 3 ? "text-green-500" : "text-red-500"}>{item.status === 3 ? "Đã trả" : (item.status === 4 || item.status === 10) ? "Chưa trả" : "Quá hạn"}</span></div>

              <div className='text-gray-400'>Ngày mượn : {(item.received_day).substring(0, 10)}</div>
              {item.status === 3 && <div className='text-gray-400'>Ngày trả : {(item.returned_day).substring(0, 10)}</div>}
            </div>
            <div>
              <button className='border rounded bg-blue-400 p-2 hover:bg-medium text-white'>Xem chi tiết</button>
            </div>
            {(item.status === 4 || item.status === 5) && <div>
              <button className='border rounded bg-blue-400 p-2 hover:bg-medium text-white' onClick={()=>requestReturn(item.id, item.document_id, item.status)}>Trả sách</button>
            </div>}
          </div>
        ))}
          </div>
          </div>
      </div>
      
  );
}
