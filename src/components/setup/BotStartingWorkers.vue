<template>
  <div class="mb-2">
    <div v-if="botCount > 1" class="mt-2 fw-bold">{{t('player.bot', {bot}, botCount)}}</div>
    <div class="mapModuleWorkerSetup">
      <ul>
        <li v-for="(port,index) of startingLocationPort" :key="index">
          <span v-if="port" v-html="t('setupBot.setup.botStartingWorkers.port', {worker:index+1, mapModule:mapModules[index]})"></span>
          <span v-else v-html="t('setupBot.setup.botStartingWorkers.loch', {worker:index+1, mapModule:mapModules[index]})"></span>
        </li>
      </ul>
      <MapModulesWorkerSetup :startingLocationPort="startingLocationPort"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import MapModule from '@/services/enum/MapModule'
import MapModulesWorkerSetup from './MapModulesWorkerSetup.vue'

export default defineComponent({
  name: 'BotStartingWorkers',
  props: {
    bot: {
      type: Number,
      required: true
    },
    botCount: {
      type: Number,
      required: true
    },
  },
  components: {
    MapModulesWorkerSetup
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    mapModules() : string[] {
      return Object.values(MapModule).map((module) => module.toLocaleUpperCase())
    },
    startingLocationPort() : boolean[] {
      let portCount = 0
      let lochCount = 0
      const result : boolean[] = []
      for (let index = 0; index < 4; index++) {
        if (portCount == 2) {
          result.push(false)
          lochCount++
          continue
        }
        if (lochCount == 2) {
          result.push(true)
          portCount++
          continue
        }
        const dice = rollDice(2)
        if (dice == 2) {
          result.push(true)
          portCount++
        }
        else {
          result.push(false)
          lochCount++
        }
      }
      return result
    }
  }
})
</script>

<style lang="scss" scoped>
.mapModuleWorkerSetup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>