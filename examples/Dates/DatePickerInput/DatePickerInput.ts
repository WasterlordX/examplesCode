import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import Input from '@/components/FormControls/Input/Input.vue';
import DatePicker from '@/components/Dates/DatePicker/DatePicker.vue';
import moment from 'moment';
import { directive as onClickaway } from 'vue-clickaway';
import { Button } from '@/components/Buttons';

@Component({
  components: {
    Input,
    DatePicker,
    Popup: () => import('@/components/Popup/Popup.vue'),
    Button
  },
  directives: {
    onClickaway
  }
})
export default class DatePickerInput extends Vue {
  @Model('update:value') value!: string;

  @Prop({ default: '' }) title!: string;

  @Prop({ default: false }) small!: boolean;

  @Prop({ default: 'bottom-right' }) pickerPosition!: string;

  @Prop({ default: false }) clearBtn!: boolean;

  @Prop({ default: false }) button!: boolean;

  @Prop() minDate?: string;

  @Prop() maxDate?: string;

  @Emit('update:value')
  updateValue(value: string) {
    return value;
  }

  $refs!: {
    input: InstanceType<typeof HTMLElement>;
    dropdown: InstanceType<typeof HTMLElement>;
  };

  showRange: boolean = false;

  dropdownRight: string = 'initial';

  dropdownLeft: string = '0';

  dropdownTop: string = 'initial';

  dropdownVisibility = 'hidden';

  show() {
    if (this.mq({ $to: 'phablet' })) return;
    this.showRange = true;
    this.dropdownVisibility = 'hidden';
    setTimeout(() => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const { left, top } = this.$refs.input.getBoundingClientRect();
      const { clientHeight } = this.$refs.input;
      const dropdownHeight = this.$refs.dropdown.clientHeight;
      const dropdownWidth = this.$refs.dropdown.clientWidth;

      if (dropdownHeight + top + clientHeight > winHeight) {
        this.dropdownTop = `${-dropdownHeight - 4}px`;
      } else {
        this.dropdownTop = `${clientHeight}px`;
      }

      if (dropdownWidth + left > winWidth) {
        this.dropdownRight = '0';
        this.dropdownLeft = 'initial';
      } else {
        this.dropdownRight = 'initial';
        this.dropdownLeft = '0';
      }
      this.dropdownVisibility = 'visible';
    });
  }

  hide() {
    if (this.mq({ $from: 'tablet' })) this.showRange = false;
  }

  get _value() {
    return this.value;
  }
  set _value(value: string) {
    this.updateValue(value);
  }

  get _valueFormated() {
    return this._value;
  }
  set _valueFormated(value) {
    this._value = value;
  }

  get _title() {
    return this.title || this.$i18n.tc('chooseDate');
  }

  get styleDropdown() {
    return {
      visibility: this.dropdownVisibility,
      left: this.dropdownLeft,
      right: this.dropdownRight,
      top: this.dropdownTop
    };
  }
}
