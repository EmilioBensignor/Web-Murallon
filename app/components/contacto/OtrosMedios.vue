<template>
    <div class="relative -mt-6 md:-mt-8 lg:-mt-12 xxl:-mt-16">
        <div class="bg-secondary py-6 md:pt-8 md:px-8 lg:px-16 md:pb-24 lg:pb-35">
            <div class="max-w-326 mx-auto px-4 md:px-0">
                <HeadingH2 class="text-center md:text-left text-white uppercase">Otros medios de contacto</HeadingH2>
            </div>

            <div class="md:hidden flex flex-col gap-2 mt-6 px-4">
                <div v-for="medio in medios" :key="medio.titulo" class="w-full bg-gradient-multi rounded-3xl p-0.75">
                    <div
                        class="w-full h-full flex flex-col items-center text-center gap-3 bg-white rounded-[21px] py-6 px-4">
                        <p class="text-primary text-base font-bold uppercase">{{ medio.titulo }}</p>
                        <p class="text-xs text-dark font-medium">{{ medio.detalle }}</p>
                        <ButtonTerciary :to="medio.href" :target="medio.target" :icon="medio.icon">
                            {{ medio.cta }}
                        </ButtonTerciary>
                    </div>
                </div>
            </div>
        </div>

        <div class="hidden md:block md:px-8 lg:px-16 -mt-17 lg:-mt-28">
            <div class="max-w-326 grid md:grid-cols-3 gap-2 lg:gap-4 mx-auto">
                <div v-for="medio in medios" :key="medio.titulo" class="h-50 lg:h-60 bg-gradient-multi rounded-2xl p-0.75">
                    <div
                        class="w-full h-full flex flex-col justify-center items-center text-center gap-3 lg:gap-4 bg-white rounded-[13px] px-5 lg:px-6">
                        <p class="text-primary text-base lg:text-[1.75rem] font-bold uppercase">{{ medio.titulo }}</p>
                        <p class="text-sm lg:text-xl text-dark font-medium">{{ medio.detalle }}</p>
                        <ButtonTerciary :to="medio.href" :target="medio.target" :icon="medio.icon">
                            {{ medio.cta }}
                        </ButtonTerciary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const medios = [
    {
        titulo: 'Nuestro e-mail',
        detalle: 'info@unikegroup.com.ar',
        cta: 'Enviar un correo',
        icon: 'mail-outline-rounded',
        href: 'mailto:info@unikegroup.com.ar',
        target: null,
    },
    {
        titulo: 'Redes oficiales',
        detalle: '@murallonpinturas',
        cta: 'Escribinos al MD',
        icon: 'photo-camera-outline',
        href: 'https://www.instagram.com/murallonpinturas/',
        target: '_blank',
    },
    {
        titulo: 'Nuestras oficinas',
        detalle: 'Av. San Martín 2768, Lanús, Bs.As.',
        cta: 'Ver en maps',
        icon: 'location-on-outline',
        href: 'https://www.google.com/maps/search/?api=1&query=Av.+San+Mart%C3%ADn+2768%2C+Lan%C3%BAs%2C+Buenos+Aires',
        target: '_blank',
    },
]
</script>
