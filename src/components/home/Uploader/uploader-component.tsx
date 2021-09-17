import React from 'react'
import Camera from '../camera-component'
import './uploader.scss'
import IconUpload from './icons/icon_upload.svg'
import IconCamera from './icons/icon_camera.svg'
import IconUploadDisabled from './icons/icon_upload_disable.svg'
import IconCameraDisabled from './icons/icon_camera_disable.svg'
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd'

interface FileType {
    binary: string
    type: string
}

function File({ type, src, onDelete }) {
    return <div className="uploader-file-container" onClick={onDelete}>
        {type === "image" ?
            <img className="uploader-file" src={src} /> :
            <video className="uploader-file" controls>
                <source src={src} />
            </video>
        }
        <div className="uploader-delete">
            <div className="uploader-icon">
                <CloseOutlined />
            </div>
        </div>
    </div>
}

export default function Uploader() {
    const limit = 2
    const [showWebcam, setShowWebcam] = React.useState(false)
    const [files, setFiles] = React.useState<FileType[]>([])
    const uploadFileRef = React.createRef<HTMLInputElement>()

    const fileReachLimit = limit === files.length

    const openWebcam = () => {
        if (!fileReachLimit) {
            setShowWebcam(true)
        }
    }

    const closeWebcam = () => {
        setShowWebcam(false)
    }

    const done = (type: string, binary: string | BlobPart[]) => {
        let urlFile = ""
        if (type === "video") {
            const blob = new Blob(binary as BlobPart[], {
                type: 'video/mp4',
            });
            const url = URL.createObjectURL(blob);
            urlFile = url
            console.log("Video", url)
        } else {
            urlFile = binary as string
        }
        setFiles([...files, {
            type, binary: urlFile as string
        }])
    }

    const uploadFile = () => {
        if (!fileReachLimit) {
            uploadFileRef.current?.click()
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, {
                type: "image",
                binary: URL.createObjectURL(event.target.files[0])
            }])
        }
    }

    const onDelete = (index: number) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure want to delete this file?',
            okText: 'OK',
            cancelText: 'CANCEL',
            onOk: () => {
                setFiles(files.filter((a, i) => i !== index))
            }
        });
    }

    return (
        <>
            <input accept="image/*,video/*" type="file" ref={uploadFileRef} onChange={handleFileUpload} style={{ display: "none" }} />
            <div className="uploader-result">
                {files.map((file, i) =>
                    <File type={file.type} src={file.binary} onDelete={() => onDelete(i)} />
                )}
            </div>
            <div className="uploader-container">
                <div className="uploader-icon-container" onClick={uploadFile}>
                    <img className="uploader-icon" src={fileReachLimit ? IconUploadDisabled : IconUpload} />
                    <span className="uploader-label">Upload Image</span>
                </div>
                <span className="uploader-label">or</span>
                <div className="uploader-icon-container" onClick={openWebcam}>
                    <img className="uploader-icon" src={fileReachLimit ? IconCameraDisabled : IconCamera} />
                    <span className="uploader-label">Take a Picture</span>
                </div>
            </div>
            {showWebcam && <Camera onClose={closeWebcam} onDone={done} />}
        </>
    )
}