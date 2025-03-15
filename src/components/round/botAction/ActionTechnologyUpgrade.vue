<template>
  <div>If Automa has <b>3 or more workers of the same type</b>:</div>
  <div class="mt-1">
    <MoneyIcon :value="10" pay/>
    <span class="ms-1">to upgrade:</span>
    <template v-for="(workerType, index) in workerTypes" :key="workerType">
      <span v-if="index > 0">, </span>
      {{workerType}}
    </template>
  </div>
  <div class="mt-2">Automa prefers the first option.</div>  
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import MoneyIcon from '@/components/structure/MoneyIcon.vue'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import WorkerType from '@/services/enum/WorkerType'

export default defineComponent({
  name: 'ActionTechnologyUpgrade',
  inheritAttrs: false,
  components: {
    MoneyIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<Action>,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    },
    currentSupportCard: {
      type: Object as PropType<Card>,
      required: false
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    workerTypes() : WorkerType[] {
      const preferredWorkerType = randomEnum(WorkerType)
      if (preferredWorkerType == WorkerType.WOODCUTTER) {
        return [WorkerType.WOODCUTTER, WorkerType.MINER]
      }
      else {
        return [WorkerType.MINER, WorkerType.WOODCUTTER]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
