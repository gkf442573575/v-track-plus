import { TrackOptions, TrackValue } from './types'

import type { DirectiveBinding } from 'vue'

import { bind, unbind } from './track'

// 事件以 | 分割 v-track:click|keyboard:13|keyboard:30="{url: '111', params: {a:1 }}" keyboard 的keycode 以:开始
// 如果不知道点击就是默认的点击事件

// vue 2 的埋点
export const vTrack = {
  install(app: any, options: TrackOptions) {
    app.directive('track', {
      bind(
        el: HTMLElement,
        binding: DirectiveBinding<TrackValue | TrackValue[]>
      ) {
        bind(el, binding, options)
      },
      unbind(
        el: HTMLElement,
        binding: DirectiveBinding<TrackValue | TrackValue[]>
      ) {
        unbind(el, binding)
      },
    })
  },
}

// vue 3 的埋点
export const vTrackPlus = {
  install(app: any, options: TrackOptions) {
    app.directive('track', {
      mounted(
        el: HTMLElement,
        binding: DirectiveBinding<TrackValue | TrackValue[]>
      ) {
        bind(el, binding, options)
      },
      beforeUnmount(
        el: HTMLElement,
        binding: DirectiveBinding<TrackValue | TrackValue[]>
      ) {
        unbind(el, binding)
      },
    })
  },
}

export default {
  vTrack,
  vTrackPlus,
}
