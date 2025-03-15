<template>
  <div class="tradeBox">
    <div>
      Good (reroll if already traded by Automa):
      <div>
        <AppIcon type="good" :name="selectedGood" class="goodIcon me-2" />
        <button class="btn btn-outline-secondary" @click="rerollGood()">Reroll</button>
      </div>
      <div class="mt-3">
        Place up to <b>{{merchantCount}} merchants</b>.<br/>
        <AppIcon type="upgrade-type" name="merchant" class="merchantIcon me-1" v-for="i of merchantCount" :key="i"/>
      </div>
    </div>
    <div>
      <p>Depending on the <b>current</b> price bracket of that good, choose:</p>
      <div class="stockMarketPrice">
        <div class="merchantAction">
          <div>Sell</div>
          <div>{{merchantAction}}</div>
          <div>Buy</div>
        </div>
        <div>
          <img src="@/assets/stockmarket-price-bracket.webp" alt=""/>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-3">
    <p>
      Gain <MoneyIcon :value="1"/> per <AppIcon type="upgrade-type" name="merchant" class="merchantIcon me-1"/> placed.
    </p>
    <p class="small fst-italic">Adjusts the Price markers as normal. Automa does not gain any more money even when selling a good and also does not pay any money when buying a good. Action is not possible when Automa has no merchant left, or has already traded all types of Goods.</p>
  </div>
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
import MoneyIcon from '@/components/structure/MoneyIcon.vue'

export default defineComponent({
  name: 'ActionTrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    MoneyIcon
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
.tradeBox {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
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
