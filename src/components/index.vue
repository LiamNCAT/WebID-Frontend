<template>
    <div>
      <b-navbar class="nav" type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="#"><img class="logo" src="../assets/ncat.png">WebID Demo</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/reg"> Registration</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <h1 class="welcome">{{msg}}</h1>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to the WebID demo'
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
