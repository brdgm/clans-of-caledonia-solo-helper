<template>
  <div class="actionBox upper">
    <AppIcon type="action" :name="action" class="actionIcon"/>
    <h5>{{t(`botAction.${action}.title`)}}</h5>
  </div>
  <div class="actionBox lower">
    <component :is="`action-${action}`" :action="action"
        :currentCard="currentCard" :currentSupportCard="currentSupportCard" :navigationState="navigationState"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import AppIcon from '../structure/AppIcon.vue'
import ActionExpand from './botAction/ActionExpand.vue'
import ActionExportContractFulfill from './botAction/ActionExportContractFulfill.vue'
import ActionExportContractTake from './botAction/ActionExportContractTake.vue'
import ActionTechnologyUpgrade from './botAction/ActionTechnologyUpgrade.vue'
import ActionTrade from './botAction/ActionTrade.vue'
import ActionUpgrade from './botAction/ActionUpgrade.vue'

export default defineComponent({
  name: 'BotAction',
  components: {
    AppIcon,
    ActionExpand,
    ActionExportContractFulfill,
    ActionExportContractTake,
    ActionTechnologyUpgrade,
    ActionTrade,
    ActionUpgrade
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: String as PropType<Action>,
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
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  border: 3px solid #b6ac9a;
  padding: 15px;
  background-color: #eee1ac;
  &.upper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &.lower {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 0;
  }
}
.actionIcon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}
</style>
