<template>
    <div class="flex flex-col gap-2 px-1">
        <div class="flex items-center justify-between">
            <span class="text-xs lg:text-sm font-bold text-primary-default">{{ prefix }}{{ modelValue[0] }}{{ suffix ? ' ' + suffix : '' }}</span>
            <span class="text-xs lg:text-sm font-bold text-primary-default">{{ prefix }}{{ modelValue[1] }}{{ modelValue[1] >= max ? '+' : '' }}{{ suffix ? ' ' + suffix : '' }}</span>
        </div>

        <div class="relative h-6 flex items-center" ref="trackContainer">
            <div class="absolute inset-x-0 h-1 bg-secondary rounded-full"></div>
            <div class="h-0.5 absolute bg-primary-default rounded-full" :style="activeTrackStyle"></div>

            <input type="range" :min="min" :max="max" :step="step" :value="modelValue[0]"
                class="range-thumb absolute inset-x-0" :aria-label="`Valor mínimo: ${prefix}${modelValue[0]}`"
                @input="onMinInput" />

            <input type="range" :min="min" :max="max" :step="step" :value="modelValue[1]"
                class="range-thumb absolute inset-x-0" :aria-label="`Valor máximo: ${prefix}${modelValue[1]}`"
                @input="onMaxInput" />
        </div>

        <div class="flex items-center justify-between text-xs lg:text-sm text-gray-orange font-medium">
            <span>{{ prefix }}{{ min }}{{ suffix ? ' ' + suffix : '' }}</span>
            <span>{{ prefix }}{{ max }}{{ suffix ? ' ' + suffix : '' }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    modelValue: { type: Array, required: true },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const activeTrackStyle = computed(() => {
    const range = props.max - props.min
    if (range === 0) return { left: '0%', width: '0%' }
    const left = ((props.modelValue[0] - props.min) / range) * 100
    const right = ((props.modelValue[1] - props.min) / range) * 100
    return {
        left: `${left}%`,
        width: `${right - left}%`,
    }
})

function onMinInput(event) {
    const val = Number(event.target.value)
    const clamped = Math.min(val, props.modelValue[1])
    emit('update:modelValue', [clamped, props.modelValue[1]])
}

function onMaxInput(event) {
    const val = Number(event.target.value)
    const clamped = Math.max(val, props.modelValue[0])
    emit('update:modelValue', [props.modelValue[0], clamped])
}
</script>

<style scoped>
.range-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: transparent;
    pointer-events: none;
    outline: none;
    margin: 0;
}

.range-thumb::-webkit-slider-thumb {
    width: 1rem;
    height: 1rem;
    position: relative;
    z-index: 1;
    border-radius: 50%;
    background: white;
    border: 1px solid #002891;
    cursor: pointer;
    pointer-events: auto;
    -webkit-appearance: none;
    appearance: none;
}

.range-thumb::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: white;
    border: 1px solid #002891;
    cursor: pointer;
    pointer-events: auto;
}

.range-thumb::-moz-range-track {
    background: transparent;
    border: none;
}
</style>
