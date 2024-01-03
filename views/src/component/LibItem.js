import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import axios from "axios";
import Cookies from "universal-cookie";

function DocItem({ doc, triggerFetch, setTriggerFetch }) {
  const [user, setUser] = useState(null);
  const isAuthorized = user?.permission === "Thành viên ban chủ nhiệm" || user?.permission === "Thành viên ban hậu cần";
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.get("TOKEN");
    const info = cookies.get("info");
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
      return;
    }
    axios
      .post('http://localhost:8080/api/authorization/logistic', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(info);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          cookies.remove("TOKEN", { path: "/" });
          cookies.remove("info", { path: "/" });
        }
        if (error.response.status === 403) {
          setUser(info);
        }
      });
  }, []);
  
  const handleEdit = (e) => {
    // The following function call (e.preventDefault()) is used to prevent redirecting of an <a> link containing this button
    // (view "library" file for more details). This line is not a mistake so NEVER REMOVE IT unless you change the <a> tag.
    e.preventDefault();
    navigate(`/admin/library-management/edit/${doc.document_id}`);
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isAuthorized) {
      return;
    }
    if (window.confirm("Bạn có muốn xóa tài liệu này hay không?")) {
      try {
        const response = await axios.get(`http://localhost:8080/api/documentManagement/delete?document_id=${doc.document_id}`);
        alert(response.data.message);
        setTriggerFetch(!triggerFetch);
      }
      catch (error) {
        console.log(error.response);
      }
    }
  };
  
  return (
    <div className="mb-3 rounded overflow-hidden shadow hover:shadow-xl my-4 border border-gray">
      <div key={doc.document_id} className="flex overflow-hidden">
        <img
          src={doc.image_url}
          alt={doc.doc_name}
          className="w-48 aspect-[3/4] object-cover block my-2 mx-2"
        />
        <div className="px-6 py-4 overflow-hidden">
          <h3 className="font-bold text-2xl text-primary-800 mb-2">
            {doc.doc_name}
          </h3>
          <p className="text-bluelight text-base line-clamp-3">{doc.description}</p>
        </div>
      </div>
      <div className="px-4 py-2 pb-4 flex justify-between">
        <div className="flex items-center">
          <span className="inline-block pr-2 text-sm text-gray-500 mr-2 border-r-2">
            {doc.publisher}
          </span>
          <span className="inline-block pr-2 text-sm text-gray-500 mr-2 border-r-2">
            {doc.publish_year}
          </span>
          <span className="inline-block pr-2 text-sm text-gray-500 mr-2">
            {doc.author}
          </span>
        </div>
        <div className="inline-flex items-center rounded-md shadow-sm">
          <button
            type="button"
            className={`text-slate-800 hover:text-primary-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 ${isAuthorized ? "rounded-l-lg" : "rounded-lg"} font-medium px-4 py-2 inline-flex space-x-1 items-center`}
          >
            <span>
              <IoEyeOutline className="w-4 h-4" />
            </span>
            <span>Xem</span>
          </button>
          {isAuthorized && <>
          <button
            type="button"
            className="text-slate-800 hover:text-primary-700 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={handleEdit}
          >
            <span>
              <FiEdit className="w-4 h-4" />
            </span>
            <span>Sửa</span>
          </button>
          <button
            type="button"
            className="text-slate-800 hover:text-primary-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={handleDelete}
          >
            <span>
              <GoTrash className="w-4 h-4" />
            </span>
            <span>Xóa</span>
          </button>
          </>}
        </div>
      </div>
    </div>
  );
}

export default DocItem;