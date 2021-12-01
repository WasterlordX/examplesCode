<template>
  <button
    :class="{
      btn_primary: type == 'primary',
      btn_secondary: type == 'secondary'
    }"
    @click="click"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({
  name: 'BalanceButton'
})
export default class Button extends Vue {
  @Prop({ default: 'primary' }) type?: string; // цвет кнопки
  @Prop({ default: false }) disabled?: boolean;

  @Emit('click')
  click($event: any) {
    return $event;
  }
}
</script>
<style lang="sass" scoped>
.btn
  white-space: nowrap
  width: 18.1rem
  @include breakpoint(mobile)
    height: 4.4rem !important
    text-transform: none
  &_primary
    background: var(--primary)
    height: 3.6rem
    min-width: 10.6rem
    &:active
      &:after
        content: ""
        position: absolute
        left: 0
        top: 0
        border-radius: var(--b-radius)
        width: 100%
        height: 100%
        background: rgba(34, 45, 51, 0.3)
        transition: .2s
    &:hover
      background: var(--primary-hover)
  &_secondary
    border: .2rem solid var(--primary)
    padding: 0.6rem 1.6rem
    color: var(--font-color)
    background: transparent !important
    @include breakpoint(mobile)
      width: 100%
    &:hover
      border-color: var(--primary-hover)
      background: var(--primary-hover-transparent)
    &:active
      background: var(--primary-hover-transparent)
    &:active, &:focus
      border: .2rem solid var(--primary)
    &:disabled
      background: var(--bg-base)
</style>
