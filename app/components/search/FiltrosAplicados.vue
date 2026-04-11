<template>
    <div class="flex flex-wrap items-center gap-2 bg-white">
        <span v-for="filtro in filtros" :key="filtro.key"
            class="flex items-center gap-2 border border-secondary rounded-full text-xs lg:text-sm text-secodnary font-medium p-2 pl-3">
            {{ filtro.label }}
            <button type="button" class="w-4 h-4 flex items-center justify-center rounded-full text-secondary"
                :aria-label="`Remover filtro ${filtro.label}`" @click="$emit('remove', filtro.key)">
                <Icon name="material-symbols:cancel-rounded" class="shrink-0" size="16" />
            </button>
        </span>
    </div>
</template>

<script setup>
defineProps({
    filtros: { type: Array, default: () => [] },
})

defineEmits(['remove', 'clear'])
</script>
