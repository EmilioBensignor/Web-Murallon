<template>
    <footer class="bg-gradient-multi pt-2.5 mt-6 md:mt-8 lg:mt-12 xxl:mt-16">
        <div class="bg-white">
            <div class="w-full xxl:max-w-326 mx-auto">
                <div class="flex flex-col items-center gap-8 lg:gap-12 xxl:gap-16 py-6 md:py-8 lg:py-12">
                    <NuxtImg src="/images/Logo-Murallon.svg" alt="Logo Murallon" width="160" height="20"
                        class="md:w-64 lg:w-xl md:h-8 lg:h-18 object-contain" />
                    <div class="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 text-center text-primary">
                        <div v-for="seccion in secciones.filter(s => s.links?.length)" :key="seccion.titulo"
                            class="flex flex-col md:items-start gap-3">
                            <p class="lg:text-xl font-bold uppercase">{{ seccion.titulo }}</p>
                            <component v-for="link in seccion.links" :key="link.texto" :is="link.to ? 'NuxtLink' : 'a'"
                                v-bind="link.to ? { to: link.to } : { href: link.href, target: link.target }"
                                class="flex items-center justify-center gap-2.5 text-sm font-medium">
                                <Icon v-if="link.icon" :name="link.icon" size="20" />
                                <span class="text-sm lg:text-base font-medium" v-html="link.texto" />
                            </component>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 lg:gap-6">
                        <a v-for="red in redes" :key="red.nombre" :href="red.url" target="_blank"
                            rel="noopener noreferrer">
                            <NuxtImg :src="red.src" :alt="red.nombre" width="32" height="32" />
                        </a>
                    </div>
                    <NuxtLink to="https://www.benteveo.com" target="_blank"
                        class="text-sm lg:text-base text-primary font-medium">© Copyright {{ new Date().getFullYear() }}
                        Benteveo
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const secciones = [
    {
        titulo: 'Contacto',
        links: [
            { texto: '+54 (011) 4430-1616', href: 'tel:+541144301616', icon: 'material-symbols:phone-in-talk-outline-rounded' },
            { texto: 'info@unikegroup.com.ar', href: 'mailto:info@unikegroup.com.ar', icon: 'material-symbols:mail-outline-rounded' },
            { texto: 'Av. San Martín 2768, Lanús<br>Buenos Aires, Argentina', icon: 'material-symbols:location-on-outline-rounded' },
        ],
    },
    {
        titulo: 'Producto',
        links: [
            { texto: 'Catálogo', to: ROUTE_NAMES.PRODUCTOS },
        ],
    },
    // {
    //     titulo: 'Ayuda',
    //     links: [
    //         { texto: 'Preguntas Frecuentes', to: '/preguntas-frecuentes' },
    //         { texto: 'Distribuidores', to: '/distribuidores' },
    //         { texto: 'Nuestro Blog', to: '/blog' },
    //     ],
    // },
]

const redes = [
    { nombre: 'Instagram', src: '/images/redes/Logo-Instagram.svg', url: '#' },
    { nombre: 'Facebook', src: '/images/redes/Logo-Facebook.svg', url: '#' },
    { nombre: 'Youtube', src: '/images/redes/Logo-Youtube.svg', url: '#' },
    { nombre: 'LinkedIn', src: '/images/redes/Logo-LinkedIn.svg', url: '#' },
]
</script>