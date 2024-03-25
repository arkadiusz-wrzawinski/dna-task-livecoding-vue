import type { Directive } from 'vue'

type ClickedOutsideHTMLElement = HTMLElement & { clickOutsideEvent: (event: Event) => void }

export const clickOutside = <Directive<ClickedOutsideHTMLElement, () => void>>{
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (el === event.target || el.contains(event.target as Node)) return
      binding.value()
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
