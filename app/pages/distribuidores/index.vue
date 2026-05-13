<template>
    <DefaultMain>
        <div class="flex flex-col gap-3 md:gap-4 lg:gap-8 pt-6 md:pt-8 lg:pt-12 xxl:pt-16">
            <HeadingH1 class="text-center text-primary uppercase">Distribuidores Murallón</HeadingH1>
            <HomeDistribuidores />
        </div>

        <DefaultSection class="px-4 md:px-8 lg:px-16" inner-class="gap-3 md:gap-4 lg:gap-6">
            <div v-if="isLoading" class="flex justify-center py-12">
                <Icon name="material-symbols:progress-activity" class="w-8 h-8 text-primary animate-spin" />
            </div>

            <div v-else-if="listadoDistribuidores.length" class="w-full flex flex-col">
                <div v-for="(distribuidor, index) in listadoDistribuidores" :key="distribuidor.id"
                    class="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 py-4 md:py-5"
                    :class="index !== 0 ? 'border-t border-gray-dark' : ''">
                    <div class="flex flex-col items-center md:items-start gap-2">
                        <div class="flex items-center gap-2 text-primary">
                            <Icon name="material-symbols:shopping-bag-outline" size="24" class="shrink-0" />
                            <p class="text-xl lg:text-[1.75rem] font-bold uppercase">{{ distribuidor.nombreComercio }}</p>
                        </div>
                        <p class="text-center md:text-left lg:text-xl text-dark font-semibold uppercase">
                            {{ distribuidor.calle }}, {{ distribuidor.localidad }}, {{ distribuidor.provincia }}
                        </p>
                    </div>

                    <ButtonPrimary :to="getMapsUrl(distribuidor)" target="_blank" icon="location-on-outline"
                        class="shrink-0 self-center md:self-auto">
                        Ver en Maps
                    </ButtonPrimary>
                </div>
            </div>

            <div v-else class="flex flex-col items-center gap-4 py-12 text-center">
                <p class="text-base lg:text-xl text-secondary font-bold">No hay distribuidores disponibles</p>
            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
const { isLoading, fetchDistribuidores, listadoDistribuidores } = useDistribuidoresMapa()

const getMapsUrl = (d) => {
    const query = encodeURIComponent(
        `${d.nombreComercio}, ${d.calle}, ${d.localidad}, ${d.provincia}`
    )
    return `https://www.google.com/maps/search/?api=1&query=${query}`
}

onMounted(() => {
    if (!process.client) return
    fetchDistribuidores()
})

useSeoMeta({
    title: 'Distribuidores',
    description: 'Encontrá distribuidores de Murallón en toda Argentina.',
})
</script>
