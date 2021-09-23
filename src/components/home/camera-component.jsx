import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';

import cameraFrame from '../../images/camera-face-only.png';
import cameraFrameWithIdentity from '../../images/camera-with-identity.png';
import './camera.scss';

const CAMERA_STATUS = {
  BLANK: 0,
  PHOTO: 1,
  VIDEO: 2,
};

export default function Camera(props) {
  const { mode, onClose, instructions } = props;

  const [photo, setPhoto] = React.useState('');
  const mediaRecorderRef = React.useRef(null);
  const webcamRef = React.createRef();
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [startRecord, setStartRecord] = React.useState(false);
  const [cameraStatus, setTaken] = React.useState(CAMERA_STATUS.BLANK);
  const [instructionIndex, setInstructionIndex] = React.useState(0);
  const [frame, setFrame] = React.useState(cameraFrame);

  const retake = () => {
    setTaken(CAMERA_STATUS.BLANK);
  };

  const screenShoot = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setPhoto(image);
        setTaken(CAMERA_STATUS.PHOTO);
      } else alert('failed to get screenshoot');
    } else {
      alert('webcam undefined');
    }
  };

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const startVideo = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm;codecs=h264',
      });
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
      setStartRecord(true);
      // setTaken(CAMERA_STATUS.VIDEO);
    }
  };

  const stopVideo = () => {
    if (mediaRecorderRef.current) {
      console.log(mediaRecorderRef.current);
      mediaRecorderRef.current.stop();
      setStartRecord(false);
    }
  };

  // const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: 'video/mp4',
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     a.setAttribute('style', 'display:none');
  //     a.href = url;
  //     a.download = 'react-webcam-stream-capture.mp4';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // }, [recordedChunks]);

  const done = () => {
    if (cameraStatus === CAMERA_STATUS.PHOTO) {
      props.onDone('image', photo);
    } else {
      props.onDone('video', recordedChunks);
    }
    setTaken(CAMERA_STATUS.BLANK);
    setFrame(cameraFrame);
    props.onClose();
  };

  React.useEffect(() => {
    if (recordedChunks.length) {
      done();
    }
  }, [recordedChunks.length]);

  React.useEffect(() => {
    if (photo.length) {
      done();
    }
  }, [photo]);

  React.useEffect(() => {
    if (instructionIndex < props.instructions.length && startRecord) {
      setTimeout(() => {
        console.log('Change', instructionIndex);
        setInstructionIndex(instructionIndex + 1);
        if (instructionIndex < props.instructions.length - 1 && props.instructions[instructionIndex + 1] === 'Show your document') {
          setFrame(cameraFrameWithIdentity);
        }
      }, props.instructionsInterval);
    } else if (instructionIndex === props.instructions.length && startRecord) {
      stopVideo();
    }
  }, [instructionIndex, startRecord]);

  return (
    <div className="camera-container">
      <div className="camera-instructions">{instructions[instructionIndex]}</div>
      <div className="camera-modal show">
        <div className="camera-frame">
          <img src={frame} alt="camera-frame" />
        </div>
        <div className="camera">
          {!cameraStatus
            ? (
              <Webcam
                style={{ transform: 'scaleX(2) scaleY(2)', height: '100%' }}
                mirrored
                audio={false}
                ref={webcamRef}
                videoConstraints={{
                  facingMode: 'user',
                }}
              />
            )
            : <img className="camera-result" src={photo} alt="result" />}
        </div>
        <div className="camera-controller">
          {
            mode === 'image'
            && (
            <div>
              {
                cameraStatus === CAMERA_STATUS.PHOTO
                  ? <button type="button" className="camera-button-fill" onClick={retake}>Retake Photo</button>
                  : <button type="button" className="camera-button-fill" onClick={screenShoot}>Take Photo</button>
              }
            </div>
            )
          }
          {
            mode === 'video'
            && (
            <div>
              {
                startRecord
                  ? <button type="button" className="camera-button-fill" onClick={stopVideo}>Stop Video</button>
                  : <button type="button" className="camera-button-fill" onClick={startVideo}>RECORD</button>
              }
            </div>
            )
          }
          <button type="button" className="camera-button-link" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  );
}

Camera.propTypes = {
  mode: PropTypes.string,
  onClose: PropTypes.func,
  onDone: PropTypes.func,
  instructionsInterval: PropTypes.number,
  instructions: PropTypes.arrayOf(PropTypes.string),
};

Camera.defaultProps = {
  instructions: [],
  instructionsInterval: 3000,
  onDone: () => {},
  onClose: () => {},
  mode: 'image',
};
