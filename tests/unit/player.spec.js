import { shallowMount } from '@vue/test-utils'
import MindvalleyUniversalPlayer from '@/mindvalley-universal-player-component.vue'

describe('Mindvalley Universal Player', () => {
  const sources = [
    { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
    { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
    { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }
  ]

  const markers = [
    { time: 120, text: 'Marker Title 1' },
    { time: 60, text: 'Marker Title 2' }
  ]

  const sorted_markers = [
    { time: 60, text: 'Marker Title 2' },
    { time: 120, text: 'Marker Title 1' }
  ]

  const wrapper = shallowMount(MindvalleyUniversalPlayer, {
    propsData: { sources, markers },
    data: function () {
      return {
        showMarkersMenu: false
      }
    }
  })

  const vm = wrapper.vm

  vm.player.play = jest.fn()
  vm.player.currentTime = jest.fn()

  describe('Test Vue Methods', () => {
    it('should initialize video player', () => {
      vm.initialize()
      expect(vm.player).toBeTruthy()
    })

    it('should run player currentTime when jumpTo is called', () => {
      vm.jumpTo(60)
      expect(vm.player.play).toBeCalled()
      expect(vm.player.currentTime).toBeCalledWith(60)
    })

    it('should show showMarkersMenu true after toggleMarkers, if initial is false', () => {
      vm.toggleMarkers()
      expect(vm.showMarkersMenu).toBe(true)
    })

    it('should show showMarkersMenu false after toggleMarkers, if initial is true', () => {
      wrapper.setData({ showMarkersMenu: true })
      vm.toggleMarkers()
      expect(vm.showMarkersMenu).toBe(false)
    })

    it('should formatDuration correctly', () => {
      expect(vm.formatDuration(10)).toEqual('0:10')
      expect(vm.formatDuration(60)).toEqual('1:00')
      expect(vm.formatDuration(3600)).toEqual('1:00:00')
    })
  })

  describe('Test Vue Computed Properties', () => {
    it('should show markersEnabled true when markers is not null', () => {
      expect(vm.markersEnabled).toBe(true)
    })

    it('should show markersEnabled false when markers is null', () => {
      wrapper.setProps({ markers: null })
      expect(vm.markersEnabled).toBe(false)
    })

    it('should sort markers according to time', () => {
      wrapper.setProps({ markers: markers })
      expect(vm.sortedMarkers).toEqual(sorted_markers)
    })
  })

  describe('video markers integration test', () => {
    it('should render correctly when markers are not null', () => {
      const marker_title = wrapper.find('.markers-header__title')
      const marker_text = wrapper.find('.markers__text')
      const marker_time = wrapper.find('.markers__time')
      expect(marker_title.text()).toBe('Jump To')
      expect(marker_text.text()).toBe('Marker Title 2')
      expect(marker_time.text()).toBe('1:00')
    })

    it('should play video at the correct time when marker is clicked', () => {
      const marker = wrapper.find('.markers__item')
      marker.trigger('click')
      expect(vm.player.play).toBeCalled()
      expect(vm.player.currentTime).toBeCalledWith(60)
    })

    it('should hide markers when close button is clicked', () => {
      wrapper.setData({ showMarkersMenu: true })

      const close_button = wrapper.find('.button--close')
      close_button.trigger('click')

      const markers = wrapper.find('.markers-container')

      expect(vm.showMarkersMenu).toBe(false)
      expect(markers.contains('.is-active')).toBe(false)
    })
  })
})
