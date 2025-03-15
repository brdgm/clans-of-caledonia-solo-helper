<template>
  <ActionBox>
    <template #summary>
      <div class="tradeOptions">
        <div>
          <AppIcon type="good" :name="selectedGood" class="goodIcon me-2" />
          <button class="btn btn-outline-secondary btn-sm" @click="rerollGood()">{{t('botAction.trade.reroll')}}</button>
        </div>
        <div>
          <AppIcon type="upgrade-type" name="merchant" class="merchantIcon me-1" v-for="i of merchantCount" :key="i"/>
        </div>
        <div v-html="t('botAction.trade.preferMerchantAction', {merchantAction:t(`merchantAction.${merchantAction}`)})"></div>
      </div>
    </template>
    <template #rules>
      <p v-html="t('botAction.trade.rules.selectGood')"></p>
      <div>
        <p v-html="t('botAction.trade.rules.priceBracket')"></p>
        <div class="stockMarketPrice">
          <div class="merchantAction">
            <div>{{t('merchantAction.sell')}}</div>
            <div>{{t(`merchantAction.${merchantAction}`)}}</div>
            <div>{{t('merchantAction.buy')}}</div>
          </div>
          <div>
            <img src="@/assets/stockmarket-price-bracket.webp" alt=""/>
          </div>
        </div>
      </div>
      <p class="mt-3" v-html="t('botAction.trade.rules.placeMerchants', {merchantCount})"></p>
      <p v-html="t('botAction.trade.rules.gainMoney')"></p>
      <p v-html="t('botAction.trade.rules.adjustPriceMarkers')"></p>
      <p v-html="t('botAction.trade.rules.notPossible')"></p>
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
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import randomEnumDifferentValue from '@brdgm/brdgm-commons/src/util/random/randomEnumDifferentValue'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import { ref } from 'vue'
import Good from '@/services/enum/Good'
import MerchantAction from '@/services/enum/MerchantAction'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionTrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    ActionBox
  },
  setup() {
    const { t } = useI18n()

    const selectedGood = ref(randomEnum(Good))
    const merchantAction = randomEnum(MerchantAction)
    const merchantCount = rollDice(3)

    return { t, selectedGood, merchantAction, merchantCount }
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
  methods: {
    rerollGood() {
      this.selectedGood = randomEnumDifferentValue(Good, this.selectedGood)
    }
  }
})
</script>

<style lang="scss" scoped>
.goodIcon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}
.merchantIcon {
  width: 1.25rem;
}
.tradeOptions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}
.stockMarketPrice {
  display: flex;
  .merchantAction {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
      padding: 10px;
      font-weight: bold;
    }
  }
  img {
    height: 10rem;
  }
}
</style>
