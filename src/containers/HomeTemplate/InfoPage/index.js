import React from 'react';
import { useSelector } from 'react-redux';

export default function InfoPage() {
  const jobsList = useSelector(state => state.searchingReducer.store);
  // if jobsList?.length>=1 => render => else => notification text
  console.log(jobsList);

  return (
    <div>
      InfoPage
    </div>
  )
}
