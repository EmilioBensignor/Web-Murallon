<template>
    <DefaultSection inner-class="md:items-center md:gap-6 xxl:gap-8" class="px-4 md:px-8 lg:px-16">
        <div class="lg:w-full flex flex-col lg:flex-row lg:justify-between md:items-center gap-3 md:gap-6">
            <HeadingH2 class="text-primary uppercase">Preguntas Frecuentes</HeadingH2>

            <!-- <div class="flex flex-col md:flex-row gap-2">
                <ButtonPrimary class="md:w-60">Sobre nosotros</ButtonPrimary>
                <ButtonPrimary class="md:w-60 bg-white border border-primary text-primary!">Sobre nuestras pinturas
                </ButtonPrimary>
            </div> -->
        </div>

        <div class="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 xxl:gap-12">
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
        pregunta: '¿Qué tipos de pintura ofrece Murallón?',
        respuesta: 'Ofrecemos una línea completa de pinturas para interior y exterior: látex, esmaltes, fijadores, membranas impermeabilizantes, enduidos y revestimientos para frentes.'
    },
    {
        pregunta: '¿Cuántas manos de pintura necesito aplicar?',
        respuesta: 'En general recomendamos 2 manos para una cobertura uniforme. En colores intensos o sobre superficies oscuras, puede ser necesaria una tercera mano.'
    },
    {
        pregunta: '¿Es necesario usar fijador antes de pintar?',
        respuesta: 'Sí, el fijador sellador es fundamental para preparar la superficie. Mejora la adherencia de la pintura, sella poros y reduce el consumo de pintura.'
    },
    {
        pregunta: '¿Cuánto rinde un litro de pintura Murallón?',
        respuesta: 'El rendimiento varía según el producto. En promedio, un litro de látex cubre entre 10 y 16 m² por mano, dependiendo de la porosidad de la superficie.'
    },
    {
        pregunta: '¿Dónde puedo comprar productos Murallón?',
        respuesta: 'Contamos con una amplia red de distribuidores en todo el país. Podés encontrar el más cercano en nuestra sección de distribuidores.'
    },
    {
        pregunta: '¿Las pinturas Murallón son aptas para exterior?',
        respuesta: 'Sí, tenemos líneas específicas para exterior con alta resistencia a la intemperie, rayos UV y humedad. Consultá nuestra línea de frentes y membranas.'
    }
]

const mitad = computed(() => Math.ceil(faqs.length / 2))
const primeraColumna = computed(() => faqs.slice(0, mitad.value))
const segundaColumna = computed(() => faqs.slice(mitad.value))
</script>