<template>
  <div class="row-button">
    <div
      class="control d-flex align-items-center justify-between p-20"
      @click="handleClick"
    >
      <span class="control__title">{{ label }}</span>
      <div class="control__icon">
        <SvgIcon name="arrow"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/Icons/SvgIcon.vue';

@Component({
  components: {
    SvgIcon
  }
})
export default class RowButton extends Vue {
  @Prop({ default: '' }) label!: string;

  @Emit('handle-click')
  handleClick(e) {
    this.click(e);
  }

  @Emit('click')
  click(e) {
    return e;
  }
}
</script>
<style lang="sass">
.row-button

  .control
    box-shadow: var(--dp1)
    background-color: var(--bg-secondary)
    border-radius: var(--b-radius)
    height: 6rem
    .control__icon
      transform: rotate(-90deg)
      display: inline-block
</style>
