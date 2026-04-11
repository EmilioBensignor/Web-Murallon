<template>
    <component :is="htmlFor ? 'label' : 'p'" :for="htmlFor || undefined" class="text-sm lg:text-base text-gray-dark font-semibold">
        <slot />
    </component>
</template>

<script setup>
defineProps({
    htmlFor: { type: String, default: '' },
})
</script>
