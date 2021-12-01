<template>
  <div class="date-range">
    <div class="date-range__active-zone">
      <div class="date-range__period">
        <div
          class="date-range__period__item"
          :class="{ '--active': activePeriodDate == 'from' }"
          @click="activePeriodDate = 'from'"
        >
          <span class="name">{{ $t('from') }}</span>
          <span class="value">{{ _fromFormated }}</span>
        </div>
        <div
          class="date-range__period__item"
          :class="{ '--active': activePeriodDate == 'to' }"
          @click="activePeriodDate = 'to'"
        >
          <span class="name">{{ $t('to') }}</span>
          <span class="value">{{ _toFormated }}</span>
        </div>
      </div>

      <!-- PERIOD MODES MOBILE -->
      <div
        class="date-range__period-modes-mobile"
        v-if="breakpoint('mobile', 'phablet')"
      >
        <div
          class="date-range__period-modes-mobile__item"
          v-for="(item, index) in periodModes"
          :key="`pm-${index}`"
          @click="_periodMode = item"
        >
          <div
            class="date-range__period-modes-mobile__item__inner"
            :class="{ '--active': _periodMode == item }"
          >
            {{ $t(item) }}
          </div>
        </div>
      </div>

      <!-- DATEPICKER -->
      <div class="date-range__picker">
        <DatePicker
          :from.sync="_from"
          :to.sync="_to"
          :selectedDate.sync="selectedDate"
          @select="onSelect"
          :minDate="minDate"
          :maxDate="maxDate"
        />
      </div>
      <div class="date-range__controls">
        <Button :label="$t('apply')" @click="__applyRange" />
        <Button
          class="ml-20"
          :label="$t('cancel')"
          type="secondary"
          @click="reset"
        />
      </div>
    </div>

    <!-- PERIOD MODES DESKTOP -->
    <div
      class="date-range__period-modes"
      v-if="breakpoint('desktop', 'tablet')"
    >
      <div
        class="date-range__period-modes__item"
        :class="{ '--active': _periodMode == item }"
        v-for="(item, index) in periodModes"
        :key="`pm-${index}`"
        @click="_periodMode = item"
      >
        {{ $t(item) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./DateRange.ts" />
<style lang="sass" src="./DateRange.sass" />
