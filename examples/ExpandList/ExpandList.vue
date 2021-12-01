<template>
  <div class="expand-list mb-20" :class="{ 'open-block': isOpen }">
    <div class="expand-list__header lh" @click="isOpen = !isOpen">
      <span>{{ $t(label) }}</span>
      <SvgIcon
        name="arrow"
        :style="{ transform: isOpen ? 'rotate(-180deg)' : '' }"
      />
    </div>
    <transition name="open-block">
      <div class="expand-list__content" v-show="isOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SvgIcon from '@/components/Icons/SvgIcon.vue';

@Component({
  name: 'ExpandList',
  components: { SvgIcon }
})
export default class ExpandList extends Vue {
  @Prop({ default: 'componentDescription' }) label!: string;

  public isOpen: boolean = false;
}
</script>

<style lang="sass">
.expand-list
  width: 100%
  min-width: 50rem
  height: auto
  background-color: var(--bg-secondary)
  border-radius: 1rem
  display: flex
  flex-direction: column
  &__header
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
  &__content
    padding: .8rem 1.6rem
    width: 100%
    background-color: var(--bg-hover)
    color:  var(--font-color)
    border-radius:  0 0 1rem 1rem
.open-block-enter-active
  transition: all .3s ease
.open-block-enter, .open-block-leave-to
  opacity: .6
</style>
