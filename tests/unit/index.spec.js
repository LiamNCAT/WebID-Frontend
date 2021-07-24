import Vue from 'vue'
import Index from '@/components/index.vue'

describe('index.vue', () => {
  it('Should render the welcome correctly', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#welcome h1').textContent)
      .toBe('Welcome to the WebID demo')
  })
})
