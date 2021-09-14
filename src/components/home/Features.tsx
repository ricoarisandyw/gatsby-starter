/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import vr from '../../images/vr.png' ;
import './Features.scss'

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-sky z-20 relative py-12 overflow-x-hidden" style={{ marginTop: "-3rem", paddingTop: "6rem", paddingBottom: "9rem" }}>
      <div className="text-center text-white">
        <div className="mb-6">
        <span className="text-5xl f-future">INDUSTRI 4.0</span><br />
        <span>Join us to the future</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 px-6 lg:p-0">
          <div data-aos="fade-right" className="augmented text-left lg:text-right flex lg:flex-row sm:flex-row-reverse justify-end lg:justify-end mb-6">
            <div>
              <span className="text-xl f-future text-white">Augmented Reality</span><br/>
              <span>Bring you to digital world</span>
            </div>
            <div className="bg-black p-3 h-20 w-20 rounded-2xl mr-6 lg:mr-0 lg:ml-6 flex gradient-purple-red">
              <img src={vr} style={{objectFit:"contain"}} />
            </div>
          </div>
          <div data-aos="fade-top" className="text-left lg:text-center lg:mt-32 flex lg:flex-col mb-6">
            <div className="bg-black text-center h-20 w-20 rounded-2xl mr-6 lg:m-auto flex gradient-purple-blue">
              <img src={vr} style={{objectFit:"contain"}} className="h-6 m-auto" />
            </div>
            <div>
              <span className="text-xl f-future text-white mt-12">Mixed Reality</span><br/>
              <span>Bring you to digital world</span>
            </div>
          </div>
          <div data-aos="fade-left" className="text-left lg:text-left flex">
            <div className="text-center bg-black h-20 w-20 rounded-2xl mr-6 flex gradient-blue-purple">
              <img src={vr} style={{objectFit:"contain"}} className="h-6 m-auto" />
            </div>
            <div>
              <span className="text-xl f-future text-white">Virtual Reality</span><br/>
              <span>Bring you to digital world</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
