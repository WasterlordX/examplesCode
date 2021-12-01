<template>
  <div class="tooltip-btn">
    <div
      class="tooltip-btn__label"
      :class="{
        'tooltip-btn__label_disabled': disabled
      }"
      @click="!disabled ? click($event) : ''"
    >
      <SvgIcon
        :name="icon"
        :color="iconColor"
        v-if="!noIcon && iconPosition == 'label-left'"
        class="mr-16"
      />
      {{ label }}
    </div>
    <Button
      class="tooltip-btn__btn"
      :type="type"
      :round="true"
      :icon="icon"
      @click="!disabled ? click($event) : ''"
      :disabled="disabled"
      v-if="!noIcon && iconPosition == 'standart'"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator';

@Component({
  name: 'TooltipButton',
  components: {
    Button: () => import('@/components/Buttons/Button/Button.vue'),
    SvgIcon: () => import('@/components/Icons/SvgIcon.vue')
  }
})
export default class TooltipButton extends Vue {
  @Prop({ default: 'primary' }) type?: string; // цвет кнопки

  @Prop({ default: '' }) label?: string;

  @Prop({ default: 'plus' }) icon?: string;

  @Prop({ default: 'var(--font-color)' }) iconColor?: string;

  @Prop({ default: 'standart' }) iconPosition?: string;

  @Prop({ default: false }) big?: boolean; // большая/маленькая кнопка

  @Prop({ default: false }) disabled?: boolean;

  @Prop({ default: 0 }) width?: number;

  @Prop({ default: false }) round?: boolean;

  @Prop() background?: string;

  @Inject({ default: false }) noIcon?: boolean;

  @Inject({ default: undefined }) toogleMenu?: Function | undefined;

  @Emit('click')
  click($event: any) {
    if (this.toogleMenu) this.toogleMenu();
    return $event;
  }
}
</script>
<style lang="sass">
.tooltip-btn
  $self: &
  display: flex
  justify-content: flex-end
  width: max-content
  &:hover
    #{ $self }__label
      box-shadow: var(--dp8)
  &:active
    #{ $self }__label
      background: var(--bg-base)
      color: var(--font-color)
  &__label
    height: 4.5rem
    cursor: pointer
    padding: 1.4rem 1.6rem
    border-radius: 1rem
    background: var(--bg-additional-2)
    margin-right: .4rem
    color: var(--font-active)
    user-select: none
    box-shadow: var(--dp6)
    display: flex
    align-items: center
    &:first-letter
      text-transform: capitalize
    &_disabled
      opacity: .6
  &__btn
    min-width: 4.5rem
</style>
