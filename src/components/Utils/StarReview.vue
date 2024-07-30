<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  maxStars: {
    type: Number,
    default: 5
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const rating = ref(props.modelValue)
const hoveredRating = ref(null)

const setRating = (value) => {
  if (!props.readOnly) {
    rating.value = value
    emits('update:modelValue', value)
  }
}

const hoverRating = (value) => {
  if (!props.readOnly) {
    hoveredRating.value = value
  }
}

const resetHover = () => {
  if (!props.readOnly) {
    hoveredRating.value = null
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    rating.value = newVal
  }
)
</script>

<template>
  <div class="star-rating">
    <span
      v-for="n in maxStars"
      :key="n"
      @click="setRating(n)"
      @mouseover="hoverRating(n)"
      @mouseleave="resetHover"
    >
      <svg
        v-if="n <= (hoveredRating || rating)"
        class="w-6 h-6 text-yellow-500 cursor-pointer"
        :class="{ 'cursor-default': readOnly }"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.285 3.947c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.36 2.44c-.785.57-1.84-.197-1.54-1.118l1.285-3.947a1 1 0 00-.364-1.118L2.66 8.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.284-3.947z"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-gray-300 cursor-pointer"
        :class="{ 'cursor-default': readOnly }"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.285 3.947c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.36 2.44c-.785.57-1.84-.197-1.54-1.118l1.285-3.947a1 1 0 00-.364-1.118L2.66 8.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.284-3.947z"
        />
      </svg>
    </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
}
.cursor-default {
  cursor: default;
}
</style>
