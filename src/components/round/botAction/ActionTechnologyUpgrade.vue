<template>
  <ActionBox>
    <template #summary>
      <img src="@/assets/player-aid/technology-upgrade.webp" alt="" class="player-aid"/>
    </template>
    <template #rules>
      <p v-html="t('botAction.technology-upgrade.fullRule')"></p>
      <p><span v-html="t('botAction.technology-upgrade.tiebreaker')"></span><RandomizedIcon/></p>
      <ul>
        <li v-for="workerType in workerTypes" :key="workerType">
          {{t(`workerType.${workerType}`)}}
        </li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import WorkerType from '@/services/enum/WorkerType'
import ActionBox from '../ActionBox.vue'
import RandomizedIcon from '@/components/structure/RandomizedIcon.vue'

export default defineComponent({
  name: 'ActionTechnologyUpgrade',
  inheritAttrs: false,
  components: {
    ActionBox,
    RandomizedIcon
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
.player-aid {
  width: 90px;
}
</style>
