import React from 'react';
import book  from "../img/sk.png"
const BlogCard = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full p-8 pt-0">
        {data.map((item, index) => (
          <a
            key={index}
            href={`event/${item.post_id}`}
            className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row  hover:bg-gray-100 rounded-lg shadow md:flex-row hover:bg-blue-600 mt-4 mb-4"
          >
            <img
              className="object-cover w-full rounded-t-lg h-100 md:h-auto md:w-60 md:rounded-none md:rounded-s-lg"
              src={book}
              alt="book"
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-600 ">
                {item.title}
              </h5>
              <p className="mb-3 font-normal text-gray-600 ">
                {item.brief}
              </p>
              <p className="mb-3 font-normal text-gray-400 ">
                {item.student_name} - Date: {(item.create_date).substring(0, 10)}
              </p>
            </div>
            
          </a>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
