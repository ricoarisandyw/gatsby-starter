/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import Webcam from 'react-webcam'
import toMp4 from './converter'

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = ({onClick, children}) => {
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    )
}

export default function Home() {
    const [photo, setPhoto] = React.useState("")
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const webcamRef = React.createRef<Webcam>()
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [startRecord, setStartRecord] = React.useState(false);

    function screenShoot() {
        if (webcamRef.current) {
            const image = webcamRef.current.getScreenshot()
            if (image) setPhoto(image)
            else alert("failed to get screenshoot")
        } else {
            alert("webcam undefined")
        }
    }

    function video() {
        if (webcamRef.current && webcamRef.current.stream) {
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm;codecs=h264"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
            setStartRecord(true)
        }
    }

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
    );

    const stopVideo = () => {
        mediaRecorderRef.current?.stop();
        setStartRecord(false);
    }

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/mp4"
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display:none")
          //   a.style = "display: none";
          a.href = url;
          a.download = "react-webcam-stream-capture.mp4";
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      }, [recordedChunks]);

    return (
        <div>
            <Webcam mirrored={true} audio={false} ref={webcamRef} videoConstraints={{
                facingMode: "user"
            }} />
            <Button onClick={screenShoot}>Take Photo</Button>
            {
                startRecord ? 
                <Button onClick={stopVideo}>Stop Video</Button>:
                <Button onClick={video}>Take Video</Button>
            }
            <Button onClick={handleDownload}>Download Video</Button>
            <img src={photo} />
        </div>
    )
}