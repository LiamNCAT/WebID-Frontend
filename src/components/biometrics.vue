<template>
    <div>
        <h1 class="welcome">{{msg}}</h1>
        <video id = "video" width="640" height="480" autoplay>
        </video><br />
        <canvas id="canvas"></canvas>
        <button id="snap" @click="captureBiometrics">Take Picture</button>
    </div>
</template>

<script>
import * as od from 'js-objectdetect'
const $rdf = require('rdflib')

export default {
  name: 'Biometrics',
  data () {
    return {
      msg: 'Biometric login'
    }
  },
  methods: {
    captureBiometrics () {
      
      this.vueVideo.pause()
      
      this.vueVideo.style.display = 'none'
      this.vueCanvas.style.display = 'block'
      
      var id = Math.random()      
      var ctx = canvas.getContext('2d')

      var faces = this.detectFaces(this.vueCanvas)
      // console.log(faces);
      if (faces.length >= 1) {
        var faceData = ctx.getImageData(faces[0][0], faces[0][1], faces[0][2], faces[0][3])
      }
      ctx.clearRect(0, 0, this.vueCanvas.width, this.vueCanvas.height)
      
      this.vueCanvas.width = 127
      this.vueCanvas.height = 127

      ctx.putImageData(faceData, 0, 0, this.vueCanvas.width, this.vueCanvas.height)

      faceData = ctx.getImageData()
      return processBiometrics(faceData, id)
    },
    processBiometrics(faceData, id){
    // eslint-disable-next-line
      var img = this.calculatePixelIntensity(faceData)

      const store = $rdf.graph()
      const fetcher = new $rdf.Fetcher(store)
      // eslint-disable-next-line
      var query = "PREFIX fe:  <http://esterline.ncat.edu/dfe/> \n"+
        "PREFIX biom: <http://esterline.ncat.edu/identity/biometric#> \n"+
        "SELECT ?posX ?posY ?height ?width ?xCoord ?yCoord\n"+
        "WHERE {\n"+
        "  ?f a feterms:DisposableFE . \n" +
        "  ?f feterms:appliedTo biom:FacialBiometric  . \n"+
        "  ?f feterms:consistOf ?pc . \n"+
        "  ?f feterms:height ?height . \n"+
        "  ?f feterms:width ?width  . \n"+
        "  ?f feterms:id  "+id+". \n"+
        "  ?pc a feterms:PatchCollection . \n"+
        "  ?pc feterms:hasPatch ?p . \n"+
        "  ?p feterms:xCoord ?xCoord . \n"+
        "  ?p feterms:yCoord ?yCoord ."
        "}"

      fetcher.nowOrWhenFetched('http://esterline.ncat.edu/dfe/', undefined, function(ok, body) {});

      var eq = $rdf.SPARQLToQuery(query,false,kb)
      var results = store.querySync(eq)



    },
    calculatePixelIntensity (imageDat) {
      var dataArray = imageDat.data
      var pixelIntensity = []
      var count = 0
      var temp = []
      for (var i = 0; i < dataArray.length; i += 4) {
        
        var red = dataArray[i]
        var green = dataArray[i + 1]
        var blue = dataArray[i + 2]
        var gray = (red + green + blue) / 3
        temp.push(gray)
        count++
        if(count = 126){
          temp = []
          pixelIntensity.push(temp)
          count = 0
        }
      }
      return pixelIntensity
    },
    detectFaces (canvas) {
      // What do these parameters mean?
      // I couldn't find any documentation, and used what was found here:
      // https://github.com/liuliu/ccv/blob/unstable/js/index.html
      var classifier = od.frontalface
      // eslint-disable-next-line
      var detector = new od.detector(canvas.width, canvas.height, 1.2, classifier)
      return detector.detect(canvas)
    },
  },
  mounted () {
    var video = document.getElementById('video')
    var videoObj = { video: true }
    this.vueCanvas = document.getElementById('canvas')
    navigator.mediaDevices.getUserMedia(videoObj).then((stream) => {
      video.srcObject = stream
    })
    this.vueVideo = video
    this.vueCanvas.style.display = 'none'
  }
}
</script>

 <style>
 </style>
