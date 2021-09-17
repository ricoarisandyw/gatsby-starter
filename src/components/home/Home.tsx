/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import splash from '../../images/splash.png'
import person from '../../images/kisspng-virtual-reality-headset-virtuality-samsung-gear-vr-virtual-reality-5ae3e50a228a43 1.png'
import './Home.scss'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function Home() {
    return (
        <div className="bg-home" style={{ marginTop: "calc(-7rem - 72px)" }}>
            <div className="relative py-28">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-24 mx-auto max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="mb-3">
                                <span className="text-lg">remove distance between</span><br/>
                                <h1 className="f-future header-label" data-aos="fade-right">Virtual World and Reality</h1>
                                <span className="text-lg">Digital world is safe, easy to modify, and must help us learn real world.</span><br/>
                                <span className="text-lg">You don't need to purchase tools again, we can download it.</span><br/>
                            </div>
                            <button className="btn-colorful">TRY NOW</button>
                        </main>
                    </div>
                </div>
                <div className="absolute bottom-0 right-10 pt-5 hidden md:flex z-10">
                    <img src={person} className="h-full" />
                </div>
            </div>
            <div className="absolute top-0 right-0 hidden md:flex">
                <img src={splash} className="h-96" />
            </div>
        </div>
    )
}
