<template>
  <ActionBox>
    <template #summary>
      If the Automa <b>has an Export contract</b>, it will try to fulfill it.
    </template>
    <template #fullRules>
      <div>It has to pay:</div>
      <div class="mt-2">
        <MoneyIcon :value="5" pay/>
        <span class="ms-1 me-1">per</span>
        <AppIcon type="good" name="wool" class="goodIcon"/>
      </div>
      <div>
        <MoneyIcon :value="10" pay/>
        <span class="ms-1 me-1">per</span>
        <AppIcon type="good" name="cheese" class="goodIcon"/>
        <AppIcon type="good" name="bread" class="goodIcon"/>
        <AppIcon type="good" name="whiskey" class="goodIcon"/>
        <AppIcon type="export-good" name="mutton" class="goodIcon"/>
        <AppIcon type="export-good" name="beef" class="goodIcon"/>
      </div>
      <div class="mt-3">It will gain any money bonus, and additionally:</div>
      <div class="mt-2">
        <MoneyIcon :value="5"/>
        <span class="ms-1 me-1">per</span>
        <AppIcon type="export-bonus" name="upgrade" class="goodIcon"/>
        <AppIcon type="export-bonus" name="free-hex" class="goodIcon"/>
      </div>
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
import MoneyIcon from '@/components/structure/MoneyIcon.vue'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionExportContractFulfill',
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
  }
})
</script>

<style lang="scss" scoped>
.goodIcon {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}
</style>
