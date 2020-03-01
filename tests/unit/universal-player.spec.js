import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import MindvalleyUniversalPlayer from '@/mindvalley-universal-player-component.vue'

describe('Mindvalley Universal Player', () => {
  const wrapper = shallowMount(MindvalleyUniversalPlayer, {
    propsData: {
      sources: [
        { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
        { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
        { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }
      ],
      markers: [
        { time: 120, text: 'Marker Title 1' },
        { time: 60, text: 'Marker Title 2' }
      ],
      posterUrl: 'http://www.image.com',
      playerType: 'video',
      duration: 120,
      mediaTitle: 'Sample Audio Title',
      playbackRates: [0.5, 1, 1.5, 2]
    },
    data: function () {
      return {
        showMarkersMenu: false,
        currentTime: 60,
        playing: false,
        playbackRate: 1
      }
    }
  })

  const vm = wrapper.vm

  vm.play = jest.fn()
  vm.pause = jest.fn()
  vm.player.currentTime = jest.fn()

  it('should initialize player', () => {
    vm.initialize()
    expect(vm.player).toBeTruthy()
  })

  it('should formatDuration correctly', () => {
    expect(vm.formatDuration(10)).toEqual('0:10')
    expect(vm.formatDuration(60)).toEqual('1:00')
    expect(vm.formatDuration(3600)).toEqual('1:00:00')
  })

  describe('Video Player', () => {
    it('renders markers correctly', () => {
      const marker_title = wrapper.find('.markers-header__title')
      const marker_text = wrapper.find('.markers__text')
      const marker_time = wrapper.find('.markers__time')
      expect(marker_title.text()).toBe('Jump To')
      expect(marker_text.text()).toBe('Marker Title 2')
      expect(marker_time.text()).toBe('1:00')
    })

    it('videoPlayerMode should be true when playerType is video', () => {
      expect(vm.videoPlayerMode).toBe(true)
      expect(vm.audioPlayerMode).toBe(false)
    })

    it('should sort markers according to time', () => {
      const sorted_markers = [
        { time: 60, text: 'Marker Title 2' },
        { time: 120, text: 'Marker Title 1' }
      ]

      expect(vm.sortedMarkers).toEqual(sorted_markers)
    })

    it('should play video at the correct time when marker is clicked', () => {
      const marker = wrapper.find('.markers__item')
      marker.trigger('click')
      expect(vm.play).toBeCalled()
      expect(vm.player.currentTime).toBeCalledWith(60)
    })

    it('should run toggleMarkers function correctly', () => {
      wrapper.setData({ showMarkersMenu: false })
      vm.toggleMarkers()
      expect(vm.showMarkersMenu).toBe(true)
      vm.toggleMarkers()
      expect(vm.showMarkersMenu).toBe(false)
    })

    it('should hide markers when close button is clicked', () => {
      wrapper.setData({ showMarkersMenu: true })

      const close_button = wrapper.find('.button--close')
      close_button.trigger('click')

      const markers = wrapper.find('.markers-container')

      expect(vm.showMarkersMenu).toBe(false)
      expect(markers.contains('.is-active')).toBe(false)
    })

    it('should show markersEnabled true when markers is not null', () => {
      expect(vm.markersEnabled).toBe(true)
      wrapper.setProps({ markers: null })
      expect(vm.markersEnabled).toBe(false)
    })
  })

  describe('Audio PLayer', () => {
    it('audioPlayerMode should be true when playerType is audio', () => {
      wrapper.setProps({ playerType: 'audio' })

      expect(vm.videoPlayerMode).toBe(false)
      expect(vm.audioPlayerMode).toBe(true)
    })

    it('renders audio title correctly', () => {
      wrapper.setProps({ mediaTitle: 'test test' })

      Vue.nextTick(() => {
        const media_title = wrapper.find('.audio-interface__title')
        expect(media_title.text()).toBe('test test')
      })
    })

    it('renders poster correctly', () => {
      const poster = wrapper.find('.audio-interface__poster')
      expect(poster.attributes()['style']).toBe('background-image: url(http://www.image.com);')
    })

    it('should render the correct duration time at progress bar', () => {
      const current_time = wrapper.find('.audio-interface__current-time')
      const duration = wrapper.find('.audio-interface__duration')
      expect(current_time.text()).toBe('1:00')
      expect(duration.text()).toBe('2:00')
    })

    it('progress bar should reflect the currentTime of the player', () => {
      const progress_bar = wrapper.find('.audio-interface__current-time-seeker')
      expect(progress_bar.attributes()['style']).toBe('width: 50%;')
    })

    it('should calculate the durationCompletionPercentage correctly', () => {
      expect(vm.durationCompletionPercentage).toEqual(50) // Duration 50 divide by 120 duration
    })

    it('should rewind 10 seconds when rewind button is clicked', () => {
      const rewind_button = wrapper.find('.button--audio-rewind')
      const rewind_time = vm.currentTime - 10
      rewind_button.trigger('click')
      expect(vm.play).toBeCalled()
      expect(vm.player.currentTime).toBeCalledWith(rewind_time)
    })

    it('should change playbackRate when button is clicked', () => {
      const playbackrate_button = wrapper.find('.button--audio-playback-rate')
      expect(playbackrate_button.text()).toBe('1x')

      playbackrate_button.trigger('click')
      expect(vm.playbackRate).toBe(1.5) // current playbackRate is 1

      Vue.nextTick(() => {
        expect(playbackrate_button.text()).toBe('1.5x')
      })
    })

    it('playbackRate number change should reflect when props playbackRates is changed', () => {
      wrapper.setProps({ playbackRates: [1, 5, 10, 15] })
      const playbackrate_button = wrapper.find('.button--audio-playback-rate')
      playbackrate_button.trigger('click')
      expect(vm.playbackRate).toBe(5) // current playbackRate is 1

      Vue.nextTick(() => {
        expect(playbackrate_button.text()).toBe('5x')
      })
    })
  })

  describe('when sources is empty or invalid', () => {
    const invalid_sources = [{ src: '//vjs.zencdn.net/v/oceans.pdf', type: 'file/pdf' }]

    it('should show videojs error modal when sources is invalid', () => {
      wrapper.setProps({ sources: invalid_sources })
      const error_modal = wrapper.find('.vjs-error-display')
      expect(error_modal.exists()).toBeTruthy()
    })

    it('should still show video player when sources is empty', () => {
      wrapper.setProps({ sources: [] })
      const play_button = wrapper.find('.vjs-big-play-button')
      expect(play_button.exists()).toBeTruthy()
    })
  })
})
