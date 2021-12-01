<template>
  <div
    class="triple-btn"
    :class="{
      'dropdown-btn_bottom': dropDirection == 'bottom',
      'triple-btn_horizontal-align': dotsAlign == 'horizontal'
    }"
    v-click-outside="hide"
  >
    <Button
      type="icon"
      icon="VerticalDots"
      @click="menuOpen = !menuOpen"
      class="triple-btn__icon"
    />
    <transition
      :name="dropDirection == 'bottom' ? 'dropdownBottom' : 'dropdownTop'"
    >
      <div
        class="triple-btn__menu"
        :class="{ 'triple-btn__menu_top-right': menuPosition == 'top-right' }"
        v-show="menuOpen"
      >
        <slot :noIcon="true" />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Inject,
  Provide
} from 'vue-property-decorator';
import Button from '@/components/Buttons/Button/Button.vue';
import SvgIcon from '@/components/Icons/SvgIcon.vue';

@Component({
  components: {
    SvgIcon,
    Button
  }
})
export default class TripleDotBtn extends Vue {
  @Prop({ default: 'plus' }) icon!: string;

  @Prop({ default: 'top' }) dropDirection!: string;

  @Prop({ default: 'vertical' }) dotsAlign!: string;

  @Prop({ default: 'left' }) menuPosition!: string;

  @Provide('noIcon')
  @Prop({ default: true })
  noIcon!: boolean;

  menuOpen: boolean = false;

  hide() {
    this.menuOpen = false;
  }

  @Provide()
  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
</script>
<style lang="sass">
.triple-btn
  $self: &
  display: flex
  flex-direction: column
  position: relative
  @include mq($to: phablet)
    position: initial
  &_horizontal-align
    #{ $self }__icon
      transform: rotate(90deg)
  &_bottom
    flex-direction: column-reverse
    #{ $self }__menu
      bottom: 6.1rem
      top: initial
  &__toogle
    transition: 0.3s all ease-out
    &_active
      transform: rotate(45deg)
      background: var(--font-transparent)
      &:hover
        background: var(--font-transparent)
  &__menu
    z-index: 50
    position: absolute
    right: 4rem
    top: 0rem
    display: flex
    flex-direction: column
    align-items: flex-end
    @include mq($to: phablet)
      top: 1rem
    > *
      margin-bottom: 0.5rem
    &_top-right
      right: initial
      top: initial
      bottom: 100%
      left: 100%
      align-items: flex-start
  &__item
    margin-top: 1.6rem
</style>
