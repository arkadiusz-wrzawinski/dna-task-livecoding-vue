import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import CurrencyBox from '@/components/CurrencyBox.vue'

describe('CurrencyBox', () => {
  it('renders passed props', () => {
    const wrapper = mount(CurrencyBox, {
      props: {
        currencySign: '$',
        label: 'Label',
        value: 123
      }
    })
    expect(wrapper.text()).toContain('123$ Label')
  })

  it('renders prefixed currency sign', () => {
    const wrapper = mount(CurrencyBox, {
      props: {
        currencySign: '$',
        label: 'Label',
        value: 123,
        prefix: true,
      }
    })
    expect(wrapper.text()).toContain('$123 Label')
  })
})
