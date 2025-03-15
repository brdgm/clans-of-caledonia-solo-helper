<template>
  <p>{{currentCard.actions}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { useStateStore } from '@/store/state'
import { PropType } from 'vue'
import Card from '@/services/Card'

export default defineComponent({
  name: 'BotTurn',
  components: {
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
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
  }
})
</script>
