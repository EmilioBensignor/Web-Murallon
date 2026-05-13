<template>
    <DefaultSection inner-class="items-start gap-3 md:gap-6 xxl:gap-8" class="px-4 md:px-8 lg:px-16">
        <HeadingH2 class="w-full text-center md:text-left text-primary uppercase">Preguntas Frecuentes</HeadingH2>

        <div class="w-full flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 xxl:gap-12">
            <div class="flex flex-col gap-3 lg:gap-4">
                <FaqAccordion v-for="(faq, index) in primeraColumna" :key="index" :faq="faq" />
            </div>
            <div class="flex flex-col gap-3 lg:gap-4">
                <FaqAccordion v-for="(faq, index) in segundaColumna" :key="index" :faq="faq" />
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const faqs = [
    {
        pregunta: '¿Qué tipo de pinturas fabrican?',
        respuesta: 'Fabricamos pinturas látex (interior/exterior), esmaltes sintéticos, impermeabilizantes, barnices y recubrimientos especiales.'
    },
    {
        pregunta: '¿Cuál es la diferencia entre pintura para interior y exterior?',
        respuesta: 'La de exterior tiene mayor resistencia a la intemperie, rayos UV y humedad.'
    },
    {
        pregunta: '¿Cuántos metros cuadrados cubre un litro de pintura?',
        respuesta: 'Depende de la superficie, pero en promedio cubre entre 8 y 12 m² por mano.'
    },
    {
        pregunta: '¿Cuánto tiempo tarda en secar?',
        respuesta: 'Secado al tacto: 1–2 horas. Secado total: entre 4 y 24 horas según el producto.'
    },
    {
        pregunta: '¿Se puede aplicar sobre cualquier superficie?',
        respuesta: 'No. La superficie debe estar limpia, seca y preparada (lijada o con sellador si hace falta).'
    },
    {
        pregunta: '¿Hacen colores personalizados?',
        respuesta: 'Sí, contamos con sistema de entonado para crear colores a medida.'
    },
    {
        pregunta: '¿Qué preparación necesita la pared antes de pintar?',
        respuesta: 'Eliminar polvo, grasa, pintura vieja floja y reparar imperfecciones.'
    },
    {
        pregunta: '¿La pintura es lavable?',
        respuesta: 'Sí, ofrecemos líneas lavables de alta resistencia para interiores.'
    },
    {
        pregunta: '¿Hacen envíos o venta directa al público?',
        respuesta: 'Sí, vendemos a particulares y distribuidores, con opción de entrega.'
    },
    {
        pregunta: '¿Qué rendimiento tiene un balde de 20 litros?',
        respuesta: 'Aproximadamente entre 160 y 240 m² por mano, según superficie.'
    },
    {
        pregunta: '¿Brindan asesoramiento técnico?',
        respuesta: 'Sí, ofrecemos asesoramiento para elección y aplicación del producto.'
    }
]

const mitad = computed(() => Math.ceil(faqs.length / 2))
const primeraColumna = computed(() => faqs.slice(0, mitad.value))
const segundaColumna = computed(() => faqs.slice(mitad.value))
</script>
