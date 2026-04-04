<template>
    <div class="relative -mt-6 md:-mt-8 lg:-mt-12 xxl:-mt-16">
        <div class="bg-secondary text-white pt-6 md:pt-8 md:px-8 lg:px-16 pb-20 md:pb-21.5 lg:pb-35">
            <div class="max-w-326 flex flex-col md:flex-row md:justify-between items-center mx-auto">
                <HeadingH2 class="text-white uppercase">Nuestras soluciones</HeadingH2>
                <ButtonTerciary class="bg-transparent text-terciary underline">
                    Ver todos los productos
                </ButtonTerciary>
            </div>
        </div>
        <div class="md:hidden -mt-16">
            <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.4, tab: 2.8 }" :gap="16" :show-arrows="false"
                :show-dots="false">
                <NuxtLink v-for="card in soluciones" :key="card.titulo" to="#"
                    class="h-36 relative rounded-2xl overflow-hidden">
                    <NuxtImg :src="card.imagen" :alt="card.titulo" class="w-full h-full object-cover" />
                    <div class="flex items-center justify-center absolute inset-0 text-center p-6">
                        <h3 class="max-w-24 text-white font-bold uppercase">
                            {{ card.titulo }}
                        </h3>
                    </div>
                </NuxtLink>
            </CarouselStatic>
        </div>

        <div class="hidden md:block md:px-8 lg:px-16 -mt-17 lg:-mt-28">
            <div class="max-w-326 grid md:grid-cols-4 gap-4 mx-auto">
                <NuxtLink v-for="(card, index) in soluciones" :key="card.titulo" :to="card.to" :class="[
                    'h-35 lg:h-50 xxl:h-60 relative rounded-3xl overflow-hidden group',
                    index === soluciones.length - 1 ? 'col-span-2' : ''
                ]">
                    <NuxtImg :src="card.imagen" :alt="card.titulo" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-dark/40 group-hover:bg-dark/50 transition-colors" />
                    <div class="flex items-center justify-center absolute inset-0 mx-auto">
                        <h3 class="md:max-w-44 text-white lg:text-xl xxl:text-2xl font-bold uppercase text-center">
                            {{ card.titulo }}
                        </h3>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const soluciones = [
    {
        titulo: 'Prepará la superficie',
        imagen: '/images/home/soluciones/Prepara-la-superficie.png',
        to: '/productos/prepara-la-superficie'
    },
    {
        titulo: 'Renová tus espacios',
        imagen: '/images/home/soluciones/Renova-tus-espacios.png',
        to: '/productos/renova-tus-espacios'
    },
    {
        titulo: 'Protegé de la humedad',
        imagen: '/images/home/soluciones/Protege-la-humedad.png',
        to: '/productos/protege-de-la-humedad'
    }
]
</script>
