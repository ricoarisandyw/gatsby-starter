/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import Camera from '../../../camera'
import 'antd/dist/antd.css'
import Uploader from './Uploader/uploader-component'

const INSTRUCTIONS = [
    'Watch straight',
    'Watch left',
    'Watch right',
    'Show your document'
]

// variable controll
// type: video/image, limit, files, onUpload, onDelete, useInstructions, instructions, instructionsInterval, 
// file format : name, type, data

export default function Home() {
    const [files, setFiles] = React.useState([])

    const onUpload = (file) => {
        setFiles([...files,file])
    }

    const onDelete = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    return <div>
        <Uploader 
            mode="both"
            useInstructions={false}
            instructions={INSTRUCTIONS} 
            instructionsInterval={1000}
            limit={2}
            files={files}
            onUpload={onUpload}
            onDelete={onDelete}
            frame=""
        />
    </div>
}