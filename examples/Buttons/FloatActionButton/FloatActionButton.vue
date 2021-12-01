<template>
  <div :class="{ 'bg-wrapper': show }">
    <div class="buttons-wrapper" :style="_alignment">
      <div
        v-if="!show"
        style="order: 1"
        class="float-action-button"
        @click="show = true"
      >
        <SvgIcon color="var(--btn-primary-hover-bg)" name="menu"></SvgIcon>
      </div>
      <div
        v-else
        style="order: 1"
        class="float-action-button float-action-button_open"
        @click="show = false"
      >
        <SvgIcon color="var(--btn-primary-hover-bg)" name="close"></SvgIcon>
      </div>
      <transition name="fade">
        <template v-if="show">
          <div class="action__buttons">
            <slot></slot>
          </div>
        </template>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SvgIcon from '@/components/Icons/SvgIcon.vue';

@Component({
  components: {
    SvgIcon
  }
})
export default class FloatActionButton extends Vue {
  @Prop({ default: 'start' }) alignment!: string;

  public show = false;

  get _alignment() {
    return `
      align-items: flex-${this.alignment}
    `;
  }
}
</script>

<style lang="sass">
%float-button
  z-index: 9999
  width: 4.5rem
  height: 4.5rem
  overflow: hidden
  border-radius: 100%
  background-color: var(--primary)
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  user-select: none
  box-shadow: var(--dp6)

.buttons-wrapper
  position: fixed
  padding: 1.6rem
  width: 100%
  bottom: 1rem
  display: flex
  flex-direction: column
.bg-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 30000
  background: rgba(var(--bg-base-rgb), .5)

.float-action-button

  @extend %float-button

  &_open
    background-color: var(--font-transparent)
.action__buttons
  flex-direction: column

  .action-button
    @extend %float-button
    bottom: 5rem!important
  .action-button:hover +.action-button__label
    visibility: visible


  .action-button__label
    visibility: hidden
    padding: 1.4rem
    background: var(--bg-label)
    color: var(--font-active)
    border-radius: var(--b-radius)
    margin-right: 0.5rem
    font-size: 1.2rem
</style>
