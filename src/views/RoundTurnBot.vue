<template>
  <h1>{{t('player.bot', {bot}, botCount)}}</h1>

  <BotTurn v-if="navigationState.cardDeck?.currentCard"
       :navigationState="navigationState" :currentCard="navigationState.cardDeck?.currentCard"/>

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
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import BotTurn from '@/components/round/BotTurn.vue'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    BotTurn
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, bot, botCount } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, bot})

    return { t, router, navigationState, state, routeCalculator, round, turn, bot, botCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        bot:this.navigationState.bot,
        cardDeck: this.navigationState.cardDeck?.toPersistence(),
        pass: false // TODO: how to pass?!
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>
