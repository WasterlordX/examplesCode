<template>
  <div
    class="dropdown-btn"
    :class="{ 'dropdown-btn_bottom': dropDirection == 'bottom' }"
  >
    <Button
      class="dropdown-btn__toogle"
      :class="{ 'dropdown-btn__toogle_active': menuOpen }"
      :icon="__icon"
      :round="true"
      @click="toogleMenu"
      :background="menuOpen ? 'var(--grey)' : 'var(--primary)'"
      v-if="$slots.default"
    />
    <transition
      :name="dropDirection == 'bottom' ? 'dropdownBottom' : 'dropdownTop'"
    >
      <div class="dropdown-btn__menu" v-show="menuOpen">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';
import Button from '@/components/Buttons/Button/Button.vue';

@Component({
  components: {
    Button
  }
})
export default class DropdownBtn extends Vue {
  @Prop({ default: 'plus' }) icon!: string;

  @Prop({ default: 'close' }) closeIcon!: string;

  @Prop({ default: 'top' }) dropDirection!: string;

  menuOpen: boolean = false;

  @Provide()
  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get __icon() {
    return this.menuOpen ? this.closeIcon : this.icon;
  }

  get hasChilds() {
    return this.$slots.default;
  }
}
</script>
<style lang="sass">
.dropdown-btn
  $self: &
  position: relative
  display: flex
  flex-direction: column
  &_bottom
    flex-direction: column-reverse
    #{ $self }__menu
      bottom: 6.1rem
      top: initial
  &__toogle
    transition: 0.3s all ease-out
  &__menu
    display: flex
    flex-direction: column
    align-items: flex-end
    z-index: 50
    position: absolute
    right: 0
    top: 4.5rem
  &__item
    margin-top: 1.6rem
</style>
