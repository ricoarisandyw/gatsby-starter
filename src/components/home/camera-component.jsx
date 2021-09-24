import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import cameraFrame from '../../images/camera-face-only.png';
import cameraFrameWithIdentity from '../../images/camera-with-identity.png';
import './camera.scss';

const CAMERA_STATUS = {
  BLANK: 0,
  PHOTO: 1,
  VIDEO: 2,
};

export default function Camera(props) {
  const {
    mode, onClose, instructions, frame,
  } = props;

  const [photo, setPhoto] = React.useState('');
  const mediaRecorderRef = React.useRef(null);
  const webcamRef = React.createRef();
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [startRecord, setStartRecord] = React.useState(false);
  const [cameraStatus, setTaken] = React.useState(CAMERA_STATUS.BLANK);
  const [instructionIndex, setInstructionIndex] = React.useState(0);
  const [frameCamera, setCameraFrame] = React.useState(frame === 'faceWithIdentity' ? cameraFrameWithIdentity : cameraFrame);

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
    try {
      if (webcamRef.current && webcamRef.current.stream) {
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: 'video/webm;codecs=h264',
        });
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
        setStartRecord(true);
        // setTaken(CAMERA_STATUS.VIDEO);
        console.log('Start recording');
      } else {
        console.log('Webcam not ready');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const stopVideo = () => {
    if (mediaRecorderRef.current) {
      console.log(mediaRecorderRef.current);
      mediaRecorderRef.current.stop();
      setStartRecord(false);
    }
  };

  const done = () => {
    if (cameraStatus === CAMERA_STATUS.PHOTO) {
      props.onDone('image', photo);
    } else {
      props.onDone('video', recordedChunks);
    }
    setTaken(CAMERA_STATUS.BLANK);
    setCameraFrame(cameraFrame);
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
    if (props.instructions.length) {
      if (instructionIndex < props.instructions.length && startRecord) {
        setTimeout(() => {
          console.log('Change', instructionIndex);
          setInstructionIndex(instructionIndex + 1);
          // Change frame with identity
          if (instructionIndex === props.instructions.length - 2) {
            console.log('Change Frame');
            setCameraFrame(cameraFrameWithIdentity);
          }
        }, props.instructionsInterval);
      } else if (instructionIndex === props.instructions.length && startRecord) {
        stopVideo();
      }
    }
  }, [instructionIndex, startRecord]);

  const webcam_size = frame === 'card' ? { width: '100%', margin: 'auto', borderRadius: '15px' } : { height: '584px' };

  return (
    <div className="camera-container">
      <div className="camera-modal show">
        <div className="camera-instructions">{instructions[instructionIndex]}</div>
        <div className="camera-frame">{frame !== 'none' && frame !== 'card' && <img src={frameCamera} alt="camera-frame" />}</div>
        <div className="camera">
          {!cameraStatus ? (
            <Webcam
              style={webcam_size}
              mirrored
              audio={false}
              ref={webcamRef}
              videoConstraints={{
                facingMode: 'user',
              }}
            />
          ) : (
            <img className="camera-result" src={photo} alt="result" />
          )}
        </div>
        <div className="camera-controller">
          {(mode === 'image' || mode === 'both') && (
            <div className="mb-2">
              {!startRecord && (
                <Button shape="round" size="middle" type="button" className="sprout-button" onClick={screenShoot}>
                  TAKE PHOTO
                </Button>
              )}
            </div>
          )}
          {(mode === 'video' || mode === 'both') && (
            <div className="mb-2">
              {!startRecord && (
                <Button shape="round" size="middle" type="button" className="sprout-button" onClick={startVideo}>
                  RECORD
                </Button>
              )}
            </div>
          )}
          <Button shape="round" size="middle" type="button" className="sprout-button" onClick={onClose}>
            CLOSE
          </Button>
          <div style={{ color: 'white' }}>
            State :
            {startRecord ? 'Start Record' : 'Stand by'}
          </div>
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
