<template>
    <DefaultSection class="px-4 md:px-8 lg:px-16">
        <div class="md:w-full md:flex md:justify-between md:items-center">
            <HeadingH2 class="md:text-left text-primary text-center">SOBRE EL PRODUCTO</HeadingH2>
            <ButtonPrimary v-if="fichaTecnicaUrl" :to="fichaTecnicaUrl" target="_blank" icon="docs-outline-rounded" class="hidden md:flex">
                Ficha técnica
            </ButtonPrimary>
        </div>

        <div class="w-full flex flex-col gap-2 lg:gap-4">
            <ProductSobreItem v-for="seccion in seccionesVisibles" :key="seccion.key" :seccion="seccion"
                :is-open="seccionAbierta === seccion.key" @toggle="toggleSeccion(seccion.key)" />
        </div>
        <ButtonPrimary v-if="fichaTecnicaUrl" :to="fichaTecnicaUrl" target="_blank" icon="docs-outline-rounded" class="md:hidden">
            Ficha técnica
        </ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const props = defineProps({
    producto: { type: Object, required: true },
})

const config = useRuntimeConfig()

const fichaTecnicaUrl = computed(() => {
    const path = props.producto.ficha_tecnica
    if (!path) return ''
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-productos/${path}`
})

const CARACTERISTICAS_CAMPOS = [
    { label: 'Colores', campo: 'colores' },
    { label: 'Acabado', campo: 'acabado' },
    { label: 'Poder cubritivo', campo: 'poder_cubritivo' },
    { label: 'Rendimiento', campo: 'rendimiento_caracteristicas' },
    { label: 'Consistencia o viscosidad', campo: 'consistencia_o_viscocidad' },
    { label: 'Secado', campo: 'secado' },
    { label: 'Peso específico', campo: 'peso_especifico' },
]

const caracteristicasHtml = computed(() => {
    const bloques = CARACTERISTICAS_CAMPOS
        .map(({ label, campo }) => {
            const valor = props.producto[campo]
            if (!valor) return ''
            return `<div class="bloque"><p class="label">${label}</p><div class="valor">${valor}</div></div>`
        })
        .filter(Boolean)
    return bloques.length ? bloques.join('') : ''
})

const SECCIONES = computed(() => [
    { key: 'usos', titulo: 'Usos', icono: 'check-circle-outline-rounded', contenido: props.producto.usos },
    { key: 'caracteristicas', titulo: 'Características principales', icono: 'warning-outline-rounded', contenido: caracteristicasHtml.value, isComposed: true },
    { key: 'modo_empleo', titulo: 'Modo de empleo', icono: 'help-outline-rounded', contenido: props.producto.modo_de_empleo },
    { key: 'aplicacion', titulo: 'Aplicación', icono: 'format-paint-outline-rounded', contenido: props.producto.aplicacion },
    { key: 'recomendaciones_generales', titulo: 'Recomendaciones generales', icono: 'thumb-up-outline-rounded', contenido: props.producto.recomendaciones_generales },
    { key: 'recomendaciones_seguridad', titulo: 'Recomendaciones de seguridad', icono: 'warning-outline-rounded', contenido: props.producto.recomendaciones_seguridad },
    { key: 'notas_legales', titulo: 'Notas legales', icono: 'tooltip-2-outline-rounded', contenido: props.producto.notas_legales },
])

const seccionesVisibles = computed(() => SECCIONES.value.filter(s => s.contenido))

const seccionAbierta = ref(null)

function toggleSeccion(key) {
    seccionAbierta.value = seccionAbierta.value === key ? null : key
}
</script>
