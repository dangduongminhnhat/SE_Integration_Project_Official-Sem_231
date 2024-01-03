import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaBook } from "react-icons/fa";
import Book from "../../../img/book.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function LibDocDetail() {
  const { document_id } = useParams();
  const [authorized, setAuthorized] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const info = cookies.get("info");

  const [selectedDoc, setSelectedDoc] = useState({});
  useEffect(() => {
    if (!token || !info) {
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("info", { path: "/" });
    }
    axios
      .post('http://localhost:8080/api/authorization/collab', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAuthorized(true);
      })
      .catch((error) => {
        setAuthorized(false);
      });
    axios
      .get("http://localhost:8080/api/documentManagement/detail", {
        params: {
          document_id: parseInt(document_id),
        },
      })
      .then((response) => {
        setSelectedDoc(response.data.docDetail);
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
  }, []);

  if (!selectedDoc) {
    return <div>Document not found</div>;
  }

  const requestLoan = (book_id) => {
    axios.post("http://localhost:8080/api/loanManagement/customer/loanrequest", { book_id: book_id }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200 && '300' in response.data) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
  }

  return (
    <div className="container mx-auto mt-6 p-8 rounded max-w-5xl">
      <div className="flex mx-4">
        {authorized && (<div className="mr-2">
          <button className="flex items-center bg-primary-500 text-white px-4 py-2 rounded" onClick={() => requestLoan(selectedDoc.document_id)}>
            <FaBook className="mr-2" /> Đăng ký mượn
          </button>
        </div>)}

      </div>
      <div>
        <div className="flex mx-4 my-4">
          <img
            src={selectedDoc.image_url}
            alt={selectedDoc.doc_name}
            className="w-72 aspect-[3/4] object-cover block my-2"
          />
          <div className="flex-grow mx-4 my-2">
            <h1 className="font-bold text-4xl text-primary-900">
              {selectedDoc.doc_name}
            </h1>
            <table className="mt-4">
              <tbody>
                <tr className="p-4">
                  <td className="pr-8">Tên tác giả:</td>
                  <td>{selectedDoc.author}</td>
                </tr>
                <tr className="p-2">
                  <td className="pr-4">Năm xuất bản:</td>
                  <td>{selectedDoc.publish_year}</td>
                </tr>
                <tr className="p-2">
                  <td className="pr-4">Nhà xuất bản:</td>
                  <td>{selectedDoc.publisher}</td>
                </tr>
                <tr className="p-2">
                  <td className="pr-4">Thể loại:</td>
                  <td>{selectedDoc.type}</td>
                </tr>
                <tr className="p-2">
                  <td className="pr-4">Số lượng:</td>
                  <td>{selectedDoc.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-4">
          <h3 className='text-2xl font-bold text-primary-900'>Mô tả</h3>
          <p className="text-justify" style={{ whiteSpace: "pre-line" }}>
            {selectedDoc.description}
          </p>
        </div>
      </div>
    </div>
  );
}