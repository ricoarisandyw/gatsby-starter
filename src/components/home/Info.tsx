/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import person1 from '../../images/sitting-4.png'
import person2 from '../../images/standing-11.png'
import { PuzzleIcon, PlusSmIcon, OfficeBuildingIcon, PhotographIcon, UserGroupIcon, CashIcon, ArchiveIcon, ChartBarIcon } from '@heroicons/react/outline'

export default function Info() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-12">
        <div className="hidden md:block">
          <img src={person1} />
        </div>
        <div className="text-center" data-aos="fade-left">
          <span className="text-lg text-primary">DO WE NEED XR?</span><br />
          <span className="text-5xl f-future">WHAT XR CAN DO?</span><br />
          <span>You can do anything as simple as move to another world</span>
          <div className="grid grid-cols-3 mt-6">
            <div className="p-6 text-center">
              <PuzzleIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Games</span>
            </div>
            <div className="p-6 text-center">
              <PlusSmIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Medical</span>
            </div>
            <div className="p-6 text-center">
              <OfficeBuildingIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Building</span>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-6 text-center">
              <PhotographIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Traveling</span>
            </div>
            <div className="p-6 text-center">
              <UserGroupIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Online Meeting</span>
            </div>
            <div className="p-6">
              <OfficeBuildingIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Building</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="text-center" data-aos="fade-right">
          <span className="text-lg text-primary">DIGITAL IS FAST AND FLEXIBLE</span><br />
          <span className="text-5xl f-future">GAIN MORE WITH XR?</span><br />
          <span>You can reduce your expense with XR</span>
          <div className="grid grid-cols-3 mt-6">
            <div className="p-6 text-center">
              <CashIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Saving Money</span>
            </div>
            <div className="p-6 text-center">
              <PlusSmIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Safety</span>
            </div>
            <div className="p-6 text-center">
              <OfficeBuildingIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>3D World</span>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-6 text-center">
              <ArchiveIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>No Warehouse Rent</span>
            </div>
            <div className="p-6 text-center">
              <UserGroupIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Less Space</span>
            </div>
            <div className="p-6">
              <ChartBarIcon className="h-24 mx-auto p-3 rounded-full gradient-purple-blue" stroke="white" />
              <span>Progess Tracked</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={person2} />
        </div>
      </div>
    </div>
  )
}
