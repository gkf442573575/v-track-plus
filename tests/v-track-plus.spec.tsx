import { nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";

import { describe, expect, it } from "vitest";

import { vTrackDirective } from "../src/index";

const Component = {
  template: `<button id="track-test" :data-urltype="urlTrackType" v-track:click="{url: 'test', callback: trackCallBack }">Test</button>`,
  setup() {
    const urlTrackType = ref("");
    const trackCallBack = (url: string, trackType: string, params: any) => {
      urlTrackType.value = url + trackType;
    };
    return { trackCallBack, urlTrackType };
  },
};

describe("v-track-plus.directive", () => {
  it("single click", async () => {
    const wrap = mount(Component, {
      global: {
        directives: {
          Track: vTrackDirective,
        },
      },
    });
    const testBtn = wrap.get("#track-test");
    testBtn.trigger("click");
    await nextTick();
    expect(testBtn.attributes("data-urltype")).toBe("testclick");
  });
});
