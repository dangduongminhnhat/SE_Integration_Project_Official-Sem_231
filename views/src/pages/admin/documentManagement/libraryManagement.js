/*
    giao diện hiển thị tất cả tài liệu, có giao diện thêm sách vào, anh nghĩ maybe mình nên sử dụng lại cái giao diện của library dành cho user :???
    ngoài ra còn có thêm phần duyệt sách donate từ user
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUpload, FaSearch } from "react-icons/fa";
import DocItem from "../../../component/LibItem";
import axios from "axios";
import LoadingElement from "../../../component/LoadingElement";

export default function LibraryManagement() {
  const [documentList, setDocumentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/documentManagement")
      .then((response) => {
        setDocumentList(response.data.docList);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
      });
  }, [triggerFetch]);
  
  return (
    <div className="container max-w-screen-xl mx-auto">
      <h1 className='text-4xl text-center font-bold mt-8'>Quản lý thư viện</h1>
      <div className="flex justify-between my-8">
        <div className="flex items-center gap-2">
          <Link
            role="button"
            to="/admin/library-management/upload"
            className="inline-flex items-center bg-primary-500 hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded"
          >
            <FaUpload className="mr-2" />
            <span>Đăng tải tài liệu mới</span>
          </Link>
          {/* <Link
            role="button"
            to="/admin/library-management/donate-management"
            className="bg-primary-500 hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded"
          >
            Phê duyệt tài liệu mới
          </Link> */}
          { /* Not developed yet */}
        </div>
        <div className="flex items-center text-darkblue border-b border-primary-300 h-10">
          <form className="flex items-center text-darkblue">
            <span className="ml-2">
              <FaSearch className="text-primary-600 mr-5" />
            </span>
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Search..."
            />
            <select name="sort" className="focus-visible:outline-none">
                <option value='datedes' defaultChecked>Latest</option>
                <option value='dateacs'>Oldest</option>
                <option value='viewdes'>Most View</option>
                <option value='likedes'>Most Like</option>
            </select>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {documentList.length > 0 && errorMessage === '' ?
          documentList.map((doc) => (
            <Link
              key={doc.document_id}
              to={`/admin/library-management/document-detail/${doc.document_id}`}
            >
              <DocItem doc={doc} triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch} />
            </Link>
          ))
        : errorMessage !== '' ?
          <h2 className="text-center text-lg font-semibold">{errorMessage}</h2>
        :
          <LoadingElement />
        }
      </div>
    </div>
  )
}