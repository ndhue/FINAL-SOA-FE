import { actFetchJobTypes } from 'containers/HomeTemplate/_components/Navbar/modules/actions';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ServicesManagementPage() {
  const jobs = useSelector(state => state.jobTypesReducer.jobTypes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchJobTypes());
  }, []);

  const handleRenderSubTypes = subTypes => {
    if (subTypes.length > 0) {
      return subTypes.map(sub => {
        return <li key={sub._id}>{sub.name}</li>
      })
    }
  }

  const handleRenderTable = () => {
    return jobs?.map(job => {
      return (
        <tr key={job._id}>
          <th scope='row'>{job.name}</th>
          <td>
            <ul className="navbar-nav">
              {handleRenderSubTypes(job.subTypeJobs)}
            </ul>
          </td>
        </tr>
      )
    })
  }



  return (
    <div>
      <h5 className='text-center mb-3'>SERVICES MANAGEMENT</h5>
      <p>In progress...</p>

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">Job Types</th>
            <th scope="col">Sub-job Types</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}
