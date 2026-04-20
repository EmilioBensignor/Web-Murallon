<template>
    <DefaultSection class="pt-6 md:pt-8 md:px-8 lg:pt-12 xxl:pt-16 xxl:px-16" :style="heroStyle"
        inner-class="flex flex-col md:justify-between md:flex-row gap-6 md:gap-12 lg:gap-12 xxl:gap-16">
        <div class="flex flex-col gap-3 md:hidden px-4">
            <span v-if="tipoAplicacionLabel" :style="{ backgroundColor: colorProducto || undefined }"
                class="h-12 flex items-center self-start rounded-full text-white text-sm font-bold uppercase py-2 px-4">
                {{ tipoAplicacionLabel }}
            </span>
            <HeadingH1 class="text-secondary uppercase">{{ producto.nombre }}</HeadingH1>
            <p v-if="producto.descripcion" class="text-sm font-medium" v-html="producto.descripcion" />
        </div>

        <div class="md:w-1/2 flex flex-col gap-3 lg:gap-4">
            <div class="flex sm:justify-center items-center relative px-4 md:px-0">
                <button v-if="imagenes.length > 1" type="button" aria-label="Anterior"
                    class="w-12 h-12 flex justify-center items-center absolute left-4 md:left-0 z-10 bg-terciary rounded-full text-primary shadow-1 cursor-pointer"
                    @click="prev">
                    <Icon name="material-symbols:arrow-back-rounded" size="24" />
                </button>

                <div
                    class="w-full sm:w-1/2 lg:w-[65%] xxl:w-[70%] aspect-square lg:aspect-square flex items-center justify-center overflow-hidden">
                    <NuxtImg :src="imagenActualUrl" :alt="producto.nombre"
                        class="w-full h-full object-contain transition-opacity duration-300" />
                </div>

                <button v-if="imagenes.length > 1" type="button" aria-label="Siguiente"
                    class="w-12 h-12 flex justify-center items-center absolute right-4 md:right-0 z-10 bg-terciary rounded-full text-primary shadow-1 cursor-pointer"
                    @click="next">
                    <Icon name="material-symbols:arrow-forward-rounded" size="24" />
                </button>
            </div>

            <CarouselStatic v-if="imagenes.length > 1" :gap="8"
                :slides-per-view="{ base: 4, sm: 4, tab: 4, md: 4, lg: 4.2, xl: 5, xxl: 5 }" :show-arrows="false"
                :show-dots="false">
                <button v-for="(img, index) in imagenes" :key="index" type="button" :class="[
                    'aspect-square rounded-xl overflow-hidden p-0.5 transition-all duration-300 cursor-pointer',
                    index === imagenActiva ? 'bg-gradient-multi' : 'bg-transparent',
                ]" @click="imagenActiva = index">
                    <div class="w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center"
                        :class="index === imagenActiva ? 'bg-light' : 'bg-transparent'">
                        <NuxtImg :src="getImageUrl(img)" :alt="`${producto.nombre} ${index + 1}`"
                            class="w-full h-full object-contain" />
                    </div>
                </button>
            </CarouselStatic>
        </div>

        <div class="md:w-1/2 flex flex-col gap-6 lg:gap-8 px-4 md:px-0">
            <div class="hidden md:flex flex-col gap-3 lg:gap-4">
                <span v-if="tipoAplicacionLabel" :style="{ backgroundColor: colorProducto || undefined }"
                    class="h-12 flex items-center self-start rounded-full text-white text-sm lg:text-base font-bold uppercase py-2 px-4">
                    {{ tipoAplicacionLabel }}
                </span>
                <HeadingH1 class="text-secondary uppercase">{{ producto.nombre }}</HeadingH1>
                <p v-if="producto.descripcion" class="text-sm lg:text-base font-medium" v-html="producto.descripcion" />
            </div>

            <div class="flex flex-col md:flex-row md:flex-wrap gap-4 lg:gap-8">
                <div v-if="producto.tamanos_disponibles?.length" class="flex flex-col gap-4">
                    <HeadingH3 class="text-secondary uppercase">Tamaños</HeadingH3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tamano in producto.tamanos_disponibles" :key="tamano"
                            class="w-12 h-12 flex justify-center items-center bg-gray-mid rounded-full text-secondary text-sm lg:text-base font-bold">
                            {{ tamano }}
                        </span>
                    </div>
                </div>

                <div v-if="producto.uso?.length" class="flex flex-col gap-4">
                    <HeadingH3 class="text-secondary uppercase">Usos</HeadingH3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="u in producto.uso" :key="u"
                            class="h-12 flex justify-center items-center bg-gray-mid rounded-full text-secondary text-sm lg:text-base font-bold uppercase px-6">
                            {{ u }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col xxl:flex-row lg:items-start gap-2 xxl:gap-4">
                <ButtonTerciary icon="store-outline-rounded">
                    <span class="md:hidden">Encontrá tu distribuidor</span>
                    <span class="hidden md:inline">Encontrá tu distribuidor más cercano</span>
                </ButtonTerciary>
                <ButtonPrimary to="https://wa.me/" target="_blank">
                    <NuxtImg src="/images/redes/Logo-Whatsapp.svg" alt="WhatsApp" class="w-6 h-6 shrink-0" />
                    Contactate
                </ButtonPrimary>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const props = defineProps({
    producto: { type: Object, required: true },
    getImageUrl: { type: Function, required: true },
})

const imagenes = computed(() => {
    const galeria = Array.isArray(props.producto.galeria_imagenes)
        ? props.producto.galeria_imagenes
        : []
    return [props.producto.imagen_principal, ...galeria].filter(Boolean)
})

const imagenActiva = ref(0)

const imagenActualUrl = computed(() =>
    props.getImageUrl(imagenes.value[imagenActiva.value])
)

const tipoAplicacionLabel = computed(() =>
    props.producto.tipo_aplicacion?.nombre || ''
)

const colorProducto = computed(() => {
    const color = props.producto.codigo_color_card
    return color ? `#${color}` : ''
})

const heroStyle = computed(() => {
    const color = props.producto.codigo_color_card
    if (!color) return {}
    const r = parseInt(color.slice(0, 2), 16)
    const g = parseInt(color.slice(2, 4), 16)
    const b = parseInt(color.slice(4, 6), 16)
    return {
        backgroundImage: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.33) 0%, rgba(249, 249, 249, 0) 66%)`,
    }
})

function prev() {
    if (!imagenes.value.length) return
    imagenActiva.value = (imagenActiva.value - 1 + imagenes.value.length) % imagenes.value.length
}

function next() {
    if (!imagenes.value.length) return
    imagenActiva.value = (imagenActiva.value + 1) % imagenes.value.length
}
</script>
