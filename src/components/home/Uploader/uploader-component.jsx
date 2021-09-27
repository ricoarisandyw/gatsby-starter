import React from 'react';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import Camera from '../camera-component';
import './uploader.scss';
import IconUpload from './icons/icon_upload.svg';
import IconCamera from './icons/icon_camera.svg';
import IconUploadDisabled from './icons/icon_upload_disable.svg';
import IconCameraDisabled from './icons/icon_camera_disable.svg';

function useDevice() {
  const MOBILE = ['iphone', 'android', 'mac'];

  const [device, setDevice] = React.useState('Loading...');
  const [isPhone, setIsPhone] = React.useState(false);

  React.useEffect(() => {
    setDevice(navigator.userAgent);
    for (const mob of MOBILE) {
      if (navigator.userAgent.toLowerCase().includes(mob)) {
        setIsPhone(true);
      }
    }
  }, []);

  return [device, isPhone];
}

function File(props) {
  const { onDelete, src, type } = props;

  return (
    <div className="uploader-file-container">
      {type === 'image' ? (
        <img alt="file_image" className="uploader-file" src={src} />
      ) : (
        <video muted className="uploader-file" controls>
          <source src={src} />
        </video>
      )}
      <div className="uploader-delete" onClick={onDelete} aria-hidden="true">
        <div className="uploader-icon">
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
}

export default function UploadFile(props) {
  const {
    mode, instructions, onUpload, limit, frame,
  } = props;

  const [device, isPhone] = useDevice();
  const [showWebcam, setShowWebcam] = React.useState(false);
  const uploadFileRef = React.createRef();

  const fileReachLimit = limit === props.files.length;

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
      onUpload({
        type: 'video',
        binary: urlFile,
      });
    } else {
      urlFile = binary;
      onUpload({
        type: 'image',
        binary: urlFile,
      });
    }
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
        onUpload({
          type: 'image',
          binary: URL.createObjectURL(event.target.files[0]),
        });
      } else {
        onUpload({
          type: 'video',
          binary: URL.createObjectURL(event.target.files[0]),
        });
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
        if (props.onDelete) {
          props.onDelete(index);
        }
      },
    });
  };

  const renderFile = props.files.map((file, i) => <File key={`uploaded_file_${i}`} type={file.type} src={file.binary} onDelete={() => onDelete(i)} />);

  return (
    <>
      <input accept="image/*,video/*" type="file" ref={uploadFileRef} onChange={handleFileUpload} style={{ display: 'none' }} />
      <div className="uploader-result">{renderFile}</div>
      <div className="uploader-container">
        <div className="uploader-icon-container" onClick={uploadFile} aria-hidden="true">
          <img alt="upload_icon" className="uploader-icon" src={fileReachLimit ? IconUploadDisabled : IconUpload} />
          <span className="uploader-label">Upload File</span>
        </div>
        {!isPhone && (
        <>
          <span className="uploader-label">or</span>
          <div aria-hidden="true" className="uploader-icon-container" onClick={openWebcam}>
            <img alt="upload-icon" className="uploader-icon" src={fileReachLimit ? IconCameraDisabled : IconCamera} />
            <span className="uploader-label">Use Camera</span>
          </div>
        </>
        )}
      </div>
      {`Your device is ${device}`}
      {showWebcam && <Camera frame={frame} key="camera" instructions={instructions} mode={mode} onClose={closeWebcam} onDone={done} />}
    </>
  );
}

// mode="video"
// instructions={INSTRUCTIONS}
// instructionsInterval={1000}
// limit={2}
// files={files}
// onUpload={onUpload}
// onDelete={onDelete}
// frame

UploadFile.propTypes = {
  mode: PropTypes.string,
  instructions: PropTypes.arrayOf(PropTypes.string),
  instructionsInterval: PropTypes.number,
  limit: PropTypes.number,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      binary: PropTypes.string,
    }),
  ),
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  frame: PropTypes.string,
};

UploadFile.defaultProps = {
  limit: 1,
  mode: 'both',
};
