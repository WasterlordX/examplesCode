<template>
  <button
    class="btn"
    :class="{
      btn_disabled: disabled,
      btn_primary: type == 'primary',
      btn_secondary: type == 'secondary',
      btn_danger: type == 'danger',
      btn_success: type == 'success',
      'btn_secondary-tr': type == 'secondary-tr',
      'btn_secondary-tr btn_secondary-tr_low': type == 'secondary-tr-low',
      'btn_primary-tr': type == 'primary-tr',
      btn_big: big,
      btn_round: round,
      'btn_has-label': label || $slots.default,
      btn_icon: type == 'icon',
      btn_shadow: shadow
    }"
    :style="cssProps"
    @click="click"
    :disabled="disabled"
    :title="title"
  >
    <svg-icon
      v-if="icon"
      class="btn__icon"
      :class="{ 'svg-icon_disabled': disabled }"
      :size="iconSize"
      :name="icon"
      :color="_iconColor"
      :hoverColor="_iconHoverColor"
    />
    <slot />
    {{ label }}
    <svg-icon
      v-if="iconRight"
      class="btn__icon"
      :class="{ 'svg-icon_disabled': disabled }"
      :name="iconRight"
      :color="_iconColor"
      :style="{ marginLeft: `1rem`, marginRight: `0rem` }"
      :hoverColor="_iconHoverColor"
    />
  </button>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({
  name: 'Button',
  components: {
    SvgIcon: () => import('@/components/Icons/SvgIcon.vue')
  }
})
export default class Button extends Vue {
  @Prop({ default: 'primary' }) type?: string; // цвет кнопки

  @Prop({ default: '' }) label?: string;

  @Prop() icon?: string;

  @Prop() iconRight?: string;

  @Prop({ default: false }) big?: boolean; // большая/маленькая кнопка

  @Prop({ default: false }) disabled?: boolean;

  @Prop({ default: undefined }) width?: number | string;

  @Prop({ default: false }) round?: boolean;

  @Prop() background?: string;

  @Prop() iconSize?: number;

  @Prop() fontColor!: string;

  @Prop({ default: 'var(--font-color)' }) iconColor!: string;

  @Prop({ default: 'var(--font-active)' }) iconHoverColor!: string;

  @Prop() fullHover?: string;

  @Prop({ default: '' }) iconPrimeColor!: string;

  @Prop({ default: false }) shadow!: boolean;

  @Prop({ default: '' }) title!: string;

  @Prop({ default: false }) debounce!: boolean;

  @Prop({ default: 250 }) debounceTimeout!: number;

  @Emit('click')
  click($event: any) {
    return $event;
  }

  fontColorDefault: string = 'var(--btn-primary-text-color)';

  // onClick($event) {
  //   return this.debounce ? this.debounceClick($event) : this.click($event);
  // }

  // private debounceClick: any = debounce($event => {
  //   this.click($event);
  // }, this.debounceTimeout);

  get _iconColor(): string {
    if (this.iconPrimeColor) {
      return this.iconPrimeColor;
    }
    if (
      this.type == 'primary' ||
      this.type == 'success' ||
      this.type == 'danger'
    ) {
      return 'var(--btn-primary-hover-bg)';
    }
    return this.iconColor;
  }

  get _iconHoverColor(): string {
    if (this.iconPrimeColor) {
      return this.iconPrimeColor;
    }
    return this.iconHoverColor;
  }

  get __fontColor() {
    if (this.fontColor) {
      return this.fontColor;
    }
    if (this.type == 'secondary-tr' || this.type == 'secondary-tr-low') {
      return 'var(--font-color)';
    }
    return this.fontColorDefault;
  }

  get cssProps() {
    return [
      ...[{ '--button-font-color': this.__fontColor }],
      ...[this.background ? { background: this.background } : null],
      ...[
        this.width !== undefined
          ? {
              width:
                typeof this.width == 'number' ? `${this.width}rem` : this.width
            }
          : null
      ]
    ];
  }
}
</script>
<style lang="sass" src="./Button.sass" />
