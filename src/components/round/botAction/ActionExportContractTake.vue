<template>
  <ActionBox>
    <template #summary>
      <p v-if="isLastRound" v-html="t('botAction.export-contract-take.getLastRound')"></p>
      <p v-else v-html="t('botAction.export-contract-take.get')"></p>
      <img v-if="isLastTwoRounds" src="@/assets/player-aid/export-contract-take-round-4-5.webp" alt="" class="player-aid"/>
      <img v-else src="@/assets/player-aid/export-contract-take-round-1-3.webp" alt="" class="player-aid"/>
    </template>
    <template #rules>
      <p v-if="moneyForExportContract > 0" v-html="t('botAction.export-contract-take.gainForTaking', {amount:moneyForExportContract,round})"></p>
      <p v-else-if="moneyForExportContract < 0" v-html="t('botAction.export-contract-take.payForTaking', {amount:-moneyForExportContract,round})"></p>
      <template v-if="isLastTwoRounds">
        <p v-html="t('botAction.export-contract-take.rulesRarest.prefer')"></p>
        <p v-html="t('botAction.export-contract-take.rulesRarest.tiebreaker')"></p>
        <p>
          <MoneyIcon :value="5"/>
          <span class="ms-1 me-1" v-html="t('botAction.export-contract-take.per')"></span>
          <AppIcon type="good" name="wool" class="goodIcon"/>
          <br/>
          <MoneyIcon :value="10"/>
          <span class="ms-1 me-1" v-html="t('botAction.export-contract-take.per')"></span>
          <AppIcon type="good" name="cheese" class="goodIcon"/>
          <AppIcon type="good" name="bread" class="goodIcon"/>
          <AppIcon type="good" name="whiskey" class="goodIcon"/>
          <AppIcon type="export-good" name="mutton" class="goodIcon"/>
          <AppIcon type="export-good" name="beef" class="goodIcon"/>
        </p>
        <p v-if="isLastRound" v-html="t('botAction.export-contract-take.rulesRarest.lastRound')"></p>
      </template>
      <template v-else>
        <p v-html="t('botAction.export-contract-take.rulesCheapest.prefer')"></p>
        <p>
          <MoneyIcon :value="5"/>
          <span class="ms-1 me-1" v-html="t('botAction.export-contract-take.per')"></span>
          <AppIcon type="good" name="wool" class="goodIcon"/>
          <br/>
          <MoneyIcon :value="10"/>
          <span class="ms-1 me-1" v-html="t('botAction.export-contract-take.per')"></span>
          <AppIcon type="good" name="cheese" class="goodIcon"/>
          <AppIcon type="good" name="bread" class="goodIcon"/>
          <AppIcon type="good" name="whiskey" class="goodIcon"/>
          <AppIcon type="export-good" name="mutton" class="goodIcon"/>
          <AppIcon type="export-good" name="beef" class="goodIcon"/>
        </p>
        <p v-html="t('botAction.export-contract-take.rulesCheapest.tiebreaker')"></p>
        <p>
          <MoneyIcon :value="5"/>
          <span class="ms-1 me-1" v-html="t('botAction.export-contract-take.per')"></span>
          <AppIcon type="export-bonus" name="upgrade" class="goodIcon"/>
          <AppIcon type="export-bonus" name="free-hex" class="goodIcon"/>
        </p>
      </template>
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
import getTakeExportContractMoney from '@/util/getTakeExportContractMoney'
import { round } from 'lodash'

export default defineComponent({
  name: 'ActionExportContractTake',
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
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    isLastTwoRounds() : boolean {
      return this.round >= 4
    },
    isLastRound() : boolean {
      return this.round == 5
    },
    moneyForExportContract() : number {
      return getTakeExportContractMoney(this.round)
    }
  }
})
</script>

<style lang="scss" scoped>
.player-aid {
  width: 200px;
}
.goodIcon {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}
.goodIcon + .goodIcon {
  margin-left: -5px;
}
</style>
