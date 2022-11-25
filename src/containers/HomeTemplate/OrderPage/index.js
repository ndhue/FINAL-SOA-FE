import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
export default function OrderPage() {
  const jobsList = useSelector(state => state.searchingReducer.store);
  // if jobsList?.length>=1 => render => else => notification text
  console.log(jobsList);

  return (
    <div>
     
     
      <h3 className='text-center my-3 user-title'>Đơn hàng</h3>
      <div className="shopping_cart_area">
        <div className="container">
                <div className="cart_page_inner mb-60">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart_page_tabel">
                            <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">ID đơn hàng</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chi tiết</th>
          </tr>
        </thead>
       
      </table>
                            </div>
                           
                         </div>
                     </div>
                 </div>
                       
                    </div>
                </div>
  
    </div>
  )
}