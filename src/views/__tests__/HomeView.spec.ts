import { describe, it, expect} from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'

import HomeView from '@/views/HomeView.vue'
import { defineComponent } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import DashboardBox from '../../components/DashboardBox.vue'

describe('HomeView', () => {
  it('renders properly', async () => {
    const wrapper = mount(defineComponent({
      template: '<Suspense><HomeView /></Suspense>',
      components: { HomeView }
    }), {
      global: {
        plugins:  [
          VueQueryPlugin
        ]
      }
    })
    await flushPromises()
    expect(wrapper.findAllComponents(DashboardBox).length).toBe(3)
  })
})
