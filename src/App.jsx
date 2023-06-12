import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const App = () => {
  const [fullscreen,setFullScreen] =useState(false)

  const {
    status: status1,
    startRecording: startRecording1,
    stopRecording: stopRecording1,
    mediaBlobUrl: mediaBlobUrl1
  } = useReactMediaRecorder({ video: true });

  const {
    status: status2,
    startRecording: startRecording2,
    stopRecording: stopRecording2,
    mediaBlobUrl: mediaBlobUrl2
  } = useReactMediaRecorder({ screen: true });

  const startRecording = () =>{
    startRecording1();
    startRecording2()
  };

  const stopRecording = () =>{
    stopRecording1();
    stopRecording2()
  }

  const videoRef = useRef(null);
  const controlVideoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      controlVideoRef.current.play();
    } else {
      videoRef.current.pause();
      controlVideoRef.current.pause();
    }
  };
  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    videoRef.current.volume = volume;
    controlVideoRef.current.volume = volume;
  };

  const handleToggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      if (requestFullScreen) {
        requestFullScreen.call(docEl);
        setFullScreen(true)
      }
    } else {
      if (exitFullScreen) {
        exitFullScreen.call(doc);
        setFullScreen(false)
      }
    }
  };

  return (
    <div>
      <div>
        <video style={{position:'absolute',width:'300px'}} src={mediaBlobUrl1} ref={videoRef} />
      </div>
      <div>
        <video style={{border:'solid red',height:`${fullscreen ? '90vh' : '80vh'}`,maxWidth:'100vw'}}  src={mediaBlobUrl2}  ref={controlVideoRef} />
        <button onClick={handlePlayPause}>Play/Pause</button>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={handleToggleFullScreen}>Toggle Fullscreen</button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default App;
