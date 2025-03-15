<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundScoring.title')}}</h1>

  <p class="mt-4" v-html="t('roundScoring.execute')"></p>

  <p v-html="t('roundScoring.botNoScoring')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import getPlayerOrder from '@/util/getPlayerOrder'
import CardDeck from '@/services/CardDeck'
import SideBar from '@/components/round/SideBar.vue'

export default defineComponent({
  name: 'RoundScoring',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, botCount } = navigationState

    return { t, router, state, navigationState, round, botCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round}/production`
    },
    isLastRound() : boolean {
      return this.round == 5
    }
  },
  methods: {
    next() : void {
      if (this.isLastRound) {
        this.router.push(`/endOfGame`)
      }
      else {
        // prepare next round with new player order
        const playerOrder = getPlayerOrder(this.state, this.round)
        const nextRound = this.round + 1
        const initialCardDeck : CardDeck[] = []
        for (let bot = 1; bot<=this.botCount; bot++) {
          playerOrder.push({ bot })
          initialCardDeck.push(CardDeck.new(nextRound))
        }
        this.state.storeRound({
          round: nextRound,
          playerOrder,
          turns: [],
          initialCardDeck: initialCardDeck.map(cardDeck => cardDeck.toPersistence())
        })
        this.router.push(`/round/${this.round+1}/preparation`)
      }
    }
  }
})
</script>
