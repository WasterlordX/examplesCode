<template>
  <Portal to="popup" :order="order">
    <Popup v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
      <template slot="header-left">
        <slot name="header-left" />
      </template>
      <template slot="header-title">
        <slot name="header-title" />
      </template>
      <template slot="header-right">
        <slot name="header-right" />
      </template>
      <template slot="body">
        <slot name="body" />
      </template>
      <template slot="footer">
        <slot name="footer" />
      </template>
    </Popup>
  </Portal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Popup from './_popup.vue';

@Component({
  components: {
    Popup
  }
})
export default class PopupPortal extends Vue {
  @Prop({ default: 1 }) order!: number;
}
</script>
