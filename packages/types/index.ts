export interface TrackOptions {
  baseURL: string;
  baseParams?: any;
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
