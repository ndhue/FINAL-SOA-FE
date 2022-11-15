import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminModal from '../_components/Modal'
import { removeVietnameseTones } from '../_components/Modal/validation';
import { actDeleteUser, actFetchUsersData } from './modules/actions';
import './style.css';
export default function UsersManagementPage() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");
  const [userEdit, setUserEdit] = useState(null);

  const data = useSelector(state => state.usersManagementReducer.data);
  const [usersData, setUsersData] = useState(null);

  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    dispatch(actFetchUsersData());
  }, []);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  const handleDeleteUser = id => {
    if (window.confirm("Delete?")) {
      dispatch(actDeleteUser(id));
    }
  }

  const handleRenderTable = () => {
    return usersData?.map((user, index) => {
      return (
        <tr key={user.user_id}>
          <th scope="row">{index + 1}</th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
              setMethod("EDIT");
              setUserEdit(user)
            }}>Edit</button>
            <button className='btn btn-del mx-1' onClick={() => { handleDeleteUser(user.id) }
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
        return setUsersData(searchingData);
      }
      case "email": {
        searchingData = data.filter(user => {
          if (user.email) {
            return removeVietnameseTones(user.email.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setUsersData(searchingData);
      }
      case "role": {
        searchingData = data.filter(user => {
          if (user.role) {
            return removeVietnameseTones(user.role.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setUsersData(searchingData);
      }
      default: {
        return setUsersData(data);
      }
    }
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>USERS MANAGEMENT</h5>
      <div className='d-flex justify-content-between mx-5'>
        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchType)
        }}>
          <div className="form-group">
            <select className="form-control" onChange={(e) => { setSearchType(e.target.value) }}>
              <option>All</option>
              <option value="name">By Name</option>
              <option value="email">By Email</option>
              <option value="role">By Role</option>
            </select>
          </div>
          <input className="form-control m-0 mx-2" type="search" placeholder="Find User" aria-label="Search" ref={searchInput} />
          <button className="btn m-0 btn-search" type="submit">Search</button>
        </form>
        <button className="btn btn-add-user" data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("ADD");
          setUserEdit(null)
        }}> + Add User</button>
      </div>
      <AdminModal method={method} userEdit={userEdit} />

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
