<template>
    <div>
      <b-navbar class="nav" type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="#">WebID Demo</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item id="login" to="/login" @click="login">Login</b-nav-item>
          <b-nav-item to="/reg"> Registration</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <h1 class="welcome">{{msg}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
import https from 'https'

export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to the WebID demo'
    }
  },
  methods: {
    async login () {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false
      })
      var response = await axios.post('/login', { httpsAgent })
      return response.data
    }
  }
}
</script>

 <style>
 </style>
