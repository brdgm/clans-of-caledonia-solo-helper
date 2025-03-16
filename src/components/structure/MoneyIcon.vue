<template>
  <div class="money">
    <AppIcon name="money" class="icon"/>
    <span class="value" :class="{pay}">{{value}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'MoneyIcon',
  components: {
    AppIcon
  },
  props: {
    value: {
      type: Number,
      required: false
    },
    pay: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.money {
  display: inline-block;
  position: relative;
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }
  .value {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.1rem;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.15rem;
    text-shadow:1px 1px 3px yellow, -1px -1px 3px yellow;
    &.pay {
      color: #c72c31;
    }
  }
}
</style>
