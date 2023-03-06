## v-track-plush

#### Element Track For Vue3

### Install

```bash
$ npm install v-track-plus --save-dev
```

### Use

src/main.js

```ts
interface TrackOptions {
  baseURL: string;
  baseCallBack?: (url: string, trackType: string, params: any) => void;
}
```

```js
import { createApp } from "vue";
import vTrack from "v-track-plus";

const app = createApp(App);

app.use(vTrack, {
  // your baseurl to server
  baseURL: "",
  // base call back
  baseCallBack: (url, trackType, params) => {
    // url：request url trackType： event type params: params
  },
  // TrackOptions
});
```

\*.vue

```ts
interface TrackValue {
  // new url， base:  baseURL + url if use http head is url
  url?: string;
  // params
  params?: any;
  // Only the specified events can be triggered， no value any events can be triggered
  triggerEvent?: string;
  // interval time （ms） throttle
  interval?: number;
  // can reset base callback
  callback?: (url: string, trackType: string, params: any) => void;
}
```

```html
<div v-track:click|keyboard.13="TrackValue| TrackValue[]"></div>
```
