<template>
    <section class="w-full">
        <div class="w-full xxl:max-w-326 flex flex-col mx-auto"
            :class="innerClass || 'items-center gap-3 md:gap-4 lg:gap-6 xxl:gap-8'">
            <slot />
        </div>
    </section>
</template>

<script setup>
defineProps({
    innerClass: {
        type: String,
        default: '',
    },
})
</script>