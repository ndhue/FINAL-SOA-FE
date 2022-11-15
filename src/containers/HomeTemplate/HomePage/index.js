import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HomeCarousel from '../_components/Carousel';
import HomeServicesSlider from './_components/Slider/ServicesSlider';
import HomeTestimonialSlider from './_components/Slider/TestimonialSlider';
import './style.css';

export default function HomePage(props) {
  const handleOnSubmit = e => {
    e.preventDefault();
    props.history.push("/search");
  }
  const handleOnChange = e => {
    localStorage.setItem("job-keyword", JSON.stringify(e.target.value.trim()));
  }

  const select = item => { return document.querySelector(item) };
  const handlePlayVideo = () => {
    select(".home-video-bg")?.classList.add("show-video");
    select(".freelance-video").autoplay = true;
    select(".freelance-video").load();
  }

  window.addEventListener('mouseup', function (e) {
    if (select(".home-video-bg") && select(".freelance-video") && e.target != select(".freelance-video")) {
      select(".home-video-bg").classList.remove("show-video");
      select(".freelance-video").autoplay = false;
      select(".freelance-video").pause();
    }
  });

  const marketplaceData = [
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg',
      title: 'Graphics & Design'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg',
      title: 'Digital Marketing'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg',
      title: 'Writing & Translation'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg',
      title: 'Video & Animation'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg',
      title: 'Music & Audio'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg',
      title: 'Programming & Tech'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg',
      title: 'Business'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg',
      title: 'Lifestyle'
    },
    {
      img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg',
      title: 'Data'
    },
  ];
  const handleRenderMarketplace = () => {
    return marketplaceData.map((item, index) => {
      return (
        <div key={index} className='home-explore-item'>
          <a>
            <img src={item.img}></img>
            <p className='m-0'>{item.title}</p>
          </a>
        </div>
      );
    });
  };

  return (
    <section className='home-page'>
      <header>
        <HomeCarousel />
        <div className='container position-relative' style={{ height: 550, background: "transparent" }}>
          <div className='position-absolute home-search'>
            <h1 className='home-title font-weight-bold'>THẾ GIỚI DIGITAL ART RỘNG LỚN</h1>
            <h3 className=''><i>Nơi bạn có thể trao đổi tác phẩm của bản thân</i></h3>
            <h3 className=''>Hãy tham gia ngay</h3>
            <Link className="nav-link btn btn-success text-white btn-shop p-2" to="/signup" >Khám phá</Link>
          </div>
        </div>
      </header>
      <section className='home-partner'>
        <div className='container d-flex justify-content-center align-items-center'>
          <p className='m-0'>Trusted by:</p>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png' alt='Facebook'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png' alt='Google'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png' alt='P&G'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png' alt='Paypal'></img>
        </div>
      </section>
      <section className='container'>
        <div className='home-slider-container'>
          <h2>Bán chạy</h2>
          <HomeServicesSlider />
        </div>
      </section>
      <section className='containerr'>
        <section className="banner_section">
          <div className="container">
            <div className="section_title">
              <h2>Nhiều thể loại</h2>
            </div>
            <div className="banner_container d-flex">
              <div className="single_banner position-relative col-8">
                <img src="assets/img/bg/bg1.png" alt />
                <figcaption className="banner_text position-absolute">
                  <h3>nhân vật anime <br /> yêu thích</h3>
                  <a className="btn btn-primary" href="shop.html">Khám phá</a>
                </figcaption>
              </div>
              <div className="single_banner position-relative col-4">
                <img src="assets/img/bg/bg2.png" alt />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className='home-explore'>
        <div className='container'>
          <h2>Explore the marketplace</h2>
          <div className='row'>
            {handleRenderMarketplace()}
          </div>
        </div>
      </section>
    </section>
  )
}
