<template>
    <button type="button" class="flex lg:hidden items-center justify-center cursor-pointer" aria-label="Abrir menú"
        @click="isOpen = true">
        <Icon name="material-symbols:menu-rounded" size="28" class="text-secondary" />
    </button>

    <Teleport to="body">
        <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="isOpen" class="fixed inset-0 z-20 bg-dark/30" @click="close" />
        </Transition>

        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-x-0" leave-to-class="translate-x-full">
            <div v-if="isOpen"
                class="w-full sm:max-w-sm fixed inset-y-0 right-0 z-20 bg-gradient-multi-vertical overflow-hidden pl-2">
                <div class="w-full h-full flex flex-col bg-white">
                    <div class="h-16 flex items-center justify-between p-4 sm:p-6">
                        <button v-if="nivel > 0" type="button"
                            class="w-6 h-6 flex items-center justify-center bg-secondary rounded-full cursor-pointer"
                            aria-label="Volver" @click="volver">
                            <Icon name="material-symbols:arrow-back-rounded" size="20" class="text-white" />
                        </button>
                        <span v-else />
                        <button type="button"
                            class="w-6 h-6 flex items-center justify-center bg-secondary rounded-full cursor-pointer"
                            aria-label="Cerrar menú" @click="close">
                            <Icon name="material-symbols:close-rounded" size="20" class="text-white" />
                        </button>
                    </div>

                    <div class="relative">
                        <Transition :enter-active-class="'transition duration-250 ease-out absolute inset-x-0'"
                            :enter-from-class="direccion === 'adelante' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'"
                            :enter-to-class="'translate-x-0 opacity-100'"
                            :leave-active-class="'transition duration-250 ease-in absolute inset-x-0'"
                            :leave-from-class="'translate-x-0 opacity-100'"
                            :leave-to-class="direccion === 'adelante' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'"
                            mode="out-in">
                            <div v-if="nivel === 0" key="nivel-0" class="flex flex-col gap-6 px-4 sm:px-6">
                                <nav class="flex flex-col">
                                    <button type="button"
                                        class="text-left text-sm font-bold text-secondary py-4 cursor-pointer"
                                        @click="irA(1)">
                                        Productos
                                    </button>
                                    <a href="https://unikegroup.com.ar" target="_blank"
                                        class="text-left text-sm font-bold text-secondary py-4 cursor-pointer">
                                        Somos Unike Group
                                    </a>
                                </nav>
                                <div class="flex justify-center">
                                    <NuxtImg src="/images/Logo-Murallon.svg" alt="Logo Murallon"
                                        class="w-48 h-6 object-contain" />
                                </div>
                            </div>

                            <div v-else-if="nivel === 1" key="nivel-1" class="flex flex-col gap-6 px-4 sm:px-6">
                                <nav class="flex flex-col gap-1">
                                    <p class="text-left text-sm font-bold text-secondary py-4">Por categoría</p>
                                    <button v-for="cat in categorias" :key="cat.nombre" type="button"
                                        class="text-left text-xs font-semibold text-dark py-4 cursor-pointer"
                                        @click="seleccionarCategoria(cat)">
                                        {{ cat.nombre }}
                                    </button>
                                </nav>
                                <div class="flex justify-center">
                                    <NuxtImg src="/images/Logo-Murallon.svg" alt="Logo Murallon"
                                        class="w-48 h-6 object-contain" />
                                </div>
                            </div>

                            <div v-else-if="nivel === 2 && categoriaActiva" key="nivel-2"
                                class="flex flex-col gap-6 px-4 sm:px-6">
                                <nav class="flex flex-col">
                                    <p class="text-left text-sm font-bold text-secondary py-4">Nuestras soluciones</p>
                                    <NuxtLink v-for="producto in categoriaActiva.productos" :key="producto.id"
                                        to="/productos"
                                        class="text-left text-xs font-semibold text-dark py-4 cursor-pointer"
                                        @click="close">
                                        {{ producto.nombre }}
                                    </NuxtLink>
                                </nav>
                                <div class="flex justify-center">
                                    <NuxtImg src="/images/Logo-Murallon.svg" alt="Logo Murallon"
                                        class="w-48 h-6 object-contain" />
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const { categorias, fetchMenuProductos } = useMenuProductos()

const isOpen = ref(false)
const nivel = ref(0)
const categoriaActiva = ref(null)
const direccion = ref('adelante')

function irA(n) {
    direccion.value = 'adelante'
    nivel.value = n
}

function seleccionarCategoria(cat) {
    direccion.value = 'adelante'
    categoriaActiva.value = cat
    nivel.value = 2
}

function volver() {
    direccion.value = 'atras'
    if (nivel.value === 2) {
        nivel.value = 1
        categoriaActiva.value = null
    } else if (nivel.value === 1) {
        nivel.value = 0
    }
}

function close() {
    isOpen.value = false
    nivel.value = 0
    categoriaActiva.value = null
}

watch(isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
    fetchMenuProductos()
})
</script>
