import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
export default function PayPage() {
  const jobsList = useSelector(state => state.searchingReducer.store);
  // if jobsList?.length>=1 => render => else => notification text
  console.log(jobsList);

  return (
    <div>
      <h3 className='text-center my-3 user-title'>Thanh toán</h3>
      
    
   <div className="checkout_section" id="accordion">
    
  <div className="container">
    
    <div className="checkout_form">
      <div className="row">
        <div className="col-lg-7 col-md-6">
          <form action="#">
            <h3>Thông tin thanh toán</h3>
           
            <div className="checkout_form_input">
              <label>Họ và tên <span>*</span></label>
              <input type="text" />
            </div>    
            <div className="checkout_form_input">
              <label>Address  <span>*</span></label>
              <input type="text" />
            </div>
            <div className="checkout_form_input">
              <label> Email Address   <span>*</span></label>
              <input type="text" />
            </div>
            <div className="checkout_form_input">
              <label> Phone <span>*</span></label>
              <input type="text" />
            </div>
            

            
          </form>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="order_table_right">
            <form action="#">
              
              <div className="order_table table-responsive">
                <table>
                
                    <tr>
                      <th>Ví điện tử của bạn</th>
                      
                    </tr>
               
               
                  <tfoot>
                    
                    <tr className="order_total">
                      <th>Số dư</th>
                      <td className="text-right">$225.60</td>
                    </tr>
                  </tfoot>
                  <div className="">
                <a className="btn-primary btn-sm" href="#">Chi tiết</a>
              </div>
                </table>
                
             
              </div>
              
            </form>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="order_table_right">
            <form action="#">
              <h3>Đơn của bạn</h3>
              <div className="order_table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Đơn của bạn</th>
                      <th className="text-right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Slim Collarless Blaze </td>
                      <td className="text-right"> $75.20</td>
                    </tr>
                    <tr>
                      <td> Denim Kimono Jacket   </td>
                      <td className="text-right"> $50.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    
                    <tr className="order_total">
                      <th>Thành tiền</th>
                      <td className="text-right">$225.60</td>
                    </tr>
                  </tfoot>
                </table>
                
             
              </div>
              <div className="place_order_btn">
                <a className="btn btn-primary" href="#">Thanh toán</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
    </div>
  )
}
