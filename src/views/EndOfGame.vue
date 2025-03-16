<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <FinalScoring/>

  <p class="mt-3">
    {{t('endOfGame.difficultyLevel')}} <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b>
  </p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import FinalScoring from '@/components/scoring/FinalScoring.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    FinalScoring
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/5/scoring`
    }
  }
})
</script>
