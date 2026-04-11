<template>
    <nav class="hidden lg:flex items-center gap-6">
        <div ref="dropdownRef" class="relative" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
            <button type="button" class="flex items-center gap-2.5 font-bold text-primary cursor-pointer">
                Productos
                <Icon name="material-symbols:keyboard-arrow-down-rounded" size="28" class="text-primary" />
            </button>

            <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2">
                <div v-if="isOpen"
                    class="min-w-72 flex gap-6 absolute top-full -left-20 z-20 pt-6">
                <div class="flex gap-6 bg-white rounded-3xl shadow-1 p-6">
                    <div class="flex flex-col shrink-0 w-max">
                        <p class="text-secondary font-bold p-4">Por categoría</p>
                        <button v-for="cat in categorias" :key="cat.nombre" type="button" :class="[
                            'text-left text-sm font-semibold hover:bg-gray-mid rounded-full transition-colors cursor-pointer p-4',
                            categoriaHover?.nombre === cat.nombre ? 'bg-gray-mid' : '',]"
                            @mouseenter="categoriaHover = cat" @click="categoriaHover = cat">
                            {{ cat.nombre }}
                        </button>
                    </div>

                    <div v-if="categoriaHover" class="flex flex-col shrink-0 w-max">
                        <p class="text-secondary font-bold p-4">Nuestras Soluciones</p>
                        <NuxtLink v-for="producto in categoriaHover.productos" :key="producto.id" to="/productos"
                            class="text-sm text-dark font-semibold p-4"
                            @click="isOpen = false">
                            {{ producto.nombre }}
                        </NuxtLink>
                    </div>
                </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup>
const { categorias, fetchMenuProductos } = useMenuProductos()

const dropdownRef = ref(null)
const isOpen = ref(false)
const categoriaHover = ref(null)

// Al cerrar, resetear categoría hover
watch(isOpen, (val) => {
    if (!val) {
        categoriaHover.value = null
    }
})

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false
    }
}

onMounted(() => {
    fetchMenuProductos()
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
