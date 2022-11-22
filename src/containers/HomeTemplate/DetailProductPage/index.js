import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchProductDetail } from './modules/actions';
import './style.css'
export default function DetailProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const data = useSelector(state => state.productDetailReducer.productData);
  useEffect(() => {
    dispatch(actFetchProductDetail(productId));
  }, []);

  if(data){
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Chi tiết sản phẩm</h3>
    
      <section className="product_details mb-135">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <img  src={process.env.PUBLIC_URL+`../assets/img/sale/`+`${data.product_image}`} alt='product-image' className="primary_img" />
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="product_d_right">
                       <form action="#">
                            <h1>{data.product_name}</h1>
                            <div className="price_box">
                                <span className="current_price">{data.price}</span>
                            </div>
                            <div className="product_desc">
                                {data.description}
                            </div>
                            <div className="product_variant">
                            <div className=" d-flex">
                                <button className="btn-submit" type="submit"><i className="ion-android-add"></i> Thêm vào giỏ hàng</button>
                                </div>  
                            </div>
                            <div className="product_sku">
                                <p><span>SKU: </span> #ABC123456</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

<div className="product_d_info mb-118">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="product_d_inner">
          <div className="product_info_button border-bottom">
            <ul className="nav" role="tablist">
              <li>
                <a className="active" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Mô tả</a>
              </li>
             
             
            </ul>
           
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="info" role="tabpanel">
              <div className="product_info_content">
                <p>Coupling a blended linen construction with tailored style, the River Island HR Jasper Blazer will imprint a touch of dapper charm into your after-dark wardrobe. <br /> Our model wearing a size medium blazer, and usually takes a size medium/38L shirt. <br /> He is 6’2 1/2” (189cm) tall with a 38” (96 cm) chest and a 31” (78 cm) waist.</p>
               
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )}
  return (
    <></>
  )
}
