const NUM_KEYPOINTS = 468;
const NUM_IRIS_KEYPOINTS = 5;
const GREEN = '#32EEDB';
const RED = '#FF2C35';
const BLUE = '#157AB3';
const LEFT_KEYPOINTS = [362, 263]
const RIGHT_KEYPOINTS = [33, 133]
let stopPrediction = false;

var diagnostic = document.getElementById('speech-output');

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function determineDirection(leftCenter, rightCenter, keypoints) {
  // Determine direction of both eyes.
  const leftRatio = distance(leftCenter, keypoints[LEFT_KEYPOINTS[0]]) / distance(leftCenter, keypoints[LEFT_KEYPOINTS[1]]);
  const rightRatio = distance(rightCenter, keypoints[RIGHT_KEYPOINTS[0]]) / distance(rightCenter, keypoints[RIGHT_KEYPOINTS[1]]);
  if (leftRatio > 1.5 && rightRatio > 1.5) {
    console.log("left", leftRatio, rightRatio);
  } else if (leftRatio < 0.75 && rightRatio < 0.75) {
    console.log("right", leftRatio, rightRatio);
  }
}



let model, ctx, videoWidth, videoHeight, video, canvas,
    scatterGLHasInitialized = false, scatterGL, rafID;
const VIDEO_SIZE = 500;
const state = {
  maxFaces: 1,
  predictIrises: true
};

async function setupCamera() {
  video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      // Only setting the video to a specified size in order to accommodate a
      // point cloud, so on mobile devices accept the default size.
      width: VIDEO_SIZE,
      height: VIDEO_SIZE
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function renderPrediction() {
  if (stopPrediction) {
    return;
  }

  const predictions = await model.estimateFaces({
    input: video,
    returnTensors: false,
    flipHorizontal: false,
    predictIrises: state.predictIrises
  });
  ctx.drawImage(
      video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);

  if (predictions.length > 0) {
    predictions.forEach(prediction => {
      const keypoints = prediction.scaledMesh;

      // ctx.fillStyle = BLUE;

      // LEFT_KEYPOINTS.forEach(i => {
      //   const x = keypoints[i][0];
      //   const y = keypoints[i][1];

      //   ctx.beginPath();
      //   ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
      //   ctx.fill();
      // });

      // RIGHT_KEYPOINTS.forEach(i => {
      //   const x = keypoints[i][0];
      //   const y = keypoints[i][1];

      //   ctx.beginPath();
      //   ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
      //   ctx.fill();
      // });

      if (keypoints.length > NUM_KEYPOINTS) {
        ctx.fillStyle = RED;

        const leftCenter = keypoints[NUM_KEYPOINTS];

        // ctx.beginPath();
        // ctx.arc(leftCenter[0], leftCenter[1], 1 /* radius */, 0, 2 * Math.PI);
        // ctx.fill();

        if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
          const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];

          // ctx.beginPath();
          // ctx.arc(rightCenter[0], rightCenter[1], 1 /* radius */, 0, 2 * Math.PI);
          // ctx.fill();

          determineDirection(leftCenter, rightCenter, keypoints);
        }
      }
    });
  }

  rafID = requestAnimationFrame(renderPrediction);
};

async function main() {
  // await tf.setBackend(state.backend);
  
  await setupCamera();
  video.play();
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;

  canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const canvasContainer = document.querySelector('.canvas-wrapper');
  canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

  ctx = canvas.getContext('2d');
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      {maxFaces: state.maxFaces});
  renderPrediction();
};

main();