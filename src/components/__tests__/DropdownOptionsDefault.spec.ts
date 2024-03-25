import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import DropdownOptionDefault from '../inputs/dropdown/DropdownOptionDefault.vue'

describe('DropdownOptionDefault', () => {
  it('renders properly', () => {
    const wrapper = mount(DropdownOptionDefault, {
      props: {
        value: 'value',
        label: 'label',
        selected: false,
        selectMany: false,
      }
    })
    expect(wrapper.text()).toContain('label')
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('renders properly when selected', () => {
    const wrapper = mount(DropdownOptionDefault, {
      props: {
        value: 'value',
        label: 'label',
        selected: true,
        selectMany: false,
      }
    })
    expect(wrapper.text()).toContain('label')
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('emits event when clicked', async () => {
    const wrapper = mount(DropdownOptionDefault, {
      props: {
        value: 'value',
        label: 'label',
        selected: false,
        selectMany: false,
      }
    })
    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('renders radio input when selectMany is false', () => {
    const wrapper = mount(DropdownOptionDefault, {
      props: {
        value: 'value',
        label: 'label',
        selected: false,
        selectMany: false,
      }
    })
    expect(wrapper.find('input').element.type).toBe('radio')
  })

  it('renders checkbox input when selectMany is true', () => {
    const wrapper = mount(DropdownOptionDefault, {
      props: {
        value: 'value',
        label: 'label',
        selected: false,
        selectMany: true,
      }
    })
    expect(wrapper.find('input').element.type).toBe('checkbox')
  })
})
