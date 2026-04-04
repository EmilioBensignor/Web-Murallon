<template>
    <div class="hidden md:flex gap-2">
        <button @click="$emit('prev')"
            class="w-12 h-12 flex justify-center items-center bg-terciary rounded-full cursor-pointer"
            aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="2.5rem" class="text-primary" />
        </button>
        <button @click="$emit('next')"
            class="w-12 h-12 flex justify-center items-center bg-terciary rounded-full cursor-pointer"
            aria-label="Siguiente">
            <Icon name="material-symbols:chevron-right-rounded" size="2.5rem" class="text-primary" />
        </button>
    </div>
</template>

<script setup>
defineEmits(['prev', 'next'])
</script>
