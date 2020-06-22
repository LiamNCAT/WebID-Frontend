<template>
    <div id="welcome">
      <h1>{{msg}}</h1>
      <a href="/login">Login</a>
      <a href="/reg">Registration</a>
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
