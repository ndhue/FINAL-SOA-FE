import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminModalProduct from '../_components/ModalProduct'
import { removeVietnameseTones } from '../_components/Modal/validation';
import { actDeleteProduct, actFetchProductsData } from './modules/actions';
import './style.css';
export default function ProductsManagementPage() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");
  const [productEdit, setProductEdit] = useState(null);

  const data = useSelector(state => state.productsManagementReducerByAdmin.data);
  const [productsData, setProductsData] = useState(null);

  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const handleDeleteProduct = id => {
    if (window.confirm("Delete?")) {
      dispatch(actDeleteProduct(id));
    }
  }

  const handleRenderTable = () => {
    return productsData?.map((product, index) => {
      return (
        <tr key={product.product_id}>
          <th scope="row">{index + 1}</th>
          <td>{product.product_name}</td>
          <td>{product.description}</td>
          <td>
            <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
              setMethod("EDIT");
              setProductEdit(product)
            }}>Edit</button>
            <button className='btn btn-del mx-1' onClick={() => { handleDeleteProduct(product.product_id) }
            }>×</button>
          </td>
        </tr>
      )
    })
  }

  const handleSearch = () => {
    let searchingData = [];
    const keyword = removeVietnameseTones(searchInput.current.value).toLowerCase();
    switch (searchType) {
      case "name": {
        searchingData = data.filter(user => {
          if (user.name) {
            return removeVietnameseTones(user.name.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setProductsData(searchingData);
      }
      case "email": {
        searchingData = data.filter(user => {
          if (user.email) {
            return removeVietnameseTones(user.email.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setProductsData(searchingData);
      }
      case "role": {
        searchingData = data.filter(user => {
          if (user.role) {
            return removeVietnameseTones(user.role.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setProductsData(searchingData);
      }
      default: {
        return setProductsData(data);
      }
    }
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>PRODUCTS MANAGEMENT</h5>
      <div className='d-flex justify-content-between mx-5'>
        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchType)
        }}>
          <div className="form-group">
            <select className="form-control" onChange={(e) => { setSearchType(e.target.value) }}>
              <option>All</option>
              <option value="name">By Name</option>
              <option value="role">By Role</option>
            </select>
          </div>
          <input className="form-control m-0 mx-2" type="search" placeholder="Find Product" aria-label="Search" ref={searchInput} />
          <button className="btn m-0 btn-search" type="submit">Search</button>
        </form>
        <button className="btn btn-add-user" data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("ADD");
          setProductEdit(null)
        }}> + Add Product</button>
      </div>
      <AdminModalProduct method={method} productEdit={productEdit} />

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}