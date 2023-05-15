# v-track-plus

### Vue Element Track

[![NpmVersion](https://img.shields.io/npm/v/v-track-plus.svg)](https://www.npmjs.com/package/v-track-plus)
![npm](https://img.shields.io/npm/dw/v-track-plus.svg)

## Install

```bash
$ npm install v-track-plus --save
```

## Use

<b>src/main.js</b>

#### Types

```ts
interface TrackOptions {
  baseURL: string;
  baseParams?: any;
  baseCallBack?: (url: string, trackType: string, params: any) => void;
}

interface TrackValue {
  url?: string;
  params?: any;
  triggerEvent?: string;
  interval?: number;
  callback?: (url: string, trackType: string, params: any) => void;
}

interface TrackParam {
  url: string;
  params: any;
  trackType: string;
  triggerEvent: string;
  interval: number;
  callback: (url: string, trackType: string, params: any) => void;
}
```

#### Vue2

```ts
import { vTrack } from '@dgov/web-plugin'

Vue.use(vTrack, options: TrackOptions)
```

#### Vue3

```ts
import { vTrackPlus } from '@dgov/web-plugin'

app.use(vTrackPlus, options: TrackOptions)
```

\*.vue

```html
<template>
  <!-- Default Click Event -->
  <button v-track>Click</button>
  <!-- TrackValue TrackValue[]-->
  <button v-track:click|keyboard:13="{ url: '111', params: params }">TrackValue</button>
  <button
    v-track:click|keyboard:13="[
      { url: '111', params: params },
      { url: '222', params: params, triggerEvent: 'click' }
    ]"
  >
    TrackValue[]
  </button>
</template>

<script>

export default {
  data() {
    return {
      params: {
        id: 1
      }
    }
  }
}
</script>

```
