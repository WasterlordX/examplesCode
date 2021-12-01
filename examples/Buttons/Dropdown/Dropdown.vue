<template>
  <div class="btn-dropdown" v-on-clickaway="away">
    <li
      @click="toggleMenu()"
      class="dropdown-toggle active"
      :class="{ toggled: showMenu }"
      v-if="selectedOption"
    >
      <div class="wrapper-text">
        {{ selectedOption[optionName] }}
      </div>
    </li>
    <li
      @click="toggleMenu()"
      class="dropdown-toggle"
      v-if="!selectedOption"
      :class="{ toggled: showMenu }"
    >
      <div class="wrapper-text">
        {{ placeholderText }}
      </div>
    </li>
    <ul class="dropdown-menu" v-if="showMenu">
      <Option
        v-for="(option, index) in options"
        :key="`doption-${index}`"
        :selectedOption="selectedOption"
        :optionName="optionName"
        :option="option"
        :icon="icon"
        @updateOption="updateOption"
      />
      <li class="close-btn-wrapper" v-if="selectedOption">
        <button class="btn btn_secondary" @click="cancel">Отменить</button>
      </li>
    </ul>
  </div>
</template>
<style lang="sass">
.close-btn-wrapper
  display: flex
  justify-content: center
  align-items: center
  .btn
    width: 100%
    margin: 1rem
    padding: 1rem
</style>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { directive as onClickaway } from 'vue-clickaway';
import Option from './Option.vue';

@Component({
  components: {
    Option
  },
  directives: {
    onClickaway: onClickaway
  }
})
export default class Dropdown extends Vue {
  @Prop() options!: any[];
  @Prop() optionName!: string;
  @Prop() selected: any;
  @Prop() placeholder!: string;
  @Prop() icon!: string;

  @Emit('updateOption')
  updateOption(option: any) {
    this.selectedOption = option;
    this.showMenu = false;
    return this.selectedOption;
  }
  @Emit('cancel')
  cancel() {
    this.showMenu = false;
    return true;
  }

  @Watch('selected')
  onSelectedChanged(value: any) {
    this.selectedOption = value;
  }

  public selectedOption = {
    name: ''
  };
  public showMenu: boolean = false;
  public placeholderText = 'Выберите значение';

  public mounted() {
    this.selectedOption = this.selected;
    if (this.placeholder) {
      this.placeholderText = this.placeholder;
    }
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  public away() {
    this.showMenu = false;
  }
}
</script>
