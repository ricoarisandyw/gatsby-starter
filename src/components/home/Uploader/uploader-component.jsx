import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import Camera from '../camera-component';
import './uploader.scss';
import IconUpload from './icons/icon_upload.svg';
import IconCamera from './icons/icon_camera.svg';
import IconUploadDisabled from './icons/icon_upload_disable.svg';
import IconCameraDisabled from './icons/icon_camera_disable.svg';

// mode="video"
// useInstructions={false}
// instructions={INSTRUCTIONS}
// instructionsInterval={1000}
// limit={2}
// files={files}
// onUpload={onUpload}
// onDelete={onDelete}

function File(props) {
  const {
    onDelete, src, type, useInstructions, instructions, instructionsInterval, files, onUpload,
  } = props;

  return (
    <div className="uploader-file-container" onClick={onDelete} aria-hidden="true">
      {type === 'image'
        ? <img alt="file_image" className="uploader-file" src={src} />
        : (
          <video muted className="uploader-file" controls>
            <source src={src} />
          </video>
        )}
      <div className="uploader-delete">
        <div className="uploader-icon">
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
}

export default function Uploader(props) {
  const { mode, instructions } = props;

  const limit = 2;
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const uploadFileRef = React.createRef();

  const fileReachLimit = limit === files.length;

  const openWebcam = () => {
    if (!fileReachLimit) {
      setShowWebcam(true);
    }
  };

  const closeWebcam = () => {
    setShowWebcam(false);
  };

  const done = (type, binary) => {
    let urlFile = '';
    if (type === 'video') {
      const blob = new Blob(binary, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      urlFile = url;
      console.log('Video', url);
    } else {
      urlFile = binary;
    }
    setFiles([...files, {
      type, binary: urlFile,
    }]);
  };

  const uploadFile = () => {
    if (!fileReachLimit) {
      uploadFileRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const format = file.name.match(/\.[0-9a-z]+$/i);
      if (format && format[0] && ['.jpg', '.jpeg', '.png'].includes(format[0].toLowerCase())) {
        setFiles([...files, {
          type: 'image',
          binary: URL.createObjectURL(event.target.files[0]),
        }]);
      } else {
        setFiles([...files, {
          type: 'video',
          binary: URL.createObjectURL(event.target.files[0]),
        }]);
      }
    }
  };

  const onDelete = (index) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure want to delete this file?',
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk: () => {
        setFiles(files.filter((a, i) => i !== index));
      },
    });
  };

  const renderFile = files.map((file, i) => <File key="file" type={file.type} src={file.binary} onDelete={() => onDelete(i)} />);

  return (
    <>
      <input accept="image/*,video/*" type="file" ref={uploadFileRef} onChange={handleFileUpload} style={{ display: 'none' }} />
      <div className="uploader-result">
        {renderFile}
      </div>
      <div className="uploader-container">
        <div className="uploader-icon-container" onClick={uploadFile} aria-hidden="true">
          <img alt="upload_icon" className="uploader-icon" src={fileReachLimit ? IconUploadDisabled : IconUpload} />
          <span className="uploader-label">Upload Image</span>
        </div>
        <span className="uploader-label">or</span>
        <div aria-hidden="true" className="uploader-icon-container" onClick={openWebcam}>
          <img alt="upload-icon" className="uploader-icon" src={fileReachLimit ? IconCameraDisabled : IconCamera} />
          <span className="uploader-label">Take a Picture</span>
        </div>
      </div>
      {showWebcam && <Camera key="camera" instructions={instructions} mode={mode} onClose={closeWebcam} onDone={done} />}
    </>
  );
}
