<template>
  <div class="photo-upload" :class="{ 'photo-upload_has-remove': hasRemove }">
    <div class="photo-upload__wrapper" :style="style">
      <transition-group name="fade">
        <!-- PRELOADER -->
        <div
          class="photo-upload__preloader"
          key="preloader"
          v-if="showProgress"
        >
          <progress class="pure-material-progress-circular" />
        </div>

        <!-- DEFAULT IMAGE -->
        <div
          class="photo-upload__default"
          :class="{ hasUpload }"
          v-if="!url && !imgLoaded && !showProgress"
          key="default"
        >
          <div class="default-photo"></div>
          <div class="upload-title">{{ $t('add') }}</div>
        </div>

        <!-- BROKEN IMAGE -->
        <div
          class="photo-upload__error-upload"
          :class="{ hasUpload }"
          v-if="errorUpload && !showProgress"
          key="default"
        >
          <template v-if="hasRemove">
            <div class="shadow"></div>
            <div class="mt-12 mr-12 remove-btn">
              <SvgIcon name="bin" @click="_remove" />
            </div>
          </template>
          <div class="default-photo"></div>
        </div>

        <!-- IMAGE -->
        <div
          v-if="img.src && imgLoaded && !showProgress"
          :class="{
            'photo-upload__src': true,
            'photo-upload__hover': isHovered,
            'size-cover': size == 'cover'
          }"
          :style="{ background: `url(${img.src})  50% 50% no-repeat` }"
          key="image"
        >
          <!-- SHADOW-TOP -->
          <div class="shadow" v-if="text"></div>
          <div
            class="mt-12 mr-12 remove-btn"
            v-if="(hasRemove || file) && !showProgress && removeInside"
          >
            <SvgIcon name="bin" @click="_remove" />
          </div>
        </div>
      </transition-group>
      <ValidationProvider
        rules="mimes:image/*"
        ref="provider"
        v-slot="{ errors }"
      >
        <input
          ref="input"
          v-if="hasUpload"
          class="photo-upload__file"
          type="file"
          name="фото"
          @change="processFile"
        />
        <span class="photo-upload__error">{{ $t(errors[0]) }}</span>
      </ValidationProvider>
    </div>
    <div
      class="mt-8"
      v-if="(hasRemove || file) && !showProgress && !removeInside"
    >
      <Button
        style="z-index: 30"
        type="secondary-tr"
        icon="bin"
        @click="_remove"
      >
        {{ $t('remove') }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts" src="./Photo.ts" />
<style lang="sass">
.photo, .photo-upload
  position: relative
  height: 100%
  width: 100%
  &__wrapper
    position: relative
    height: 100%
    width: 100%
  &__hover
    &:hover
      opacity: 0.7
  &__src
    position: absolute
    background-size: contain !important
    height: 100%
    width: 100%
    border-radius: 1rem
    &.size-cover
      background-size: cover !important
    &:hover
      .remove-btn
        opacity: 1
    .shadow
      border-radius: 1rem 1rem 0 0
      position: absolute
      width: 100%
      height: 5rem
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)
    .text
      position: absolute
      display: flex
      width: 100%
      height: 5rem
      justify-content: center
      opacity: 1
      &__bottom
        bottom: 0
        padding-bottom: 2rem
        align-items: bottom
      &__top
        top: 0
        padding-top: 2rem
        align-items: top
    .remove-btn
      position: absolute
      right: 0
      margin: 0
      cursor: pointer
      z-index: 50
      transition: all .25s
      opacity: 0
  &__preloader
    position: absolute
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    z-index: 1
  &__default
    position: absolute
    height: 100%
    width: 100%
    background-color: var(--primary-hover-transparent)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    border-radius: 1rem
    .default-photo
      display: flex
      justify-content: center
      align-items: center
      width: 6rem
      height: 6rem
      background: url('/icons/image-default.svg')
      background-size: contain
    .upload-title
      display: none
      font-size: 1.1rem
      color: var(--font-color)
    &.hasUpload
      .upload-title
        display: block
  &__error-upload
    position: relative
    display: flex
    justify-content: center
    align-items: center
    height: 100%
    background-color: var(--primary-hover-transparent)
    border-radius: 1rem
    &:hover
      .remove-btn
        opacity: 1
      .shadow
        opacity: 1
    .default-photo
      display: flex
      justify-content: center
      align-items: center
      width: 6rem
      height: 6rem
      background: url('/icons/image-default.svg')
      background-size: contain
    .shadow
      position: absolute
      top: 0
      width: 100%
      height: 5rem
      border-radius: 1rem 1rem 0 0
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)
      opacity: 0
    .remove-btn
      position: absolute
      top: 0
      right: 0
      margin: 0
      cursor: pointer
      z-index: 50
      transition: all .25s
      opacity: 0
  &__file
    position: absolute
    display: flex !important
    height: 100%
    width: 100%
    padding: 0
    opacity: 0
    cursor: pointer
  &__error
    color: var(--error)
    position: absolute
    bottom: -4rem
</style>
