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
import { BotPersistence, useStateStore } from '@/store/state'
import getPlayerOrder from '@/util/getPlayerOrder'
import CardDeck from '@/services/CardDeck'
import SideBar from '@/components/round/SideBar.vue'
import UnitType from '@/services/enum/UnitType'
import getPreviousTurns from '@/util/getPreviousTurns'
import Cards from '@/services/Cards'
import { MAX_TURN } from '@/util/getTurnOrder'

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
        this.router.push('/endOfGameAmounts')
      }
      else {
        // prepare next round with new player order
        const playerOrder = getPlayerOrder(this.state, this.round)
        const nextRound = this.round + 1
        const initialBotPersistence : BotPersistence[] = []
        for (let bot = 1; bot<=this.botCount; bot++) {
          const previousTurns = getPreviousTurns({state:this.state, round:this.round,turn:MAX_TURN,bot})
          const lastTurn = previousTurns[previousTurns.length-1]
          const removedCards = (lastTurn?.botPersistence?.cardDeck.removed ?? []).map(Cards.get)
          const preferredUnitType = lastTurn?.botPersistence?.preferredUnitType ?? UnitType.SHEEP
          initialBotPersistence.push({
            cardDeck: CardDeck.new(nextRound, removedCards).toPersistence(),
            preferredUnitType
          })
        }
        this.state.storeRound({
          round: nextRound,
          playerOrder,
          turns: [],
          initialBotPersistence
        })
        this.router.push(`/round/${this.round+1}/preparation`)
      }
    }
  }
})
</script>
