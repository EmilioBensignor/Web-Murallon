<template>
    <button type="button" role="switch" :aria-checked="modelValue" :aria-label="label"
        class="w-12 h-7 relative rounded-full transition-colors duration-300 cursor-pointer"
        :class="modelValue ? 'bg-secondary' : 'bg-gray-mid'" @click="$emit('update:modelValue', !modelValue)">
        <span class="w-5 h-5 absolute top-1 rounded-full bg-white shadow-1 transition-[left] duration-300"
            :class="modelValue ? 'left-6' : 'left-1'" />
    </button>
</template>

<script setup>
defineProps({
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>
