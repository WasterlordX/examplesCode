<template>
  <div class="mb-10 action-button__wrapper d-flex align-items-center">
    <div class="action-button" @click="onClick">
      <SvgIcon color="var(--btn-primary-hover-bg)" :name="icon" />
    </div>
    <div class="action-button__label" style="order: -1">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import SvgIcon from '@/components/Icons/SvgIcon.vue';

@Component({
  components: {
    SvgIcon
  }
})
export default class ActionButton extends Vue {
  @Prop() icon!: string;
  @Prop() label!: string;

  @Emit('click')
  onClick() {
    return;
  }
}
</script>
