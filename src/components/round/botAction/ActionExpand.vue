<template>
  <div class="expandSelection">
    <MapModules :mapModules="mapModules"/>
    <div>
      <template v-for="(expandCriteria,index) of expandCriteria" :key="expandCriteria">
        <span v-if="index > 0" class="ms-1 me-1">＞</span>
        <AppIcon type="expand-criteria" :name="expandCriteria" class="expandCriteriaIcon"/>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import MapModule from '@/services/enum/MapModule'
import MapModules from '@/components/structure/MapModules.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import ExpandCriteria from '@/services/enum/ExpandCriteria'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'ActionExpand',
  inheritAttrs: false,
  components: {
    MapModules,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    isLastRound() : boolean {
      return this.navigationState.round == 5
    },
    mapModules() : MapModule[] {
      if (this.isLastRound) {
        // in round 5 always check all map modules
        return getAllEnumValues(MapModule)
      }
      return this.currentSupportCard?.mapModules ?? []
    },
    expandCriteria() : ExpandCriteria[] {
      if (this.isLastRound) {
        // in round 5 always check for settlements first
        return [ExpandCriteria.SETTLEMENTS, ...(this.currentSupportCard?.expandCriteria ?? []).filter(item => item != ExpandCriteria.SETTLEMENTS)]
      }
      return this.currentSupportCard?.expandCriteria ?? []
    }
  }
})
</script>

<style lang="scss" scoped>
.expandSelection {
  display: flex;
  align-items: center;
  gap: 10px;
}
.expandCriteriaIcon {
  height: 2rem;
}
</style>
