<template>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">WebID Demo</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/reg"> Registration</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <img class="logo" src="../assets/ncat.png">
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
      width: 200px;
      height: 89px
    }

    .welcome {
      float:left
    }
 </style>
