import { shallowMount } from '@vue/test-utils'
import MindvalleyUniversalPlayer from '@/mindvalley-universal-player-component.vue'

describe('Mindvalley Universal Player', () => {
  const sources = [
    { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
    { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
    { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }
  ]

  const markers = [
    { time: 60, text: 'Marker Title 1' },
    { time: 120, text: 'Marker Title 2' }
  ]

  const wrapper = shallowMount(MindvalleyUniversalPlayer, {
    propsData: { sources, markers }
  })

  it('sources & markers should be object type', () => {
    expect(typeof sources).toEqual('object')
    expect(typeof markers).toEqual('object')
  })

  it('should check if player is initilized', () => {
    expect(wrapper.vm.player).toBeTruthy()
  })

  it('should play when play button is clicked', () => {
    const button = wrapper.find('.vjs-big-play-button')
    wrapper.vm.player.play = jest.fn()
    button.trigger('click')
    expect(wrapper.vm.player.play).toBeCalled()
  })

  it('should run player currentTime when jumpTo is called', () => {
    wrapper.vm.player.currentTime = jest.fn()
    wrapper.vm.jumpTo(60)
    expect(wrapper.vm.player.currentTime).toBeCalledWith(60)
  })

  it('should toggleMarkers correctly', () => {
    wrapper.setData({ showMarkersMenu: false })
    wrapper.vm.toggleMarkers()
    expect(wrapper.vm.showMarkersMenu).toBeTruthy()
  })

  it('should formatDuration correctly', () => {
    const format_duration = wrapper.vm.formatDuration(3600)
    expect(format_duration).toEqual('1:00:00')
  })
})
