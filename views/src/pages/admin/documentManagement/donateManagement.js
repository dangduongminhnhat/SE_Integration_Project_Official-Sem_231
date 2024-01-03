import axios from 'axios'
import React, { useEffect, useState } from "react";
import donateBookData from './donateBookDummyData';

export default function DonateManagement(){
    return (
        <div className="container mx-auto mt-6 p-8 max-w-4xl">
            {donateBookData.map((book) => (
            <div className='rounded border my-2 p-4'>
                <div className='flex mx-4 my-4'>
                    <img src={book.image} alt={book.doc_name} className="w-72 aspect-[3/4] object-cover block my-2" />
                    <div className='flex-grow mx-4 my-2'>
                        <h1 className='font-bold text-4xl text-primary-900'>{book.doc_name}</h1>
                        <table className='mt-4'>
                            <tr className='p-4'>
                                <td className='pr-8'>Tên tác giả:</td>
                                <td>{book.bookAuthor}</td>
                            </tr>
                            <tr className='p-2'>
                                <td className='pr-4'>Nhà xuất bản:</td>
                                <td>{book.bookPublisher}</td>
                            </tr>
                            <tr className='p-2'>
                                <td className='pr-4'>Năm xuất bản:</td>
                                <td>{book.bookPublishYear}</td>
                            </tr>
                            <tr className='p-2'>
                                <td className='pr-4'>Thể loại:</td>
                                <td>{book.bookType}</td>
                            </tr>
                            <tr className='p-2'>
                                <td className='pr-4'>Số lượng:</td>
                                <td>{book.quantity}</td>
                            </tr>
                            <tr className='p-2'>
                                <td className='pr-4'>Tên người quyên góp:</td>
                                <td>{book.username}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='mx-4'>
                    <p className='text-justify' style={{ whiteSpace: 'pre-line' }}>{book.description}</p>
                </div>
                <div className='flex justify-end mx-4'>
                <button className="bg-green-500 rounded text-white px-2 py-1 mr-2">Đồng ý</button>
                  <button className="bg-red-500 rounded text-white px-2 py-1">Từ chối</button>
                </div>
            </div>
            ))}
        </div>
    )
}