<template>
  <div>
    Asset Formmater
  </div>
</template>

<script>
import AssetFormatter from './mixins/AssetFormatter'

export default {
  name: 'AssetFormatter',
  mixins: [AssetFormatter],
  data: function () {
    return {
      asset: null
    }
  }
}
</script>
