<template>
  <div>
    <MoneyIcon :value="4" pay/>
    <span class="ms-1 me-2">:</span>
    <template v-for="(upgradeType, index) in upgradeTypes" :key="upgradeType">
      <span v-if="index > 0" class="ms-2 me-2">or</span>
      <AppIcon type="upgrade-type" :name="upgradeType" class="upgradeTypeIcon"/>
    </template>
  </div>
  <div class="mt-2">Automa prefers the first option.</div>
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

export default defineComponent({
  name: 'ActionUpgrade',
  inheritAttrs: false,
  components: {
    AppIcon,
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
}
</style>
