import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchCartData } from './modules/actions';
import './style.css';
export default function CartPage() {
  
  const dispatch = useDispatch();

  const data = useSelector(state => state.cartManagementReducer.data);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    dispatch(actFetchCartData());
  }, []);

  useEffect(() => {
    setCartData(data);
  }, [data]);

  const handleRenderTable = () => {
    return cartData?.map((product) => {
      return (
        <tr className="border-top" key={product.product_id}>
            <td>
                <div className="cart_product_thumb">
                  {product.product_name}
                </div>
            </td>
            <td></td>
            <td></td>
            <td className="product_quantity"></td>
            <td>
                <div className="cart_product_price">
                    <span>{product.price}</span>
                </div>
            </td>
            <td>
                <div className="cart_product_remove text-right">
                    <a href="#"><i className="ion-android-close"></i></a>
                    </div>
            </td>

        </tr>
      )
    })
  }

  return (
    <div>
      <h3 className='text-center my-3 user-title'>Giỏ hàng</h3>
      <div className="shopping_cart_area">
        <div className="container">
                <div className="cart_page_inner mb-60">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart_page_tabel">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm </th>
                                            <th> </th>
                                            <th></th>
                                            <th></th>
                                            <th>Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {handleRenderTable}
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart_page_button border-top d-flex justify-content-between">
                                <div className="shopping_cart_btn">
                                    <a href="#" className="btn btn-primary border">XÓA GIỎ HÀNG</a>
                                    <button className="btn btn-primary border" type="submit">CẬP NHẬT GIỎ HÀNG</button>
                                </div>
                                <div className="shopping_continue_btn">
                                    <a href="shop.html" className="btn btn-primary">TIẾP TỤC MUA SẮM</a>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="grand_totall_area">
                               <div className="grand_totall_inner border-bottom">
                                   <div className="cart_subtotal d-flex justify-content-between">
                                       <p>Tổng </p>
                                       <span>$126.00</span>
                                   </div>
                                   <div className="cart_grandtotal d-flex justify-content-between">
                                       <p>Tổng cộng</p>
                                       <span>$126.00</span>
                                   </div>
                               </div>
                               <div className="proceed_checkout_btn">
                                   <a className="btn btn-primary" href="#">Thanh toán</a>
                               </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
               
        
        </div>
 

   
  )
}
