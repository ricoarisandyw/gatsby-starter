/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import Camera from './camera-component'
import 'antd/dist/antd.css'
import Uploader from './Uploader/uploader-component'

export default function Home() {
    const [isWebcam, setWebcam] = React.useState(true)

    const openWebcam = () => {
        setWebcam(!isWebcam)
    }

    return <div>
        <Uploader />
    </div>
}