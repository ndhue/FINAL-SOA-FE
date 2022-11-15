import React from 'react';
import * as data from './data.json';
import './style.css'



export default function FooterHome() {
  return (
    <>
      <hr />
      <footer className='mt-3'>
          <div className="footer_widget_list">
            <div className="footer_contact">
              <div className="footer_contact_list">
                <span>Địa chỉ</span>
                <p>18 Nguyễn Hữu Thọ, Q7, HCM</p>
              </div>
              <div className="footer_contact_list">
                <span>24/7 hotline:</span>
                <a href="tel:(+84) 099123456">(+84) 099123456</a>
              </div>
            </div>
        </div>

        <hr />
        <div className='container d-flex justify-content-between align-items-center my-2'>
          <div className='d-flex align-items-center'>
            <img src="assets/img/logo/logo.png" alt />
          </div>
          <div className='d-flex align-items-center'>
            <div className='footer-icon'>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-facebook"></i>
              <i className="fa fa-linkedin"></i>
              <i className="fa fa-pinterest"></i>
              <i className="fa fa-instagram"></i>
            </div>
            <div className='d-flex align-items-center'>
              <button><i className="fa fa-globe"></i> English</button>
              <button>US$ USD</button>
              <span className='footer-icon m-0' style={{ fontSize: "1.5rem" }}><i className="fa fa-universal-access"></i></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
