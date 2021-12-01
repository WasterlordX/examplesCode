<template>
  <form @input="__input">
    <slot />
  </form>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import debounce from 'lodash.debounce';

@Component
export default class FormObserver extends Vue {
  @Prop({ default: 1000 }) inputDebounceTimeout!: number;

  @Emit('input')
  input(e: Event) {
    return e;
  }

  @Emit('input-debounce')
  inputDebounce(e: Event) {
    return e;
  }

  private debounceInput: any = debounce((e: Event) => {
    console.log('here', e);
    this.inputDebounce(e);
  }, this.inputDebounceTimeout);

  private __input(e: Event) {
    this.input(e);
    this.debounceInput(e);
  }
}
</script>
