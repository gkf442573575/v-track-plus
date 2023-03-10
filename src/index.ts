import type { ObjectDirective, DirectiveBinding } from "vue";

export interface TrackOptions {
  baseURL: string;
  baseCallBack?: (url: string, trackType: string, params: any) => void;
}

export interface TrackValue {
  url?: string;
  params?: any;
  triggerEvent?: string;
  interval?: number;
  callback?: (url: string, trackType: string, params: any) => void;
}

export interface TrackParam {
  url: string;
  params: any;
  trackType: string;
  triggerEvent: string;
  interval: number;
  callback: (url: string, trackType: string, params: any) => void;
}

export class TrackBoardHandler {
  private boardEvtList: Map<string, TrackParam[]> = new Map();

  constructor() {
    window.addEventListener("keydown", (evt: KeyboardEvent) =>
      this.eventHandler(evt)
    );
  }

  eventHandler(evt: KeyboardEvent) {
    const keycode = String(evt.keyCode);
    if (!this.boardEvtList.has(keycode)) {
      return;
    }
    const boardEvents = this.boardEvtList.get(keycode) || [];
    for (let i = 0; i < boardEvents.length; i++) {
      const item = boardEvents[i];
      item.callback(item.url, item.trackType, item.params);
    }
  }

  add(type: string, boardTrack: TrackParam) {
    const keboard = type.split(":");
    if (keboard && keboard[1]) {
      const keycode = keboard[1];
      const newVal = [boardTrack].concat(this.boardEvtList.get(keycode) || []);
      this.boardEvtList.set(keycode, newVal);
    }
  }

  clear() {
    this.boardEvtList.clear();
  }
}

export function mergeOptios(
  value: TrackValue,
  options: TrackOptions,
  trackType: string
): TrackParam | null {
  const callback = value.callback || options.baseCallBack;
  if (!callback) {
    return null;
  }
  let currentUrl = options.baseURL;
  const url = value.url || "";
  const httpReg = /^http[s]?:\/\//;
  if (url && !httpReg.test(url)) {
    currentUrl = currentUrl + url;
  }
  return {
    url: currentUrl,
    params: value.params || null,
    trackType,
    callback,
    triggerEvent: value.triggerEvent || "",
    interval: value.interval || 30000,
  };
}

// create board event
const vTrackBoard = new TrackBoardHandler();

// default track options
let vTrackOptions: TrackOptions = {
  baseURL: "",
};

export function vTrackAddEvt(
  el: HTMLElement,
  value: TrackValue,
  options: TrackOptions,
  type: string
) {
  if (
    (value.triggerEvent && value.triggerEvent === type) ||
    !value.triggerEvent
  ) {
    const trackParam = mergeOptios(value, options, type);
    if (!trackParam) {
      return;
    }
    if (/^keyboard:\d+$/.test(type)) {
      vTrackBoard.add(type, trackParam);
    } else {
      el.addEventListener(type, () =>
        trackParam.callback(
          trackParam.url,
          trackParam.trackType,
          trackParam.params
        )
      );
    }
  }
}

export const vTrackDirective: ObjectDirective<
  HTMLElement,
  TrackValue | TrackValue[]
> = {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<TrackValue | TrackValue[]>
  ) {
    const { arg, value } = binding;
    const types = arg?.split("|") || [];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      /**
       *  can use array to add event handler
       */
      if (value instanceof Array) {
        for (let j = 0; j < value.length; j++) {
          const item = value[j];
          vTrackAddEvt(el, item, vTrackOptions, type);
        }
      } else {
        vTrackAddEvt(el, value, vTrackOptions, type);
      }
    }
  },
  beforeUnmount(
    el: HTMLElement,
    binding: DirectiveBinding<TrackValue | TrackValue[]>
  ) {
    /**
     *  To clear event listener
     */
    vTrackBoard.clear();
    const { arg } = binding;
    const types = arg?.split("|") || [];
    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      if (!/^keyboard:\d+$/.test(type)) {
        el.removeEventListener(type, () => null);
      }
    }
  },
};

const vTrack = {
  install(app: any, options: TrackOptions) {
    // merge options
    vTrackOptions = {
      ...vTrackOptions,
      ...options,
    };
    app.directive("track", vTrackDirective);
  },
};

export default vTrack;
