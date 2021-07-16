import Vue from 'vue'
import Register from '@/components/registration'
import axios from 'axios'

jest.mock('axios')

describe('registration.vue', () => {
  it('Register should give rdf', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor().$mount()
    axios.post.mockResolvedValue()
  })
})
