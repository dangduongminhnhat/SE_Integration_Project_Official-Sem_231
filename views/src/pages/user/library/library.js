import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import DocItem from "../../../component/LibItem";
import axios from "axios";
import LoadingElement from "../../../component/LoadingElement";

export default function Library() {
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
  
  const handleSearchInput = async (e) => {
    if (e.target.value === '') {
      setTriggerFetch(!triggerFetch);
      setErrorMessage('');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/documentManagement/search?doc_name=${e.target.value}`);
      setDocumentList(response.data.docList);
      setErrorMessage('');
    }
    catch (error) {
      console.log(error);
      setDocumentList([]);
      setErrorMessage(error.response?.data?.message ?? "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
    }
  }
  
  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="flex justify-between my-8">
        <div>
          {/* <Link
            to="/library/donate-document"
            className="flex items-center bg-primary-500 hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded"
          >
            <FaUpload className="mr-2" />
            <span>Quyên góp tài liệu</span>
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
              onChange={handleSearchInput}
            />
            {/* <select name="sort" className="focus-visible:outline-none">
              <option value="datedes" defaultChecked>Latest</option>
              <option value="dateacs">Oldest</option>
              <option value="viewdes">Most View</option>
              <option value="likedes">Most Like</option>
            </select> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {documentList.length > 0 && errorMessage === '' ?
          documentList.map((doc) => (
            <Link
              key={doc.document_id}
              to={`/library/document-detail/${doc.document_id}`}
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
  );
}