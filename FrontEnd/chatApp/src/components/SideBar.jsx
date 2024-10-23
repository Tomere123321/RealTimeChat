import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogOutBtn from './LogOutBtn,'
import GroupBtn from './GroupsBtn'

const SideBar = () => {
  return (
    
    <div className='border-r border-slate-500 flex flex-col'>
      <GroupBtn/>
        <SearchInput/>
        <div className='divier px-3'></div>
        <Conversations/>
        <LogOutBtn/>
    </div>
  )
}

export default SideBar