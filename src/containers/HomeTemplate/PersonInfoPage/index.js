import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchProductsData } from './modules/actions';
import './style.css';
export default function PersonInfoPage() {
  
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
      <h5 className='text-center my-3 user-title'>USERS MANAGEMENT</h5>

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}
