<template>
  <ActionBox>
    <template #summary>
      <MoneyIcon :value="4" pay/>
      <span class="ms-1 me-2">:</span>
      <template v-for="(upgradeType, index) in upgradeTypes" :key="upgradeType">
        <span v-if="index > 0">＞</span>
        <AppIcon type="upgrade-type" :name="upgradeType" class="upgradeTypeIcon"/>
      </template>
    </template>
    <template #rules>
      <p v-html="t('botAction.upgrade.rules')"></p>
      <hr/>
      <h5>{{t('botAction.port-bonus.title')}}</h5>
      <p>
        <span v-html="t('botAction.port-bonus.rules')"/><br/>
        <AppIcon name="port-claim" class="portClaimIcon"/>: <MoneyIcon :value="10"/>
      </p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import UpgradeType from '@/services/enum/UpgradeType'
import MoneyIcon from '@/components/structure/MoneyIcon.vue'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionUpgrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    MoneyIcon,
    ActionBox
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
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    upgradeTypes() : UpgradeType[] {
      if (this.currentSupportCard?.upgradeType == UpgradeType.SHIP_LEVEL) {
        return [UpgradeType.SHIP_LEVEL, UpgradeType.MERCHANT]
      }
      else {
        return [UpgradeType.MERCHANT, UpgradeType.SHIP_LEVEL]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.upgradeTypeIcon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  margin-left: 5px;
  margin-right: 5px;
}
.portClaimIcon {
  width: 2.5rem;
}
</style>
