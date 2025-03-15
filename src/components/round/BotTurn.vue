<template>
  <template v-if="isSkipTurn">
    <p class="mt-2">
      <AppIcon type="action" name="skip-turn" class="icon"/>
      <span v-html="t('roundTurnBot.skipTurn')"></span>
    </p>

    <button class="btn btn-primary btn-lg mt-4 me-2" @click="executed()">
      {{t('action.next')}}
    </button>
  </template>
  <template v-else-if="isPass">
    <p class="mt-4" v-html="t('roundTurnBot.passInfo', {botName:t('player.bot', {bot}, botCount)})"></p>

    <button class="btn btn-primary btn-lg mt-4 me-2" @click="pass()">
      {{t('action.pass')}}
    </button>
  </template>
  <template v-else>
    <p>{{currentAction}}</p>

    <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()">
      {{t('roundTurnBot.executed')}}
    </button>

    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('roundTurnBot.notPossible')}}
    </button>
  </template>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { useStateStore } from '@/store/state'
import { PropType } from 'vue'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    AppIcon
  },
  emits: ['executed', 'notPossible', 'pass'],
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    const { action, bot, botCount } = props.navigationState
    const currentAction = props.currentCard.actions[action]
    if (currentAction == Action.UPGRADE || currentAction == Action.EXPAND) {
      props.navigationState.cardDeck?.drawSupport()
    }

    return { t, state, bot, botCount, currentAction }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    isPass() : boolean {
      return !this.currentAction
    },
    isSkipTurn() : boolean {
      return this.currentAction == Action.SKIP_TURN
    },
    currentSupportCard() : Card|undefined {
      return this.navigationState.cardDeck?.currentSupportCard
    }
  },
  methods: {
    executed() : void {
      this.$emit('executed')
    },
    notPossible() : void {
      this.$emit('notPossible')
    },
    pass() : void {
      this.$emit('pass')
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2rem;
  margin: 10px;
}
</style>
