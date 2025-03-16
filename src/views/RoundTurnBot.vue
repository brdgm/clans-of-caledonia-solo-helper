<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    <PlayerColorDisplay :playerColor="navigationState.playerColor" class="me-1"/>{{t('player.bot', {bot}, botCount)}}
  </h1>

  <BotTurn v-if="navigationState.cardDeck?.currentCard"
       :navigationState="navigationState" :currentCard="navigationState.cardDeck?.currentCard"
       @executed="next" @notPossible="notPossible" @pass="pass"/>

  <DebugInfo :navigationState="navigationState"/>

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
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import Action from '@/services/enum/Action'
import getNextUnitType from '@/util/getNextUnitType'
import UnitType from '@/services/enum/UnitType'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    PlayerColorDisplay,
    BotTurn,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, action, bot, botCount } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, action, bot})

    return { t, router, navigationState, state, routeCalculator, round, turn, bot, botCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next(action: Action) : void {
      this.nextWithPassed(false, action)
    },
    notPossible() : void {
      this.router.push(this.routeCalculator.getNextActionRouteTo(this.state))
    },
    pass() : void {
      this.nextWithPassed(true)
    },
    nextWithPassed(passed : boolean, action?: Action) : void {
      const cardDeck = this.navigationState.cardDeck
      if (!cardDeck) {
        return
      }
      // ensure support card is drawn if the chose action, or one of the skipped ones, demanded one
      const possibleActions = (cardDeck.currentCard?.actions ?? []).slice(0, this.navigationState.action + 1)
      if (possibleActions.includes(Action.UPGRADE) || possibleActions.includes(Action.EXPAND)) {
        this.navigationState.cardDeck?.drawSupport()
      }
      let preferredUnitType = this.navigationState.preferredUnitType ?? UnitType.SHEEP
      if (action == Action.EXPAND) {
        preferredUnitType = getNextUnitType(preferredUnitType, cardDeck.currentSupportCard?.chooseUnitSteps ?? 0)
      }
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        bot:this.navigationState.bot,
        botPersistence: {
          cardDeck: cardDeck.toPersistence(),
          preferredUnitType
        },
        pass: passed
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>
