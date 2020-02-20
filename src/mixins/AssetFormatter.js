export default {
  methods: {
    formatAsset: function (asset) {
      var asset_type = asset.contentType
      var renditions = asset.renditions.filter(rendition => rendition.status == 'completed')

      if (asset_type.startsWith('video/')) {
        var video_renditions = renditions.filter(rendition =>
          ['hls', 'mp4', 'webm'].includes(rendition.id)
        )
        return video_renditions.sort((a, b) => a.id.localeCompare(b.id))
      } else if (asset_type.startsWith('audio/')) {
        var audio_renditions = renditions.filter(rendition =>
          ['mp3', 'ogg'].includes(rendition.id)
        )
        return audio_renditions.sort((a, b) => a.id.localeCompare(b.id))
      }
    }
  }
}
