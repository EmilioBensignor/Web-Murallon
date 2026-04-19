<template>
    <DefaultMain>
        <SearchHero :solucion-activa="solucionActiva" @filtrar="filtrarPorSolucion" />

        <DefaultSection class="pt-18 lg:pt-24 px-4 md:px-8" inner-class="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-8 xxl:gap-16">
            <div class="flex flex-col gap-3 md:gap-2 lg:gap-4">
                <div class="min-h-32 lg:min-h-36 flex flex-col justify-between gap-3 bg-white shadow-1 rounded-[18px] p-4 lg:p-6">
                    <p class="lg:text-xl text-secondary font-bold">
                        {{ filtrosAplicados.length }} {{ filtrosAplicados.length === 1 ? 'Filtro aplicado' :
                            'Filtros aplicados' }}
                    </p>
                    <SearchFiltrosAplicados v-if="filtrosAplicados.length" :filtros="filtrosAplicados"
                        @remove="removerFiltro" />
                    <button type="button" class="self-end text-sm lg:text-base text-primary font-semibold"
                        @click="limpiarFiltros">
                        Limpiar filtros
                    </button>
                </div>
                <aside class="w-full md:w-80 shrink-0">
                    <SearchFiltros v-model="filtros" :categorias="CATEGORIAS" :usos="USOS" :tamanos="TAMANOS"
                        :rendimiento-range="RENDIMIENTO_RANGE" />
                </aside>
            </div>

            <div class="flex-1">
                <div v-if="loading" class="flex justify-center py-12">
                    <Icon name="material-symbols:progress-activity" class="w-8 h-8 text-primary animate-spin" />
                </div>

                <div v-else-if="productosFiltrados.length"
                    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
                    <ProductCard v-for="producto in productosFiltrados" :key="producto.id" :producto="producto"
                        :imagen-url="getImageUrl(producto.imagen_principal)" :show-accion="false" show-tamanos
                        show-detalle height-class="h-77 md:h-75 lg:h-92" image-class="h-37.5 lg:h-49" />
                </div>

                <SearchEstadoVacio v-else @clear-filters="limpiarFiltros" />
            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
const {
    productosFiltrados,
    loading,
    filtros,
    filtrosAplicados,
    fetchProductos,
    filtrarPorSolucion,
    solucionActiva,
    removerFiltro,
    limpiarFiltros,
    getImageUrl,
    CATEGORIAS,
    USOS,
    TAMANOS,
    RENDIMIENTO_RANGE,
} = useProductosSearch()

onMounted(() => {
    fetchProductos()
})
</script>
