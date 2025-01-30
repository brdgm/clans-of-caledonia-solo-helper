<template>
  <div class="mb-2">
    <div v-if="botCount > 1" class="mt-2 fw-bold">{{t('player.bot', {bot}, botCount)}}</div>
    <ul>
      <li v-for="(port,index) of startingLocationPort" :key="index">
        <span v-if="port" v-html="t('setupBot.setup.botStartingWorkers.port', {worker:index+1, mapModule:mapModules[index]})"></span>
        <span v-else v-html="t('setupBot.setup.botStartingWorkers.loch', {worker:index+1, mapModule:mapModules[index]})"></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import MapModule from '@/services/enum/MapModule'

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
      const result : boolean[] = []
      for (let index = 0; index < 4; index++) {
        const dice = rollDice(2)
        if (dice == 2 && portCount < 2) {
          result.push(true)
          portCount++
        }
        else {
          result.push(false)
        }
      }
      return result
    }
  }
})
</script>
