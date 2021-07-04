<template>
    <div>
      <b-navbar type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="#"><img class="logo" src="../assets/ncat.png">WebID Demo</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/reg"> Registration</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
        <fieldset>
          <label for="fname">First name:</label>
          <input id="fname" v-model="firstName"><br />
          <label for="lname">Last name:</label>
          <input id="lname" v-model="lastName"><br />
          <label for="email">Email:</label>
          <input id="email" v-model="email"><br />
          <label for="uri">URL:</label>
          <input id="uri" v-model="uri"><br />
        </fieldset>
        <button @click="registerPerson()">Register</button>
    </div>
</template>

<style scoped>
  .logo {
    float:left;
    width: 75px;
    height: 40px
  }
</style>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      uri: '',
      email: ''
    }
  },
  methods: {
    registerPerson () {
      axios.post('/register', { 'firstName': this.firstName, 'lastName': this.lastName, 'email': this.email, 'uri': this.uri })
        .then(function (response) {
          const blob = new Blob([response.data], { type: 'text/n3' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'label'
          link.click()
          URL.revokeObjectURL(link.href)
        })
    },
    createCert () {
      axios.post('/cert', this.uri)
        .then(function (response) {
          const blob = new Blob([response.data], { type: 'application/x-x509-ca-cert' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'label'
          link.click()
          URL.revokeObjectURL(link.href)
        })
    }
  }
}
</script>
