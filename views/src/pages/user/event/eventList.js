import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlogCard from '../../../component/BlogCard';
import data from './data';
import img1 from '../../../img/event1.png';
import img2 from '../../../img/event2.png';
import img3 from '../../../img/event3.png';

const Event = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
  };

  const [posts, setPost] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/api/post/")
      .then((response) => {
        if (response.status === 200 && 'postList' in response.data) {
          setPost(JSON.parse(response.data.postList));
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
    }, []);
  
  return (
    <div className="flex-grow flex pl-10 pt-8 bg-blue-50">
      <div className="w-1/10 overflow-hidden h-screen mt-4">
        <div className="sticky top-0 h-screen max-w-xs ">
          <Slider {...settings}>
            <img className="h-full border border-blue-500 rounded object-cover" src={img1} alt="Image 1" />
            <img className="h-full border border-blue-500 rounded object-cover" src={img2} alt="Image 2" />
            <img className="h-full border border-blue-500 rounded object-cover" src={img3} alt="Image 3" />
          </Slider>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <BlogCard data={posts} />
      </div>
    </div>
  );
};

export default Event;
