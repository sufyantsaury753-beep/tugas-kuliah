const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const v1 = document.getElementById('video1');
const v2 = document.getElementById('video2');
const v3 = document.getElementById('video3');
const startBtn = document.getElementById('startBtn');

function hideAllVideos(){
    v1.style.display = 'none';
    v2.style.display = 'none';
    v3.style.display = 'none';
    v1.pause();
    v2.pause();
    v3.pause();
}

function drawEffect(results){
  canvasCtx.save();
  canvasCtx.clearRect(0,0,canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  hideAllVideos();

  if(results.multiHandLandmarks && results.multiHandLandmarks.length > 0){
    const landmarks = results.multiHandLandmarks[0];

    // Telunjuk (8)
    if(landmarks[8].y < landmarks[6].y){
        v1.style.display = 'block';
        v1.play();
    }
    // Jari tengah (12)
    else if(landmarks[12].y < landmarks[10].y){
        v2.style.display = 'block';
        v2.play();
    }
    // Jari manis (16)
    else if(landmarks[16].y < landmarks[14].y){
        v3.style.display = 'block';
        v3.play();
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(drawEffect);

let camera;
startBtn.addEventListener('click', async () => {
    camera = new Camera(videoElement, {
      onFrame: async () => await hands.send({image: videoElement}),
      width: 640,
      height: 480
    });
    await camera.start();
    startBtn.style.display = 'none'; // sembunyikan tombol setelah klik
});
