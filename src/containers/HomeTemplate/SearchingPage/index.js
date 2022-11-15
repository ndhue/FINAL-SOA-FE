import ToggleButton from 'components/Button/ToggleButton';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { actSearchJobs } from '../HomePage/modules/actions';
import './style.css';

const MAX_TITLE_LENGTH = 50;

export default function SearchingPage(props) {
  const preKeyword = useSelector(state => state.searchingReducer.keyword);
  const keyword = localStorage.getItem("job-keyword") ? JSON.parse(localStorage.getItem("job-keyword")) : preKeyword;
  const searchingList = useSelector(state => state.searchingReducer.data);
  const [filtedList, setFiltedList] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (keyword) {
      dispatch(actSearchJobs(keyword));
    }
  }, []);

  const [servicesStatus, setServicesStatus] = useState([
    {
      type: "proServices",
      status: false
    },
    {
      type: "localSellers",
      status: false
    },
    {
      type: "onlineSellers",
      status: false
    }
  ]);

  useEffect(() => {
    setFiltedList(searchingList);
    servicesStatus.forEach((serviceType, index) => {
      switch (serviceType.type) {
        case "proServices": {
          if (serviceType.status) {
            const temp = searchingList?.filter(item => {
              return item.proServices == true;
            });
            setFiltedList(temp);
            console.log(1);
          }
        }
        case "localSellers": {
          if (serviceType.status) {
            const temp = searchingList?.filter(item => {
              return item.localSellers == true;
            });
            setFiltedList(temp);
            console.log(2);
          }
        }
        case "onlineSellers": {
          if (serviceType.status) {
            const temp = searchingList?.filter(item => {
              return item.onlineSellers == true;
            });
            setFiltedList(temp);
            console.log(3);
          }
        }
      }
    });
  }, [searchingList, servicesStatus]);

  const handleRecieveData = (type, status) => {
    const newServicesStatus = [...servicesStatus];
    servicesStatus.forEach((serviceType, index) => {
      if (serviceType.type == type) {
        newServicesStatus[index] = {
          type: type,
          status: status
        };
      };
    });
    setServicesStatus(newServicesStatus);
  };

  const handleRenderList = () => {
    if (filtedList && filtedList.length > 0) {
      return filtedList.map(job => {
        return (
          <Link key={job._id} className=' col-3 p-3' to={`/job-detail/${job._id}`}>
            <div className="card">
              <img className="w-100" style={{ height: 220, objectFit: "cover" }} src={job.image ? job.image : "https://images.squarespace-cdn.com/content/v1/562e3dade4b0c308fbc94d7b/1603322266670-Y6WK1MCXQ09I5GUT4TFN/coming+soon+yellow.jpg?format=1500w"} />
              <div className="card-body">
                <p className="card-title" style={{ height: 25 }}>
                  {job.subType?.name ? job.subType.name : ""}
                </p>
                <p className='card-text' style={{ height: 40, textTransform: "capitalize" }}>
                  {job.name ? job.name.substring(0, MAX_TITLE_LENGTH) : ""}{job.name?.length > MAX_TITLE_LENGTH ? "..." : ""}
                </p>
                <span><i className="fa fa-star" style={{ color: "#ffbe5b" }}></i> 5.0 ({job.rating ? job.rating : 0})</span>
              </div>
              <hr className='m-0' />
              <div className='card-body d-flex justify-content-between align-items-center py-2'>
                <i className="fa fa-heart" style={{ color: "#b5b6ba" }}></i>
                <p className='mb-0'>STARTING AT<span> US${job.price}</span></p>
              </div>
            </div>
          </Link>
        )
      });
    }
    return (
      <div className='m-auto py-4 text-center'>
        <img style={{ height: 200 }} src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/apps/empty-search-results.229c0d3.png'></img>
        <h5>No Results Found For Your Search</h5>
        <p>Try a new search or get a free quote for your project from our community of freelancers.</p>
        <a className='searching-return' onClick={() => { props.history.goBack() }} >Go back</a>
      </div>
    );
  }

  return (
    <div className='searching-page container'>
      <p>Suggested ...random some button onClick change localStorage + dispatch</p>
      <div className='row justify-content-between'>
        <p className='col-6'>{filtedList?.length > 0 ? filtedList.length : 0} Results for "{keyword}"</p>
        <div className='col-6 text-right'>
          <span className='ml-3'>
            <ToggleButton type="proServices" recieveData={handleRecieveData} />
            <span>Pro services</span>
          </span>
          <span className='ml-3'>
            <ToggleButton type="localSellers" recieveData={handleRecieveData} />
            <span>Local sellers</span>
          </span>
          <span className='ml-3'>
            <ToggleButton type="onlineSellers" recieveData={handleRecieveData} />
            <span>Online sellers</span>
          </span>
        </div>
      </div>
      <div className='row m-auto w-100'>
        {handleRenderList()}
      </div>
    </div>
  )
}
