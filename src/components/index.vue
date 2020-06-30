<template>
    <div id="welcome">
      <h1>{{msg}}</h1>
      <router-link to="/login">Login</router-link>
      <router-link to="/reg"> Registration</router-link>
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

 <style>

 </style>
