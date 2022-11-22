import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { Link } from 'react-router-dom';
import { actFetchProductsData } from 'containers/HomeTemplate/ShopArtPage/modules/actions';
export default function HomeServicesSlider() {
  const dispatch = useDispatch();

  const data = useSelector(state => state.productsManagementReducer.data);
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const settings = {
    infinite: true,
    className: "home-slider",
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
  };

  const sliderData = [
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
      description: "Build your brand",
      title: "Logo Design"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png",
      description: "Customize your site",
      title: "WordPress"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png",
      description: "Share your message",
      title: "Voice Over"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png",
      description: "Engage your audience",
      title: "Video Explainer"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png",
      description: "Reach more customers",
      title: "Social Media"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png",
      description: "Unlock growth online",
      title: "SEO"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png",
      description: "Customize your site",
      title: "Illustration"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png",
      description: "Go global",
      title: "Translation"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png",
      description: "Learn your business",
      title: "Data Entry"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png",
      description: "Showcase your story",
      title: "Book Covers"
    },
  ];
  const handleRenderSlider = () => {
    return productsData?.map((slide, index) => {
      return (
        <div key={index} className='position-relative slider-item'>
          <img src={`./assets/img/sale/`+`${slide.product_image}`}></img>
          <div className='slider-info position-absolute'>
            <p className='font-weight-bold mb-1'>{slide.product_name}</p>
            <h4>{slide.price}</h4>
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
