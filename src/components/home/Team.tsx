import React from 'react'
import './Team.scss'
import photo from '../../images/photo.png'
import ilham from '../../images/avatar/ilham.png'
import aziz from '../../images/avatar/aziz.png'
import tafaquh from '../../images/avatar/tafaquh.png'
import rico from '../../images/avatar/rico.png'
import abid from '../../images/avatar/abid.png'

export default function Team(){
    return (
        <div className="p-6">
            <div className="p-6 bg-team rounded-xl text-center">
                <div>
                    <span className="text-3xl f-future text-white">OUR TEAMS</span><br/>
                    <span className="text-white">Our team have real profesionnal experience</span>
                </div>
                <div className="grid grid-col-1 lg:grid-cols-3">
                    <div className="text-center text-white p-6">
                        <div data-aos="flip-left" className="rounded-full h-36 w-36 mx-auto" style={{background:`url("${ilham}")`, backgroundSize:"cover"}} />
                        <span className="text-3xl f-future">CTO</span><br/>
                        <span className="">Ilham Achmad Al Hafidz</span><br/>
                        <span>Master Student at PENS<br/>XR Developer at Universitas Nahdlatul Ulama Surabaya</span><br/>
                    </div>
                    <div className="text-center text-white p-6">
                        <div data-aos="flip-left" className="rounded-full h-36 w-36 mx-auto" style={{background:`url("${aziz}")`, backgroundSize:"cover"}} />
                        <span className="text-3xl f-future">CEO</span><br/>
                        <span className="">Abdul Azis</span><br/>
                        <span>MBA Candidate at Nexford University<br/>US. Cloud Consultant at Cloud Comrade Pte. Ltd</span><br/>
                    </div>
                    <div className="text-center text-white p-6">
                        <div data-aos="flip-left" className="rounded-full h-36 w-36 mx-auto" style={{background:`url("${tafaquh}")`, backgroundSize:"cover"}} />
                        <span className="text-3xl f-future">CPMO</span><br/>
                        <span className="">M Tafaquh Fiddin Al Islami</span><br/>
                        <span>Master Student at PENS<br/>Software Engineer at Ruangguru</span><br/>
                    </div>
                </div>
                <div className="grid grid-col-1 lg:grid-cols-6">
                    <div className="hidden lg:inline lg:col"></div>
                    <div className="text-center text-white p-6 col-span-2">
                        <img data-aos="flip-left" className="rounded-full h-36 mx-auto" src={rico} />
                        <span className="text-3xl f-future">Co-COO</span><br/>
                        <span className="">Rico Arisandy</span><br/>
                        <span>Fullstack Developer at Sprout Asia</span><br/>
                    </div>
                    <div className="text-center text-white p-6 col-span-2">
                        <img data-aos="flip-left" className="rounded-full h-36 mx-auto" src={abid} />
                        <span className="text-3xl f-future">COO</span><br/>
                        <span className="">Wahyu Abid A.</span><br/>
                        <span>Mobile Developer at Payfazz Teknologi Nusantara</span><br/>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}