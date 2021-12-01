<template>
  <div
    class="collapse-list"
    :class="{
      'content-collapse': isCollapsed,
      'content-collapsed': !isCollapsed
    }"
  >
    <div class="collapse collapse-btn" @click="isCollapsed = !isCollapsed">
      <span class="collapse-btn__text">{{ header }}</span>
      <div
        class="icon icon_arrow-vert"
        :class="{ ' ': isCollapsed, icon_revert: !isCollapsed }"
      ></div>
    </div>
    <div
      class="collapse__content"
      :class="{
        'content-collapse': isCollapsed,
        'content-collapsed': !isCollapsed
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

@Component
export default class CollapseList extends Vue {
  @Prop() private header!: string;
  @Prop({ default: true }) triggerCollapsed!: boolean;

  @Emit('update:triggerCollapsed')
  updateValue(value: boolean) {
    return value;
  }

  @Watch('isCollapsed')
  onIsCollapsedCahnged() {
    this.updateValue(this.isCollapsed);
  }

  @Watch('triggerCollapsed')
  onTriggerCollapseChanged() {
    this.isCollapsed = this.triggerCollapsed ? true : false;
  }

  public isCollapsed: boolean = true;

  public created() {
    this.isCollapsed = this.triggerCollapsed ? true : false;
  }
}
</script>
