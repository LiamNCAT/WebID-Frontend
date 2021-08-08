import Vue from 'vue'
import Index from '@/components/index.vue'
import { shallowMount } from '@vue/test-utils'

import axios from 'axios'
jest.mock('axios')

describe('index.vue', () => {
  it('Login event works correctly',()=>{
    const wrapper = shallowMount(Index)

    const resp = {data: true}
    axios.post.mockImplementation(() => Promise.resolve(resp))

    const spy = jest.spyOn(wrapper.vm, 'login')
    wrapper.find('#login').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('Should return true if WebID is valid', ()=>{
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    const resp = {data: true}

    axios.post.mockImplementation(() => Promise.resolve(resp))
    const login = vm.login()
    expect(login).toBeTruthy()
  })

})
