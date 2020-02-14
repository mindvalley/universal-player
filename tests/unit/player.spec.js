import { shallowMount } from '@vue/test-utils'
import MindvalleyUniversalPlayer from '@/mindvalley-universal-player-component.vue'

describe('Mindvalley Universal Player', () => {
  it('example test', () => {
    const sources = [
      { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
      { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
      { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }
    ];
    const player = shallowMount(MindvalleyUniversalPlayer, {
      propsData: { sources }
    });

    expect(player);
  })
})
