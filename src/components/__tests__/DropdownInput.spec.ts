import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DropdownInput from '../inputs/dropdown/DropdownInput.vue'

describe('DropdownInput', () => {
  it('renders properly', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
        selectedKeys: ['value1'],
        selectMany: false,
      },
      global: {
        directives: {
          'click-outside': {
            mounted: () => {},
          }
        }
      }
    })
    expect(wrapper.find('button').element.textContent).toBe('Options1▼')
    expect(wrapper.text()).not.toContain('label1')
    expect(wrapper.text()).not.toContain('label2')
  })

  it('renders properly after clicking button', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
        selectedKeys: ['value1'],
        selectMany: false,
      },
      global: {
        directives: {
          'click-outside': {
            mounted: () => {},
          }
        }
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').element.textContent).toBe('Options1▲')
    expect(wrapper.text()).toContain('label1')
    expect(wrapper.text()).toContain('label2')
  })

  it('emits event when option is clicked', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
        selectedKeys: ['value1'],
        selectMany: false,
      },
      global: {
        directives: {
          'click-outside': {
            mounted: () => {},
          }
        }
      }
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it ('renders custom components in slot', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
        selectedKeys: ['value1'],
        selectMany: false,
      },
      slots: {
        option: '<div>Custom</div>'
      },
      global: {
        directives: {
          'click-outside': {
            mounted: () => {},
          }
        }
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Custom')
  })

  it ('provides custom slotted components with params', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
        selectedKeys: ['value1'],
        selectMany: false,
      },
      slots: {
        option: '<div>{{ params.value }} {{ params.label }} {{params.selected ? "true" : "false"}}</div>'
      },
      global: {
        directives: {
          'click-outside': {
            mounted: () => {},
          }
        }
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('value1')
    expect(wrapper.text()).toContain('label1')
    expect(wrapper.text()).toContain('true')

    expect(wrapper.text()).toContain('value2')
    expect(wrapper.text()).toContain('label2')
    expect(wrapper.text()).toContain('false')
  })
})
