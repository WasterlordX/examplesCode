<template>
  <li @mouseover="isHovering = true" @mouseout="isHovering = false">
    <a
      href="javascript:void(0)"
      @click="updateOption"
      :class="{ selected: isSelected }"
    >
      <div class="icon mr-10" :class="compiledIconClass" v-if="icon" />
      <div>{{ option[optionName] }}</div>
    </a>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({})
export default class Option extends Vue {
  @Prop() selectedOption: any;
  @Prop() option: any;
  @Prop() optionName!: string;
  @Prop() icon!: string;

  @Emit('updateOption')
  updateOption(option: any) {
    return this.option;
  }

  private isHovering: boolean = false;

  get compiledIconClass() {
    if (!this.icon) {
      return null;
    }
    return this.isHovering || this.isSelected
      ? this.icon + '__hover'
      : this.icon;
  }
  get isSelected() {
    return this.selectedOption && this.selectedOption == this.option
      ? true
      : false;
  }
}
</script>
