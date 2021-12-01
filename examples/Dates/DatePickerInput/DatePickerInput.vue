<template>
  <div
    class="date-picker-input"
    :class="{
      'date-picker-input_small': small
    }"
    v-on-clickaway="hide"
  >
    <!-- INPUT -->
    <div class="date-picker-input__input-wrapper" ref="input">
      <Input
        v-if="!button"
        v-model="_valueFormated"
        @focus="show"
        rightIcon="calendar"
        :small="small"
        type="date"
      />
      <Button v-else type="icon" icon="calendar" @click="show" />
    </div>

    <!-- DESKTOP PORTAL -->
    <div
      class="date-picker-input__picker-wrapper"
      :class="[`date-picker-input__picker-wrapper_${pickerPosition}`]"
      v-show="showRange && !mq({ $to: 'phablet' })"
      ref="dropdown"
      :style="styleDropdown"
    >
      <PortalTarget name="calendar"></PortalTarget>
    </div>

    <!-- MOBILE PORTAL-->
    <Popup
      v-if="mq({ $to: 'phablet' })"
      :show.sync="showRange"
      :footer="false"
      :paddings="false"
      @confirm="showRange = false"
    >
      <template v-slot:header-title>{{ _title }}</template>
      <template v-slot:body>
        <PortalTarget name="calendar"></PortalTarget>
      </template>
    </Popup>

    <!-- DatePicker INSTANCE-->
    <Portal to="calendar">
      <DatePicker
        :selectedDate.sync="_value"
        @select="hide"
        :clearBtn="clearBtn"
        :minDate="minDate"
        :maxDate="maxDate"
      />
    </Portal>
  </div>
</template>
<script lang="ts" src="./DatePickerInput.ts" />
<style lang="sass">
.date-picker-input
  $self: &
  position: relative
  width: fit-content
  @include mq($to: phablet)
    width: 100%
  &_small
    #{$self}__picker-wrapper
       top: 3.6rem
  &__input-wrapper
    display: flex
  &__picker-wrapper
    width: fit-content
    box-shadow: var(--dp16)
    border-radius: 1rem
    @include mq($to: phablet)
      width: 100%
    position: absolute
    top: 4.4rem
    z-index: 999
    &_bottom-left
      right: 0
    &_bottom-right
      left: 0
    .date-picker
      border-radius: 0 1rem 1rem 1rem
      &__period
        border-radius: initial
  input[type="date"]::-webkit-calendar-picker-indicator
    display: none
    -webkit-appearance: none
</style>
