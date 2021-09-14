import React from 'react'
import linkedin from '../../../images/linkedin.png'
import instagram from '../../../images/instagram.png'

export default function Footer() {
    return (
        <footer className="p-12 pb-2" style={{ background: "#222" }}>
            <div className="container">
                <div className="grid grid-cols-3 lg:px-20">
                    <div className="flex justify-center">
                        <div className="text-white">
                            <span className="f-future">XUDIO</span><br />
                            <br />
                            <span>About Us</span><br />
                            <span>Blog</span><br />
                            <span>Career</span><br />
                            <span>Contact Us</span><br />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-white">
                            <span className="f-future">Products</span><br />
                            <br />
                            <span>Augmented Reality</span><br />
                            <span>Virtual Reality</span><br />
                            <span>Mixed Reality</span><br />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-white">
                            <span className="f-future">Legal</span><br />
                            <br />
                            <span>Term & Condition</span><br />
                            <span>Privacy Policy</span><br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-12">
                <a href="#">
                    <img className="h-12 mr-6" src={linkedin} />
                </a>
                <a href="#">
                    <img className="h-12 mr-6" src={instagram} />
                </a>
            </div>
            <div className="text-center text-white">
                <hr />
                <div className="p-3">
                    <span>copyright. XUDIO.io 2021 All Rights Reserved | Terms of Use | Privacy Policy | Jobs</span>
                </div>
            </div>
        </footer>
    )
}