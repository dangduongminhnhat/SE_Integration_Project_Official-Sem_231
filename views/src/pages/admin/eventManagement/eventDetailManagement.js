import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const EventDetailManagement = () => {
  const { id } = useParams();

  const [commentData, setCommentData] = useState({
    content: '',
  });

  const handleInputChange = (e) => {
    const {value} = e.target;
    setCommentData({
      ...commentData,
      content: value,
    });
  };

  const [comments, setComment] = useState([]);
  const [postDetail, setPostDetail] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/api/post/detail", {params: {id: id}})
      .then((response) => {
        if (response.status === 200 && 'postDetail' in response.data) {
          setPostDetail(JSON.parse(response.data.postDetail));
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });

      axios.get("http://localhost:8080/api/post/comment/list", {params: {id: id}})
      .then((response) => {
        if (response.status === 200 && 'commentList' in response.data) {
          setComment(JSON.parse(response.data.commentList));
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
    }, []);

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const giveComment = () => {
    axios.post("http://localhost:8080/api/post/comment/new", {id: id, content: commentData.content}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200 && '300' in response.data) {
        //comment thành công
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error!!!!!!", error);
    });
  }

  const [postData, setPostData] = useState({
    title: '',
    brief: '',
    content: '',
  });

  const editPost = () => {
    axios.get("http://localhost:8080/api/post/edit", {params: {id: id, content: postData.content, brief: postData.brief, title: postData.title}})
    .then((response) => {
      if (response.status === 200 && '300' in response.data) {
        //edit thành công
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error!!!!!!", error);
    });
  }

  const deletePost = () => {
    axios.get("http://localhost:8080/api/post/delete", {params: {id: id}})
      .then((response) => {
        if (response.status === 200 && '300' in response.data) {
          //xóa post thành công
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
  }
 
  // const comments = [
  //   {
  //     id: 1,
  //     author: 'Michael Gough',
  //     profilePic: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
  //     date: 'Feb. 8, 2022',
  //     content: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
  //   },
  // ];

  const heartColor = isLiked ? 'text-red-500' : 'text-gray-500';

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="event"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
          />
          {postDetail.map((post) => (
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Date: {(post.create_date).substring(0, 10)}</h2>
            <h1 className="text-blue-900 text-3xl title-font font-medium mb-1">{post.title}</h1>
            <div className="flex mb-4">
             
            </div>
           
            <p className="leading-relaxed text-blue-700">Tóm tắt sự kiện</p>
            <p>{post.brief}</p>
            <p className="leading-relaxed text-blue-700">Mô tả chi tiết sự kiện</p>
            <p>{post.content}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

            </div>
            <div className="flex">
            <button className="flex mr-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
              onClick={()=>editPost()}
            >
                Edit
              </button>
              <button className="flex mr-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              onClick={()=>deletePost()}
              >
                Delete
              </button>
              
              <button onClick={handleLike} className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ${heartColor}`}>
                <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
            </button>
            </div>
          </div>))}
        </div>
        <div className='sm:p-10 m-16'>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
            <label htmlFor="comment" className="sr-only">Hãy thảo luận về chủ đề</label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
              placeholder="Write a comment..."
              required
              value={commentData.content}
              onInput={handleInputChange} 
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 "
            onClick= {()=>giveComment()}          
          >
            Gửi bình luận
          </button>
        </form>
            {comments.map((comment) => (
          <article key={comment.id} className="p-6 text-base bg-white border-t border-gray-200 ">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                  <img className="mr-2 w-6 h-6 rounded-full" src={comment.avatar_url} alt={comment.student_name} />
                  {comment.student_name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-02-08" title="February 8th, 2022">{(comment.last_change).substring(0,10)}</time>
                </p>
              </div>

            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button" className="flex items-center text-sm text-gray-500 hover:underline font-medium">

              </button>
            </div>
          </article>))}
        </div>
        
      </div>
    </section>
  );
};

export default EventDetailManagement;
