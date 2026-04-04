<template>
    <NuxtLink v-if="to" :to="to"
        class="h-12 flex justify-center items-center bg-primary rounded-full text-white text-base font-bold transition duration-300 py-3.5 px-6"
        :class="icon ? 'flex justify-center items-center gap-2' : ''">
        <Icon v-if="icon" :name="`material-symbols:${icon}`" class="w-6 h-6 shrink-0" />
        <slot />
    </NuxtLink>
    <button v-else :type="type" :disabled="disabled"
        class="h-12 flex justify-center items-center bg-primary rounded-full text-white text-base font-bold transition duration-300 py-3.5 px-6"
        :class="[disabled ? 'opacity-50 cursor-not-allowed' : '', icon ? 'flex justify-center items-center gap-2' : '']">
        <Icon v-if="icon" :name="`material-symbols:${icon}`" class="w-6 h-6 shrink-0" />
        <slot />
    </button>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'button'
    }
})
</script>