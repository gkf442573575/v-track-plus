<template>
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

<script setup lang="ts">
import { reactive } from 'vue'
const params = reactive({
  id: 1
})

</script>

