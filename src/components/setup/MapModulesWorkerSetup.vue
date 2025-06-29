<template>
  <div class="mapModules">
    <AppIcon v-for="(mapModule,index) of allMapModules" :key="mapModule"
        type="map-module-worker-setup" :name="`${mapModule}-${startingLocationPort[index] ? 'port' : 'loch'}`" class="module"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MapModule from '@/services/enum/MapModule'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'MapModulesWorkerSetup',
  components: {
    AppIcon
  },
  props: {
    startingLocationPort: {
      type: Array as PropType<boolean[]>,
      required: true
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
  width: 120px;
  margin-left: 10px;
  .module {
    display: inline-block;
    height: 45px;
  }
  .module:nth-child(1) {
    margin-bottom: -10px;
  }
  .module:nth-child(2) {
    margin-bottom: -10px;
  }
}
</style>
