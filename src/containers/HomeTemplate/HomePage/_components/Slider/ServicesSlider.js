import React from 'react';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { Link } from 'react-router-dom';
export default function HomeServicesSlider() {
  const settings = {
    infinite: true,
    className: "home-slider",
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
  };

  const sliderData = [
    {
      img: "assets/img/product/product1.jpg",
      description: "Build your brand",
      title: "Logo Design"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Customize your site",
      title: "WordPress"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Share your message",
      title: "Voice Over"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Engage your audience",
      title: "Video Explainer"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Reach more customers",
      title: "Social Media"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Unlock growth online",
      title: "SEO"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Customize your site",
      title: "Illustration"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Go global",
      title: "Translation"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Learn your business",
      title: "Data Entry"
    },
    {
      img: "assets/img/product/product1.jpg",
      description: "Showcase your story",
      title: "Book Covers"
    },
  ];

  const handleRenderSlider = () => {
    return sliderData.map((slide, index) => {
      return (
        <div key={index} className='position-relative slider-item'>
          <img src={slide.img}></img>
          <div className='slider-info'>
            <p className='font-weight-bold mb-1'>{slide.description}</p>
            <h4>{slide.title}</h4>
          </div>
        </div>
      )
    })
  }

  return (
    <Slider {...settings}>
      {handleRenderSlider()}
    </Slider>
  );
}
