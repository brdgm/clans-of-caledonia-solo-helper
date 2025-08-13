<template>
  <ActionBox>
    <template #summary>
      <div class="tradeOptions">
        <div>
          <AppIcon type="good" :name="selectedGood" class="goodIcon me-1" />
          <button class="btn btn-outline-secondary btn-sm" @click="rerollGood()">{{t('botAction.trade.reroll')}}</button>
        </div>
        <div>
          <AppIcon name="merchant" class="merchantIcon me-1" v-for="i of merchantCount" :key="i"/>
        </div>
        <div v-html="t('botAction.trade.preferMerchantAction', {merchantAction:t(`merchantAction.${merchantAction}`)})"></div>
        <div>
          <AppIcon name="merchant" class="merchantIcon me-1"/>: <MoneyIcon :value="1"/>
        </div>
      </div>
    </template>
    <template #rules>
      <p v-html="t('botAction.trade.rules.selectGood')"></p>
      <p><img src="@/assets/player-aid/trade-good-available.webp" alt="" class="player-aid-good"/></p>
      <div>
        <p><span v-html="t('botAction.trade.rules.priceBracket')"></span><RandomizedIcon/></p>
        <img v-if="isPreferBuy" src="@/assets/player-aid/trade-prefer-buy.webp" alt="" class="player-aid-stockmarket"/>
        <img v-else src="@/assets/player-aid/trade-prefer-sell.webp" alt="" class="player-aid-stockmarket"/>
      </div>
      <p class="mt-3" v-html="t('botAction.trade.rules.placeMerchants', {merchantCount})"></p>
      <p v-html="t('botAction.trade.rules.gainMoney')"></p>
      <p v-html="t('botAction.trade.rules.adjustPriceMarkers')"></p>
      <p v-html="t('botAction.trade.rules.notPossible')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import randomEnumDifferentValue from '@brdgm/brdgm-commons/src/util/random/randomEnumDifferentValue'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import Good from '@/services/enum/Good'
import MerchantAction from '@/services/enum/MerchantAction'
import ActionBox from '../ActionBox.vue'
import MoneyIcon from '@/components/structure/MoneyIcon.vue'
import RandomizedIcon from '@/components/structure/RandomizedIcon.vue'

export default defineComponent({
  name: 'ActionTrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    ActionBox,
    MoneyIcon,
    RandomizedIcon
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
  },
  computed: {
    isPreferBuy() : boolean {
      return this.merchantAction == MerchantAction.BUY
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
  width: 1.75rem;
}
.tradeOptions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}
.player-aid-good {
  width: 150px;
}
.player-aid-stockmarket {
  width: 150px;
}
</style>
