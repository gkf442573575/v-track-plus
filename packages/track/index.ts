import { TrackOptions, TrackValue, TrackParam } from '../types'

import type { DirectiveBinding } from 'vue'

export class TrackBoardHandler {
  private boardEvtList: Map<string, TrackParam[]> = new Map()

  constructor() {
    window.addEventListener('keydown', (evt) => this.eventHandler(evt))
  }

  eventHandler(evt: KeyboardEvent) {
    const keycode = String(evt.keyCode)
    if (!this.boardEvtList.has(keycode)) {
      return
    }
    const boardEvents = this.boardEvtList.get(keycode) || []
    for (let i = 0; i < boardEvents.length; i++) {
      const item = boardEvents[i]
      item.callback(item.url, item.trackType, item.params)
    }
  }

  add(type: string, boardTrack: TrackParam) {
    const keboard = type.split(':')
    if (keboard && keboard[1]) {
      const keycode = keboard[1]
      const newVal = [boardTrack].concat(this.boardEvtList.get(keycode) || [])
      this.boardEvtList.set(keycode, newVal)
    }
  }

  clear() {
    this.boardEvtList.clear()
  }
}
// 初始化一个board事件
let vTrackBoard: TrackBoardHandler

// 合并参数
export function mergeOptios(
  value: TrackValue,
  options: TrackOptions,
  trackType: string
) {
  const callback = value.callback || options.baseCallBack
  if (!callback) {
    return null
  }
  let currentUrl = options.baseURL
  const url = value.url || ''
  // 如果已http或者http是开头的单独url 就以url为请求url
  const httpReg = /^http[s]?:\/\//
  if (url && !httpReg.test(url)) {
    currentUrl = currentUrl + url
  }
  const valParams = value.params || {}
  return {
    url: currentUrl,
    params: {
      ...options.baseParams,
      ...valParams,
    },
    trackType,
    callback,
    triggerEvent: value.triggerEvent || '',
    interval: value.interval || 30000,
  }
}

// 添加事件
const vTrackAddEvt = (
  el: HTMLElement,
  value: TrackValue,
  options: TrackOptions,
  type: string
) => {
  if (
    value.triggerEvent && value.triggerEvent === type ||
    !value.triggerEvent
  ) {
    const trackParam = mergeOptios(value, options, type)
    if (!trackParam) {
      return
    }
    if (/^keyboard:\d+$/.test(type)) {
      vTrackBoard.add(type, trackParam)
    } else {
      el.addEventListener(type, () => {
        trackParam.callback(
          trackParam.url,
          trackParam.trackType,
          trackParam.params
        )
      })
    }
  }
}

export function bind(
  el: HTMLElement,
  binding: DirectiveBinding<TrackValue | TrackValue[]>,
  options: TrackOptions
) {
  // create board event
  vTrackBoard = new TrackBoardHandler()
  const vTrackOptions = {
    baseParams: {},
    baseCallBack: () => ({}),
    ...options,
  }
  const { arg, value } = binding
  let types = arg ? arg.split('|') : ['click']
  // 进行去重，防止重复监听
  types = Array.from(new Set(types))
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    /**
     *  can use array to add event handler
     */
    if (value instanceof Array) {
      for (let j = 0; j < value.length; j++) {
        const item = value[j]
        vTrackAddEvt(el, item, vTrackOptions, type)
      }
    } else {
      vTrackAddEvt(el, value, vTrackOptions, type)
    }
  }
}

export function unbind(
  el: HTMLElement,
  binding: DirectiveBinding<TrackValue | TrackValue[]>
) {
  vTrackBoard.clear()
  const { arg } = binding
  let types = arg ? arg.split('|') : ['click']
  types = Array.from(new Set(types))
  for (let index = 0; index < types.length; index++) {
    const type = types[index]
    if (!/^keyboard:\d+$/.test(type)) {
      el.removeEventListener(type, () => null)
    }
  }
}
