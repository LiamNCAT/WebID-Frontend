<template>
    <div>
        First name: <input v-model="firstName">
        Last name: <input v-model="lastName">
        Email: <input v-model="email">
        URL: <input v-model="uri">
        <button>Register</button>
    </div>
</template>

<style scoped>

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
