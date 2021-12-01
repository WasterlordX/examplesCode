<template>
  <div
    class="btn-sort"
    :class="{
      active: currentSortBy == sortBy,
      desc: sortDir == 'DESC'
    }"
    @click="change"
  >
    <span class="wrapper-text">
      <slot></slot>
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class ButtonSort extends Vue {
  @Prop() currentSortBy!: string;
  @Prop() sortBy!: string;

  @Emit('change')
  change() {
    if (this.sortDir) {
      this.sortDir = this.availableDirections.find(
        (i: any) => i != this.sortDir
      );
    }
    return { sortBy: this.sortBy, sortDir: this.sortDir };
  }
  @Watch('currentSortBy')
  onCurrentSortByChanged() {
    if (this.currentSortBy != this.sortBy) {
      this.sortDir = 'ASC';
    }
  }

  public sortDir: string = 'ASC';
  public availableDirections: any[] = ['ASC', 'DESC'];

  public created() {
    if (!this.sortDir) {
      this.sortDir = this.availableDirections[0];
    }
  }

  get _sortDir() {
    return this.sortDir;
  }
}
</script>
