import { shallowMount } from '@vue/test-utils'
import AssetFormatter from '@/asset-formatter-test-component.vue'

describe('asset-formatter-test-component.vue', () => {
  const wrapper = shallowMount(AssetFormatter)
  const vm = wrapper.vm
  const all_renditions = [
    {
      url: '//vjs.zencdn.net/v/oceans.webm',
      status: 'completed',
      id: 'webm',
      contentType: 'video/webm'
    },
    {
      url: '//vjs.zencdn.net/v/oceans.mp4',
      status: 'completed',
      id: 'hls',
      contentType: 'video/mp4'
    },
    {
      url: '//vjs.zencdn.net/v/oceans.ogg',
      status: 'completed',
      id: 'ogg',
      contentType: 'audio/ogg'
    },
    {
      url: '//vjs.zencdn.net/v/oceans.mp3',
      status: 'completed',
      id: 'mp3',
      contentType: 'audio/mp3'
    }
  ]
  const video_asset = {
    contentType: 'video/123',
    renditions: all_renditions
  }
  const audio_asset = {
    contentType: 'audio/456',
    renditions: all_renditions
  }
  const video_result = [
    {
      url: '//vjs.zencdn.net/v/oceans.mp4',
      status: 'completed',
      id: 'hls',
      contentType: 'video/mp4'
    },
    {
      url: '//vjs.zencdn.net/v/oceans.webm',
      status: 'completed',
      id: 'webm',
      contentType: 'video/webm'
    }
  ]
  const audio_result = [
    {
      url: '//vjs.zencdn.net/v/oceans.mp3',
      status: 'completed',
      id: 'mp3',
      contentType: 'audio/mp3'
    },
    {
      url: '//vjs.zencdn.net/v/oceans.ogg',
      status: 'completed',
      id: 'ogg',
      contentType: 'audio/ogg'
    }
  ]

  it('should format asset based on video contentType', () => {
    wrapper.setData({
      asset: { video_asset }
    })
    expect(vm.formatAsset(video_asset)).toEqual(video_result)
  })

  it('should format asset based on audio contentType', () => {
    wrapper.setData({
      asset: { audio_asset }
    })
    expect(vm.formatAsset(audio_asset)).toEqual(audio_result)
  })
})
