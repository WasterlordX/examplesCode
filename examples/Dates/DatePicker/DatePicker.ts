import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Moment } from 'moment';
import moment from 'moment';
import SvgIcon from '@/components/Icons/SvgIcon.vue';
import DayModel from './DayModel';
import Months from './Months.vue';
import Years from './Years.vue';
import TransitionFade from '@/components/Transitions/TransitionFade.vue';
import { Button } from '@/components/Buttons';

enum PickerViews {
  calendar = 'CALENDAR',
  months = 'MONTHS',
  years = 'YEARS'
}

@Component({
  components: {
    SvgIcon,
    Months,
    Years,
    TransitionFade,
    Button
  }
})
export default class DatePicker extends Vue {
  @Prop({ default: '' }) selectedDate!: string;

  @Prop({ default: '' }) from!: string;

  @Prop({ default: '' }) to!: string;

  @Prop({ default: false }) clearBtn!: boolean;

  @Prop() minDate?: string;

  @Prop() maxDate?: string;

  @Emit('update:selectedDate')
  updateSelectedDate(value: string) {
    return value;
  }

  @Emit('select')
  select(value: any) {
    return value;
  }

  @Watch('selectedDate')
  onSelectedDateChanged(value: string) {
    if (
      moment(value).isValid() &&
      !moment(value).isSame(this.dateContext, 'month')
    ) {
      this.dateContext = moment(value);
    }
  }

  public dateContext: Moment = moment();
  public today: Moment = moment();
  public weekDays: string[] = [];
  public activeView: PickerViews = PickerViews.calendar;
  public pickerViews = PickerViews;
  private countRows: number = 6;
  private daysPerRow: number = 7;
  $refs!: {
    viewsWrapper: InstanceType<typeof HTMLElement>;
    years: InstanceType<typeof HTMLElement>;
    months: InstanceType<typeof HTMLElement>;
  };

  public created() {
    const startOfWeek = moment().startOf('week');
    this.weekDays = Array(7)
      .fill(0)
      .map((n: any, index: number) => {
        return startOfWeek
          .clone()
          .add('day', index)
          .format('dd');
      });
  }

  prevMonth() {
    this.dateContext.subtract(1, 'month');
  }

  nextMonth() {
    this.dateContext.add(1, 'month');
  }

  selectDate(value: Moment) {
    this._selectedDate = value.format('YYYY-MM-DD');
    this.select(value);
  }

  openMonths() {
    this.activeView = PickerViews.months;
  }

  onSelectMonth(month: number) {
    this.activeView = PickerViews.calendar;
    this.dateContext = this.dateContext.clone().set('month', month - 1);
  }

  openYears() {
    this.activeView = PickerViews.years;
  }

  onSelectYear(year: number) {
    this.activeView = PickerViews.calendar;
    this.dateContext = this.dateContext.clone().set('year', year);
  }

  clear() {
    this._selectedDate = '';
    this.select('');
  }

  private createDay(date: Moment): DayModel {
    let dayDate = date.add(1, 'day').clone();
    let day = new DayModel({ date: dayDate });
    day.anotherMonth = !dayDate.isSame(this.dateContext, 'month');
    day.isToday = this.todayText == day.dateText;
    if (this.from && this.to) {
      day.fromPeriodDay = day.dateText == this.from;
      day.toPeriodDay = day.dateText == this.to;
      day.inPeriod = day.date.isBetween(this.from, this.to);
    }
    if (this.selectedDate) {
      day.isSelected = day.dateText == this.selectedDate;
    }
    if (this.minDate && this.maxDate) {
      day.isDisabled =
        moment(day.dateText).isBefore(this.minDate, 'day') ||
        moment(day.dateText).isAfter(this.maxDate, 'day')
          ? true
          : false;
    } else if (this.minDate) {
      day.isDisabled = moment(day.dateText).isBefore(this.minDate, 'day');
    } else if (this.maxDate) {
      day.isDisabled = moment(day.dateText).isAfter(this.maxDate, 'day');
    }
    return day;
  }

  get startDay() {
    return this.dateContext
      .clone()
      .startOf('month')
      .startOf('week');
  }

  get weeks() {
    const weeks: any = [];
    let date: Moment = this.startDay.clone().subtract(1, 'day');
    [...Array(this.countRows)].forEach(() => {
      weeks.push([...Array(this.daysPerRow)].map(() => this.createDay(date)));
    });
    return weeks;
  }

  get _selectedDate() {
    return this.selectedDate;
  }
  set _selectedDate(value: string) {
    this.updateSelectedDate(value);
  }

  get todayText() {
    return this.today.format('YYYY-MM-DD');
  }

  get month(): number {
    return this.dateContext.get('M') + 1;
  }

  get year(): number {
    return this.dateContext.get('year');
  }

  get heightViewsWrapper(): string {
    return this.mq({ $to: 'phablet' })
      ? this.$refs.viewsWrapper.clientHeight + 'px'
      : '100%';
  }
}
