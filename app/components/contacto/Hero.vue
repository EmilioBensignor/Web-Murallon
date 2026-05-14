<template>
    <DefaultSection class="bg-primary" inner-class="md:flex-row-reverse gap-0">
        <picture class="w-full md:w-1/2 md:h-auto md:self-stretch flex">
            <NuxtImg src="/images/contacto/murallon_contacto_hero.webp" alt="Contacto Murallón"
                class="w-full h-50 md:h-80 lg:h-125 xxl:h-125 object-cover" />
        </picture>
        <div
            class="w-full md:w-1/2 flex flex-col md:justify-center items-center md:items-start gap-3 md:gap-4 lg:gap-6 xxl:gap-8 bg-primary text-center md:text-start text-white py-6 px-4 md:px-8 lg:px-16 xxl:px-0">
            <HeadingH1 class="max-w-60 md:max-w-full lg:max-w-90 uppercase">Información de contacto</HeadingH1>
            <p class="max-w-93 lg:max-w-110 xxl:max-w-146 lg:text-xl font-medium">
                Si tienes alguna duda o deseas más información sobre nuestros productos puedes escribirnos y nos
                pondremos a la brevedad
            </p>
            <NuxtLink v-if="whatsapp" :to="whatsapp" target="_blank"
                class="h-12 flex justify-center items-center gap-2 bg-terciary rounded-full text-primary text-base font-bold py-3.5 px-6">
                <NuxtImg src="/images/contacto/Logo-Whatsapp.svg" alt="Whatsapp" width="24" height="24"
                    class="shrink-0" />
                Escribinos por Whatsapp
            </NuxtLink>
        </div>
    </DefaultSection>
</template>

<script setup>
const whatsapp = 'https://wa.me/541144301616'
</script>
