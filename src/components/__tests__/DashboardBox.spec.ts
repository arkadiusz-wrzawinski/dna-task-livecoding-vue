import DashboardBox from '../DashboardBox.vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('DashboardBox', () => {
  it('renders properly', () => {
    const wrapper = mount(DashboardBox, {
      slots: {
        label: 'Title',
        value: '123'
      }
    })
    expect(wrapper.text()).toContain('123 Title')
  })

  it('renders properly when value is not provided', () => {
    const wrapper = mount(DashboardBox, {
      slots: {
        label: 'Title'
      }
    })
    expect(wrapper.text()).toContain('Title')
  })

  it('renders properly when label is not provided', () => {
    const wrapper = mount(DashboardBox, {
      slots: {
        value: '123'
      }
    })
    expect(wrapper.text()).toContain('123')
  })
})
