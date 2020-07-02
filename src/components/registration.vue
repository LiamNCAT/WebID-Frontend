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
        <button>Register</button>
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
  computed: {
  }
}
</script>
