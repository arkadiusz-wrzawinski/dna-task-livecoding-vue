import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import NumberBox from '@/components/NumberBox.vue'

describe('NumberBox', () => {
  it('renders passed props', () => {
    const wrapper = mount(NumberBox, {
      props: {
        label: 'Label',
        value: 123
      }
    })
    expect(wrapper.text()).toContain('123 Label')
  })
})
