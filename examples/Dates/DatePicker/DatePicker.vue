<template>
  <div class="date-picker">
    <div class="date-picker__wrapper">
      <div class="date-picker__header">
        <div class="date-picker__header_left" @click="openMonths">
          {{ dateContext.format('MMMM') }}
        </div>
        <div class="date-picker__header_right" @click="openYears">
          {{ dateContext.format('Y') }}
        </div>
      </div>
      <div class="date-picker__views-wrapper" ref="viewsWrapper">
        <transition-fade :group="true" class="date-picker__view">
          <!-- CALENDAR -->
          <div
            key="calendar"
            class="date-picker__calendar"
            v-if="activeView == pickerViews.calendar"
          >
            <div class="date-picker__weekdays weekdays">
              <div
                class="weekdays__item"
                v-for="(item, index) in weekDays"
                :key="`weekday-${index}`"
              >
                {{ item }}
              </div>
            </div>
            <div class="date-picker__days days">
              <div
                class="days__row"
                v-for="(week, index) in weeks"
                :key="`row-${index}`"
              >
                <div
                  class="days__item"
                  v-for="(day, index) in week"
                  :key="`day-${index}`"
                  :class="{
                    '--another-month': day.anotherMonth,
                    '--today': day.isToday,
                    '--in-period': day.inPeriod,
                    '--from-period-day': day.fromPeriodDay,
                    '--to-period-day': day.toPeriodDay,
                    '--selected': day.isSelected,
                    '--disabled': day.isDisabled
                  }"
                  @click="!day.isDisabled ? selectDate(day.date) : ''"
                >
                  {{ day.dayNum }}
                </div>
              </div>
            </div>
          </div>
          <!-- CALENDAR END -->

          <!-- MONTHS -->
          <Months
            key="months"
            v-if="activeView == pickerViews.months"
            @select="onSelectMonth"
            :month="month"
            ref="months"
            :style="{ height: heightViewsWrapper }"
          />

          <Years
            key="years"
            v-if="activeView == pickerViews.years"
            @select="onSelectYear"
            :year="year"
            ref="years"
            :style="{ height: heightViewsWrapper }"
          />
        </transition-fade>
      </div>
    </div>
    <div class="date-picker__buttons" v-if="clearBtn">
      <Button type="secondary" small="true" @click="clear">
        {{ $t('cancel') }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts" src="./DatePicker.ts" />
<style lang="sass" src="./DatePicker.sass" />
