<template>
  <div class="mapModules">
    <AppIcon v-for="mapModule of allMapModules" :key="mapModule"
        type="map-module" :name="`${mapModule}-${mapModules?.includes(mapModule) ? 'on' : 'off'}`" class="module"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'
import MapModule from '@/services/enum/MapModule'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'MapModules',
  components: {
    AppIcon
  },
  props: {
    mapModules: {
      type: Array as PropType<MapModule[]>,
      required: false
    }
  },
  computed: {
    allMapModules() : MapModule[] {
      return getAllEnumValues(MapModule)
    }
  }
})
</script>

<style lang="scss" scoped>
.mapModules {
  display: flex;
  flex-wrap: wrap;
  width: 80px;
  .module {
    height: 30px;
    margin-right: 2px;
  }
}
</style>
