<template>
  <div
    class="markers-container"
    :class="{ 'is-active' : showMarkersMenu }"
  >
    <header class="markers-header">
      <div class="markers-header__title">
        Jump To
      </div>
      <button
        class="button button--close"
        @click="toggleMarkers()"
      >
        <div class="vjs-icon-cancel" />
      </button>
    </header>

    <ul
      ref="markers"
      class="markers"
    >
      <li
        v-for="marker in sortedMarkers"
        :key="marker.time"
        class="markers__item"
        @click="jumpToTime(marker.time)"
      >
        <span class="markers__time">
          {{ formatDuration(marker.time) }}
        </span>
        <span class="markers__text">
          {{ marker.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Markers',
  props: {
    markers: {
      type: Array,
      required: true,
    },
    showMarkersMenu: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sortedMarkers() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.markers.sort((a, b) => a.time - b.time);
    },
  },
  methods: {
    jumpToTime(value) {
      this.$emit('markerItemClick', value);
    },
    toggleMarkers() {
      this.$emit('markersMenuVisibilityChange');
    },
    formatDuration(duration) {
      const hour = Math.floor(duration / 3600) || 0;
      const minute = Math.floor((duration % 3600) / 60) || 0;
      const second = Math.floor(duration % 60) || 0;
      let secMin = '';

      if (hour > 0) {
        secMin += `${hour}:${minute < 10 ? '0' : ''}`;
      }
      secMin += `${minute}:${second < 10 ? '0' : ''}`;
      secMin += `${second}`;

      return secMin;
    },
  },
};
</script>

<style lang="scss" scoped>
.markers-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  flex-shrink: 0;
  width: 100%;
  background-color: rgb(30, 30, 30);
  color: #95989d;
  font-family: sans-serif;
  transform: translateX(100%);
  z-index: 100;
  transition: transform 0.7s;
  border-radius: 0 10px 10px 0;
}

.markers-container.is-active {
  display: block;
  transform: translateX(0);
  transition: transform 0.7s;
}

@media (min-width: 600px) {
  .markers-container {
    display: block;
    width: 50%;
  }
}

@media (min-width: 1000px) {
  .markers-container {
    width: 35%;
    transform: translateX(0);
    transition: none;
  }
}

.markers-header {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 21px;
  border-bottom: 1px solid rgba(148, 148, 148, 0.7);
}

@media (min-width: 1000px) {
  .markers-header {
    padding: 17.5px 21px;
  }
}

.markers,
.markers__item {
  padding: 10px;
}

.markers {
  list-style: none;
  margin: 0;
  height: 100%;
  overflow-y: auto;
}

.markers__item {
  display: flex;
  align-items: center;
  font-size: 0.875em;
  cursor: pointer;
  transition: color 0.4s, border-color 0.4s;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.4s, border-color 0.4s;
  }
  &:last-child {
    // .markers-header height + 20px whitespace
    margin-bottom: 77px;
  }
}

.markers__item:hover > .markers__time {
  border-color: rgba(255, 255, 255, 0.9);
}

.markers__text,
.markers__time {
  vertical-align: middle;
}

.markers__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.markers__time {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  margin-right: 15px;
  flex-shrink: 0;
  width: 75px;
  text-align: center;
  border: 1px solid hsla(0, 0%, 59%, .4);
  border-radius: 5px;
}

.button--close {
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 20px;
  height: 36px;
  margin-left: auto;
  color: white;
}

@media (min-width: 1000px) {
  .button--close {
    display: none;
  }
}
</style>
