<template>
    <div>
      <b-navbar class="nav" type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="#"><img class="logo" src="../assets/ncat.png">WebID Demo</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login" @click="login">Login</b-nav-item>
          <b-nav-item to="/reg"> Registration</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <h1 class="welcome">{{msg}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
import https from 'https'
import fs from 'fs'
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to the WebID demo'
    }
  },
  methods: {
    login (e) {
      const httpsAgent = new https.Agent({
        cert: fs.readFileSync('./usercert.pem'),
        key: fs.readFileSync('./key.pem')
      })
      axios.post('/login', {httpsAgent})
        .then(function (response) {

        })
    }
  }
}
</script>

 <style scoped>
    .logo {
      float:left;
      width: 75px;
      height: 40px
    }
 </style>
