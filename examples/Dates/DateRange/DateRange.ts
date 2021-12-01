import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import DatePicker from '../DatePicker/DatePicker.vue';
import Button from '@/components/Buttons/Button/Button.vue';
import moment, { Moment } from 'moment';

@Component({
  components: {
    DatePicker,
    Button
  }
})
export default class DateRange extends Vue {
  @Prop({ default: '' }) from!: string;

  @Prop({ default: '' }) to!: string;

  @Prop({ default: 'manual' }) periodMode!: string;

  @Prop() minDate?: string;

  @Prop() maxDate?: string;

  @Emit('update:from')
  updateFrom(value: string) {
    return value;
  }

  @Emit('update:to')
  updateTo(value: string) {
    return value;
  }

  @Emit('update:periodMode')
  updatePeriodMode(value: string) {
    return value;
  }

  @Emit('applyRange')
  applyRange() {
    return { to: this.to, from: this.from };
  }

  @Emit('reset')
  reset() {
    this.updateFrom('');
    this.updateTo('');
    this.updatePeriodMode('manual');
    return { to: this.to, from: this.from };
  }

  public periodModes: string[] = [
    'manual',
    'all',
    'week',
    'month',
    '4-weeks',
    'year'
  ];
  public activePeriodDate: string = 'from';

  public onSelect(value: Moment) {
    this._periodMode = 'manual';
  }

  __applyRange() {
    this.to == '' || this.from == '' ? this.reset() : this.applyRange();
  }

  get _from() {
    return this.from;
  }
  set _from(value: string) {
    if (!this._to) {
      this._to = value;
    }
    this.updateFrom(value);
  }
  get _fromFormated() {
    return this.from ? moment(this.from).format('DD.MM.YYYY') : '__.__.____';
  }
  get _to() {
    return this.to;
  }
  set _to(value: string) {
    this.updateTo(value);
  }
  get _toFormated() {
    return this.to ? moment(this.to).format('DD.MM.YYYY') : '__.__.____';
  }
  get selectedDate() {
    return this.activePeriodDate == 'from' ? this.from : this.to;
  }
  set selectedDate(value: string) {
    this.activePeriodDate == 'from' ? (this._from = value) : (this._to = value);
  }
  get _periodMode() {
    return this.periodMode;
  }
  set _periodMode(value: string) {
    switch (value) {
      case 'manual': {
        break;
      }
      case 'all': {
        this._to = '';
        this._from = '';
        break;
      }
      case 'week': {
        this._from = moment()
          .startOf('week')
          .format('YYYY-MM-DD');
        this._to = moment()
          .endOf('week')
          .format('YYYY-MM-DD');
        break;
      }
      case 'month': {
        this._from = moment()
          .startOf('month')
          .format('YYYY-MM-DD');
        this._to = moment()
          .endOf('month')
          .format('YYYY-MM-DD');
        break;
      }
      case '4-weeks': {
        this._from = moment()
          .subtract(4, 'weeks')
          .format('YYYY-MM-DD');
        this._to = moment().format('YYYY-MM-DD');
        break;
      }
      case 'year': {
        this._from = moment()
          .startOf('year')
          .format('YYYY-MM-DD');
        this._to = moment()
          .endOf('year')
          .format('YYYY-MM-DD');
        break;
      }
      case '12-month': {
        this._from = moment()
          .subtract(12, 'month')
          .format('YYYY-MM-DD');
        this._to = moment().format('YYYY-MM-DD');
        break;
      }
    }
    this.updatePeriodMode(value);
  }
}
