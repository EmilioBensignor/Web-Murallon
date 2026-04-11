<template>
    <div class="flex flex-col items-center gap-6 bg-primary rounded-3xl text-white text-center p-6 md:p-8 lg:p-12">
        <HeadingH2 class="text-white max-w-88 lg:max-w-full">
            No encontramos productos que coincidan con tu búsqueda.
        </HeadingH2>
        <p class="text-sm lg:text-base font-medium max-w-lg">
            Probá con menos filtros o restablecé la búsqueda para ver todos los productos.
        </p>
        <ButtonTerciary @click="$emit('clear-filters')">
            Restablecer filtros
        </ButtonTerciary>
    </div>
</template>

<script setup>
defineEmits(['clear-filters'])
</script>
