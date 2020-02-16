export default {
  methods: {
    formatAsset: function (asset) {
      var asset_type = asset.contentType
      var renditions = asset.renditions.filter(rendition => rendition.status == 'completed')

      if (asset_type == 'video/mpeg') {
        return renditions.filter(rendition => ['hls', 'mp4', 'webm'].includes(rendition.id))
      } else if (asset_type == 'audio/mpeg') {
        return renditions.filter(rendition => ['mp3', 'ogg'].includes(rendition.id))
      }
    }
  }
}
