import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
export default function InfoDigitalPay() {
  const jobsList = useSelector(state => state.searchingReducer.store);
  // if jobsList?.length>=1 => render => else => notification text
  console.log(jobsList);

  return (
    <div>
      <h3 className='text-center my-3 user-title'>Thông tin ví Digital Pay</h3>
      
    
   <div className="checkout_section" id="accordion">
    
  <div className="container">
    
    <div className="checkout_form">
      <div className="row">
        <div className="col-lg-7 col-md-6">
          <form action="#">
            <h3>Thông tin ví</h3>
            <div className="checkout_form_input">
              <label>Số tài khoản <span>*</span></label>
              <input type="text" />
            </div> 
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
                </table>
                
             
              </div>
              
            </form>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
<h5 className='text-center my-3 user-title'>Lịch sử giao dịch</h5>
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">ID đơn hàng</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Ngày thanh toán</th>
            <th scope="col">Giá đơn hàng</th>
          </tr>
        </thead>
       
      </table>

  
    </div>
  )
}
