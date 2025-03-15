<template>
  <div>If the Automa <b>has no Export contract</b>, it will get one.</div>
  <div>The Automa receives or must <b>pay money for taking</b> an Export contract as normal depending on the current round.</div>
  <div class="mt-3">It will take the <b>cheapest</b> export contract, by counting:</div>
  <div class="mt-2">
    <MoneyIcon :value="5"/>
    <span class="ms-1 me-1">per</span>
    <AppIcon type="good" name="wool" class="goodIcon"/>
  </div>
  <div>
    <MoneyIcon :value="10"/>
    <span class="ms-1 me-1">per</span>
    <AppIcon type="good" name="cheese" class="goodIcon"/>
    <AppIcon type="good" name="bread" class="goodIcon"/>
    <AppIcon type="good" name="whiskey" class="goodIcon"/>
    <AppIcon type="export-good" name="mutton" class="goodIcon"/>
    <AppIcon type="export-good" name="beef" class="goodIcon"/>
  </div>
  <div class="mt-3">If tied, it prefers export contracts with the <b>hightest monetary bonus</b>, including:</div>
  <div class="mt-2">
    <MoneyIcon :value="5"/>
    <span class="ms-1 me-1">per</span>
    <AppIcon type="export-bonus" name="upgrade" class="goodIcon"/>
    <AppIcon type="export-bonus" name="free-hex" class="goodIcon"/>
  </div>
  <hr/>
  <div class="mt-3">It will prefer export contracts whose <b>import Good is rarest</b> on the Scoring track - treat any Export contract on a human
    player’s Export box as fulfilled for this purpose.</div>
  <div class="mt-3">If tied, will take the <b>most expensive</b> export contract, by counting:</div>
  <div class="mt-2">
    <MoneyIcon :value="5"/>
    <span class="ms-1 me-1">per</span>
    <AppIcon type="good" name="wool" class="goodIcon"/>
  </div>
  <div>
    <MoneyIcon :value="10"/>
    <span class="ms-1 me-1">per</span>
    <AppIcon type="good" name="cheese" class="goodIcon"/>
    <AppIcon type="good" name="bread" class="goodIcon"/>
    <AppIcon type="good" name="whiskey" class="goodIcon"/>
    <AppIcon type="export-good" name="mutton" class="goodIcon"/>
    <AppIcon type="export-good" name="beef" class="goodIcon"/>
  </div>
  <div class="mt-3"><b>Last Round:</b> The Automa <b>immediately fulfills</b> an Export contract after taking it. Therefore, it only considers Export contracts it can afford (£15 to take + fulfillment cost) and selects the one it can complete that best fits the criteria above.</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import MoneyIcon from '@/components/structure/MoneyIcon.vue'

export default defineComponent({
  name: 'ActionExportContractTake',
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
