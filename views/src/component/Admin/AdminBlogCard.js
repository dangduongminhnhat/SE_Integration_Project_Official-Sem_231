import React from 'react';
import book  from "../../img/sk.png"
const AdminBlogCard = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full p-8 pt-0">
        {data.map((item, index) => (
            <div className='bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row rounded-lg shadow md:flex-row mt-4 mb-4'>
                 <a
                    key={index}
                    href={`event-management/detail/${item.post_id}`}
                    className="flex flex-col items-center w-full bg-white md:flex-row md:flex-row"
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
                        {item.student_name} - {(item.create_date).substring(0, 10)}
                    </p>
                    </div>
                    
                </a>
                <div className='flex justify-end mx-2 my-2'>
                    <div className="inline-flex items-center rounded-md shadow-sm">
                        <button className="text-slate-800 hover:text-primary-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            </span>
                            <span>Edit</span>
                        </button>
                        <button className="text-slate-800 hover:text-primary-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                        
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </span>
                            <span>Delete</span>
                        </button>
                    </div>

                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogCard;
