<template>
  <AppIcon name="price-dice" class="priceDiceIcon"
      data-bs-toggle="tooltip" data-bs-custom-class="action-help-tooltip" :data-bs-title="t('botAction.randomized')"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RandomizedIcon',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style lang="scss" scoped>
.priceDiceIcon {
  height: 1rem;
  margin-top: -0.15rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>
