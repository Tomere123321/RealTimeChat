import React from 'react';
import { FaPeopleGroup } from "react-icons/fa6";

const GroupBtn = () => {
  return (
    <div className="flex justify-center mt-4"> 
      <button className="btn btn-sm flex items-center">
        <FaPeopleGroup className='w-4 h-4 mr-1' /> 
        Create Group
      </button>
    </div>
  );
}

export default GroupBtn;
