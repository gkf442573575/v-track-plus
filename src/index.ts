import type { App, ObjectDirective, DirectiveBinding } from "vue";

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
  private boardEvtList: { [key: string]: TrackParam[] } = {};

  constructor() {
    window.addEventListener("keydown", this.eventHandler);
  }

  eventHandler(evt: KeyboardEvent) {
    const keycode = evt.keyCode;
    if (!(String(keycode) in this.boardEvtList)) {
      return;
    }
    for (let i = 0; i < this.boardEvtList[keycode].length; i++) {
      const item = this.boardEvtList[keycode][i];
      item.callback(item.url, item.trackType, item.params);
    }
  }

  add(type: string, boardTrack: TrackParam) {
    const keboard = type.split(":");
    if (keboard && keboard[1]) {
      const keycode = keboard[1];
      this.boardEvtList[keycode]
        ? this.boardEvtList[keycode].push(boardTrack)
        : (this.boardEvtList[keycode] = [boardTrack]);
    }
  }

  clear() {
    this.boardEvtList = {};
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

const vTrack = {
  install(app: App, options: TrackOptions) {
    const vTrackBoard = new TrackBoardHandler();

    const addEvt = (el: HTMLElement, value: TrackValue, type: string) => {
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
    };

    const track: ObjectDirective = {
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
              addEvt(el, item, type);
            }
          } else {
            addEvt(el, value, type);
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

    app.directive("track", track);
  },
};

export default vTrack;
