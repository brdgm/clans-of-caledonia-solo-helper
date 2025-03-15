<template>
  <ActionBox>
    <template #summary>
      <p v-if="isLastRound" v-html="t('botAction.export-contract-take.getLastRound')"></p>
      <p v-else v-html="t('botAction.export-contract-take.get')"></p>
      <p v-if="isLastTwoRounds" v-html="t('botAction.export-contract-take.preferRarest')"></p>
      <p v-else v-html="t('botAction.export-contract-take.preferCheapest')"></p>
    </template>
    <template #rules>
      <p v-html="t('botAction.export-contract-take.payForTaking')"></p>
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
    isLastTwoRounds() : boolean {
      return this.navigationState.round >= 4
    },
    isLastRound() : boolean {
      return this.navigationState.round == 5
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
.goodIcon + .goodIcon {
  margin-left: -5px;
}
</style>
