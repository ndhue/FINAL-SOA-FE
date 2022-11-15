import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actDispatchComment, actFetchJobDetail, actOrderJob } from './modules/actions';

export default function JobDetailPage(props) {
  const jobData = useSelector(state => state.jobDetailReducer.jobData);
  const comments = useSelector(state => state.jobDetailReducer.comments);
  const jobId = props.match.params.jobId;
  const input = useRef(null);
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState({
    content: "",
    job: jobId
  });
  const [notification, setNotification] = useState(" ");

  useEffect(() => {
    dispatch(actFetchJobDetail(jobId));
  }, []);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (localStorage.getItem("UserInfo")) {
      if (newComment.content.length > 0) {
        dispatch(actDispatchComment(newComment));
        newComment.content = "";
        input.current.value = "";
        setNotification("Your comment has been sent.");
      } else {
        setNotification("Please enter comment's content.");
      }
    } else {
      setNotification("You must be logged in to post a comment.");
    }
  }

  const handleOnChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value.trim() });
  }

  const handleRenderForm = () => {
    return (
      <div>
        <form className="form-inline my-2 my-lg-0 justify-content-center" onSubmit={handleOnSubmit}>
          <textarea className="form-control mr-sm-2 w-50" placeholder="Comment ..." aria-label="Comment" onChange={handleOnChange} ref={input} />
          <button className="btn btn-success my-2 my-sm-0" type='submit'>Send</button>
        </form>
        <p className='text-danger'>{notification}</p>
      </div>
    )
  }


  const handleRenderComments = comments => {
    return comments.map(comment => {
      return (
        <div key={comment._id}>
          <hr />
          <p className='font-weight-bold'>{comment.user.name} <span className='font-weight-normal font-italic'>({comment.user.role})</span></p>
          <p>{comment.content}</p>
        </div>
      )
    });
  }

  const handleFetchListComments = () => {
    if (comments && comments.length > 0) {
      return (
        <div>
          <div className='pb-3'>
            <p>Leave your comment here:</p>
            {handleRenderForm()}
          </div>
          <p>({comments.length}) Comments:</p>
          {handleRenderComments(comments)}
        </div>
      )
    }
    return (
      <div>
        <p>There are no comments yet, leave your comment below:</p>
        {handleRenderForm()}
      </div>
    )
  }

  const handleOrderJob = e => {
    e.preventDefault();
    if (localStorage.getItem("UserInfo")) {
      if (window.confirm("Order this Job?")) {
        dispatch(actOrderJob(jobId));
        alert("Done!");
      }
    } else {
      alert("You must be logged in to order.");
    }
  }

  if (jobData) {
    return (
      <div>
        <div>Navbar cho Job Detail : Overview, Description, FAQ, Reviews, About the seller, Compare packages, Recommendations</div>
        <div className='row'>
          <div className='col-7'>
            <h5 style={{ textTransform: "capitalize" }}>{jobData.name}</h5>
            <img className='w-100' src={jobData.image ? jobData.image : "https://images.squarespace-cdn.com/content/v1/562e3dade4b0c308fbc94d7b/1603322266670-Y6WK1MCXQ09I5GUT4TFN/coming+soon+yellow.jpg?format=1500w"}></img>
            <h5>About This Gig</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

            <div className='text-warning'>Review Chart</div>
            {handleFetchListComments()}
          </div>
          <div className='col-5'>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            <button className='btn btn-success' onClick={handleOrderJob}>Continue (${jobData.price})</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <></>
  )
}
