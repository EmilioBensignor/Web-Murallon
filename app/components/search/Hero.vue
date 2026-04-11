<template>
    <DefaultSection class="relative" inner-class="xxl:max-w-full">
        <picture class="w-full">
            <source media="(min-width: 1440px)" srcset="/images/search/Hero-Murallon-Productos-1440.png" width="1440"
                height="384" />
            <source media="(min-width: 1080px)" srcset="/images/search/Hero-Murallon-Productos-1080.png" width="1080"
                height="505" />
            <source media="(min-width: 768px)" srcset="/images/search/Hero-Murallon-Productos-768.png" width="768"
                height="256" />
            <NuxtImg src="/images/search/Hero-Murallon-Productos-mobile.png" alt="Productos Murallon"
                class="w-full min-h-64 lg:min-h-126 object-cover" />
        </picture>
        <div
            class="flex flex-col justify-center md:justify-end items-center gap-4 md:gap-6 lg:gap-8 absolute inset-0 bg-linear-to-b from-transparent to-secondary md:pb-26 lg:pb-33 xxl:pb-38">
            <HeadingH1 class="max-w-56 md:max-w-full text-center text-white uppercase">
                Todo para renovar tus espacios
            </HeadingH1>

            <div class="w-full md:hidden absolute -bottom-20">
                <CarouselStatic :slides-per-view="{ base: 1.6, sm: 2.5, tab: 2.8 }" :show-arrows="false"
                    :show-dots="false">
                    <button v-for="card in soluciones" :key="card.titulo" type="button" :class="[
                        'h-36 relative rounded-3xl group cursor-pointer border-3 transition-colors duration-300',
                        solucionActiva === card.filtro ? 'border-terciary' : 'border-transparent',
                    ]" @click="$emit('filtrar', card.filtro)">
                        <div class="w-full h-full rounded-2xl overflow-hidden relative">
                            <NuxtImg :src="card.imagen" :alt="card.titulo"
                                class="w-full h-full object-cover rounded-[20px]" />
                            <div
                                :class="['absolute inset-0 transition-colors duration-300', solucionActiva === card.filtro ? 'bg-terciary/30' : '']" />
                            <div class="flex items-center justify-center absolute inset-0 text-center p-3">
                                <p class="text-white font-bold uppercase drop-shadow-md">
                                    {{ card.titulo }}
                                </p>
                            </div>
                        </div>
                    </button>
                </CarouselStatic>
            </div>

            <div
                class="w-full max-w-176 lg:max-w-238 xxl:max-w-325 hidden md:grid md:grid-cols-3 gap-2 lg:gap-4 absolute -bottom-18 lg:-bottom-24 xxl:-bottom-32 px-8 lg:px-0">
                <button v-for="card in soluciones" :key="card.titulo" type="button" :class="[
                    'lg:w-76 xxl:w-106 md:h-36 lg:h-50 xxl:h-60 relative rounded-3xl group cursor-pointer border-3 transition-colors duration-300',
                    solucionActiva === card.filtro ? 'border-terciary' : 'border-transparent',
                ]" @click="$emit('filtrar', card.filtro)">
                    <div class="w-full h-full rounded-2xl overflow-hidden relative">
                        <NuxtImg :src="card.imagen" :alt="card.titulo"
                            class="w-full h-full object-cover rounded-[20px]" />
                        <div
                            :class="['absolute inset-0 transition-colors duration-300', solucionActiva === card.filtro ? 'bg-terciary/30' : '']" />
                        <div class="flex items-center justify-center absolute inset-0">
                            <p
                                class="max-w-36 lg:max-w-64 text-white lg:text-[1.75rem] font-bold uppercase text-center drop-shadow-md">
                                {{ card.titulo }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
defineProps({
    solucionActiva: { type: String, default: '' },
})

defineEmits(['filtrar'])

const soluciones = [
    {
        titulo: 'Prepará la superficie',
        imagen: '/images/home/soluciones/murallon_soluciones_preparar_1376.webp',
        filtro: 'prepara',
    },
    {
        titulo: 'Renová tus espacios',
        imagen: '/images/home/soluciones/murallon_soluciones_renovar_1376.webp',
        filtro: 'renova',
    },
    {
        titulo: 'Protegé de la humedad',
        imagen: '/images/home/soluciones/murallon_soluciones_proteger_1376.webp',
        filtro: 'protege',
    },
]
</script>
