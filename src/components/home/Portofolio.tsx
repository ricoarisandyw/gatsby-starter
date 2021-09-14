import React from 'react'
import Slider, { Settings } from "react-slick";
import './Portofolio.scss';

const portofolio_list = [
    {
        title: "VR Sci-Fi Shooter",
        subtitle: "",
        url: "1cp-7yA0W0o",
    },
    {
        title: "VR First Medical Treatment Simulation",
        subtitle: "",
        url: "4_-mhyrJb8M",
    },
    {
        title: "VR House Tour",
        subtitle: "",
        url: "BFmmmHQtNis",
    },
    {
        title: "VR Dental Simulation",
        subtitle: "",
        url: "W3Xfx2rLKvg",
    },
    {
        title: "Multiuse VR Anatomy",
        subtitle: "",
        url: "CqbvV8RPOSY",
    },
    {
        title: "VR Mesh Comparison Simulation",
        subtitle: "",
        url: "NifaTQeWqOg"
    },
    {
        title: "VR Flood Risk Management",
        subtitle: "",
        url: "r8WQW-kDPfw"
    }
]

export default function Portofolio() {
    const settings: Settings = {
        dots: true,
        speed: 500,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
        rows: 1
    };

    const video_list = portofolio_list.map((vid) => {
        return (
            <div className="px-0 lg:px-12 flex">
                <a href={`https://youtube.com/watch?v=${vid.url}`} target="_blank">
                    <div className="video mx-auto">
                        <div className="video-outline shadow"></div>
                        <div className="video-frame">
                            <img src={`https://img.youtube.com/vi/${vid.url}/0.jpg`} alt={vid.url} />
                            <div className="p-3">
                                <span className="text-xl f-future overflow-ellipsis">{vid.title}</span>
                                <br />
                                <span className="text-base">{vid.subtitle}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    })

    return (
        <div className="my-12">
            <div className="text-center">
                <span className="text-5xl f-future">PORTOFOLIO</span><br />
                <span>Let's see our awesome work</span>
            </div>
            <div className="p-12">
                <Slider {...settings}>
                    {video_list}
                </Slider>
            </div>
        </div>
    )
}