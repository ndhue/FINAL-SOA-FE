import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchProductsData } from './modules/actions';
import './style.css';
export default function CartPage() {
  
  const dispatch = useDispatch();

  const data = useSelector(state => state.productsManagementReducer.data);
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const handleRenderTable = () => {
    return productsData?.map((user, index) => {
      return (
        <tr key={user.product_id}>
          <th scope="row">{index + 1}</th>
          <td>{user.product_name}</td>
          <td>{user.description}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>Giỏ hàng</h5>

    </div>
  )
}
