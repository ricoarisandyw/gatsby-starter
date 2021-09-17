/* eslint-disable:* */
import React from 'react';
import Webcam from 'react-webcam';
import cameraFrame from '../../images/camera-face-only.png'
import cameraFrameWithIdentity from '../../images/camera-with-identity.png'
import './camera.scss'

enum CAMERA_STATUS {
  BLANK,
  PHOTO,
  VIDEO
}

export default function Camera({ onClose, onDone }) {
  const [photo, setPhoto] = React.useState('');
  const mediaRecorderRef = React.useRef<MediaRecorder|null>(null);
  const webcamRef = React.createRef<Webcam>();
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [startRecord, setStartRecord] = React.useState(false);
  const [taken, setTaken] = React.useState(CAMERA_STATUS.BLANK);

  const retake = () => {
    setTaken(CAMERA_STATUS.BLANK)
  }

  const screenShoot = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setPhoto(image);
        setTaken(CAMERA_STATUS.PHOTO)
      }
      else alert('failed to get screenshoot');
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

  const video = () => {
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
    }
  };

  const stopVideo = () => {
    mediaRecorderRef.current?.stop();
    setStartRecord(false);
  };

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display:none');
      a.href = url;
      a.download = 'react-webcam-stream-capture.mp4';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const done = () => {
    if(taken === CAMERA_STATUS.PHOTO){
      onDone("image",photo)
    } else {
      onDone("video",recordedChunks)
    }
    onClose()
  }

  return (
    <div className="camera-container">
      <div className={"camera-modal show"}>
        <div className={"camera-frame"}>
          <img src={cameraFrame} alt="camera-frame" />
        </div>
        <div className="camera">
          {!taken ?
            <Webcam
              style={{ transform: "scaleX(2) scaleY(2)", height: "100%" }}
              mirrored
              audio={false}
              ref={webcamRef}
              videoConstraints={{
                facingMode: 'user',
              }}
            /> : 
            <img className="camera-result" src={photo} alt="result" />
          }
        </div>
        <div className="camera-controller">
          <div>
            {
              taken === CAMERA_STATUS.PHOTO ?
             <button className="camera-button-fill" onClick={retake}>Retake Photo</button> :
             <button className="camera-button-fill" onClick={screenShoot}>Take Photo</button> 
            }
          </div>
          <div>
            {
              startRecord
                ? <button className="camera-button-fill" onClick={stopVideo}>Stop Video</button>
                : <button className="camera-button-fill" onClick={video}>RECORD</button>
            }
          </div>
          <div><button className="camera-button-fill" onClick={handleDownload}>Download Video</button></div>
          <div><button className="camera-button-fill" onClick={done}>DONE</button></div>
          <button className="camera-button-link" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  );
}
