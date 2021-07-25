<template>
    <div>
         <h1 class="welcome">{{msg}}</h1>
        <video id = "video" width="640" height="480" autoplay>
        </video><br />
        <canvas id="canvas" width="640" height="480"></canvas>
        <button id="snap">Take Picture</button>
    </div>
</template>

<script>
import * as od from 'js-objectdetect'

export default {
  name: 'Biometrics',
  data () {
    return {
      msg: 'Biometric login'
    }
  },
  methods: {
    captureBiometrics () {
      this.vueCanvasContext.drawImage(this.vueVideo, 0, 0, 640, 480)
      this.vueVideo.pause()

      this.vueVideo.style.display = 'none'
      this.vueCanvas.style.display = 'block'

      var faces = this.detectFaces(this.vueCanvas)
      // console.log(faces);

      if (faces.length >= 1) {
        var faceData = this.vueCanvasContext.getImageData(faces[0][0], faces[0][1], faces[0][2], faces[0][3])
      }

      this.greyscale(faceData)
      this.vueCanvasContext.clearRect(0, 0, this.vueCanvas.width, this.vueCanvas.height)
      this.vueCanvasContext.putImageData(faceData, 0, 0)
      var img = this.imgToBitmap(faceData)
    },
    greyscale (imageDat) {
      var dataArray = imageDat.data
      for (var i = 0; i < dataArray.length; i += 4) {
        var red = dataArray[i]
        var green = dataArray[i + 1]
        var blue = dataArray[i + 2]
        var alpha = dataArray[i + 3]

        var gray = (red + green + blue) / 3

        dataArray[i] = gray
        dataArray[i + 1] = gray
        dataArray[i + 2] = gray
        dataArray[i + 3] = alpha // not changing the transparency
      }
    },
    imgToBitmap (imageDat) {
      var dataArray = imageDat.data
      var imgArr = []
      for (var i = 0; i < dataArray.length; i += 4) {
        var pixelIntensity = ((dataArray[i] << 1) + (dataArray[i + 1] << 2) + (dataArray[i + 2] << 4)) * dataArray[i + 3]
        imgArr.push(pixelIntensity)
      }
      return imgArr
    },
    detectFaces (canvas) {
      // What do these parameters mean?
      // I couldn't find any documentation, and used what was found here:
      // https://github.com/liuliu/ccv/blob/unstable/js/index.html
      var classifier = od.frontalface
      // eslint-disable-next-line
      var detector = new od.detector(canvas.width, canvas.height, 1.2, classifier)
      return detector.detect(canvas)
    }
  },
  mounted () {
    var c = document.getElementById('canvas')
    var ctx = c.getContext('2d')
    this.vueCanvas = c
    this.vueCanvasContext = ctx

    var video = document.getElementById('video')
    var videoObj = { video: true }
    var errBack = function (error) {
      console.log('Video capture error: ', error.code)
    }

    this.vueVideo = video
    this.vueCanvas.style.display = 'none'
    // Put video listeners into place
    if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia(videoObj, function (stream) {
        video.src = stream
        video.play()
      }, errBack)
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia(videoObj, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream)
        video.play()
      }, errBack)
    } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
      navigator.mozGetUserMedia(videoObj, function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      }, errBack)
    }
  }
}
</script>

 <style>
 </style>
