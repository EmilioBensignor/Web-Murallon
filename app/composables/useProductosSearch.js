export const useProductosSearch = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()

  const productos = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Categorias que vienen de murallon-categorias
  const CATEGORIAS = [
    'Enduidos',
    'Fijadores',
    'Látex',
    'Membranas',
    'Microlátex',
    'Pintura para frentes / revestimiento',
  ]

  const USOS = ['Interior', 'Exterior']

  const TAMANOS = ['1 L', '4 L', '10 L', '20 L']

  const RENDIMIENTO_RANGE = { min: 1, max: 16 }

  const SOLUCIONES_VALIDAS = ['prepara', 'renova', 'protege']
  const solucionInicial = SOLUCIONES_VALIDAS.includes(route.query.solucion) ? route.query.solucion : ''
  const solucionActiva = ref(solucionInicial)

  // Sincroniza el query param cuando cambia la solucion activa
  watch(solucionActiva, (nueva) => {
    const actual = route.query.solucion || ''
    if (actual === nueva) return
    const query = { ...route.query }
    if (nueva) {
      query.solucion = nueva
    } else {
      delete query.solucion
    }
    router.replace({ query })
  })

  const filtros = ref({
    categorias: {},
    usos: {},
    tamanos: {},
    rendimiento: [RENDIMIENTO_RANGE.min, RENDIMIENTO_RANGE.max],
    orden: '',
  })

  CATEGORIAS.forEach(c => { filtros.value.categorias[c] = false })
  USOS.forEach(u => { filtros.value.usos[u] = false })
  TAMANOS.forEach(t => { filtros.value.tamanos[t] = false })

  const filtrosAplicados = computed(() => {
    const aplicados = []

    Object.entries(filtros.value.categorias).forEach(([key, val]) => {
      if (val) aplicados.push({ key: `categoria:${key}`, label: key, grupo: 'categorias' })
    })
    Object.entries(filtros.value.usos).forEach(([key, val]) => {
      if (val) aplicados.push({ key: `uso:${key}`, label: key, grupo: 'usos' })
    })
    Object.entries(filtros.value.tamanos).forEach(([key, val]) => {
      if (val) aplicados.push({ key: `tamano:${key}`, label: key, grupo: 'tamanos' })
    })

    const [min, max] = filtros.value.rendimiento
    if (min > RENDIMIENTO_RANGE.min || max < RENDIMIENTO_RANGE.max) {
      aplicados.push({
        key: 'rendimiento',
        label: `${min} - ${max} m²/L`,
        grupo: 'rendimiento',
      })
    }

    return aplicados
  })

  const fetchProductos = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('murallon-productos')
        .select('*, tipo_aplicacion:tipos_aplicacion_id(id, nombre), categoria:categorias_id(id, nombre)')

      if (fetchError) throw fetchError
      productos.value = data || []
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener productos:', e)
    } finally {
      loading.value = false
    }
  }

  const SOLUCION_MAP = {
    prepara: '7a534668-0933-4660-83da-b0c32cf15f19',
    renova: '8aa61649-6153-4e87-9ff9-f5cc8038401a',
    protege: [
      '0211c246-57e9-4975-8521-7fb3fd4e7d26',
      '93133ad0-5fc0-4c57-9385-ea38a3dbbf38',
    ],
  }

  function filtrarPorSolucion(solucion) {
    if (solucionActiva.value === solucion) {
      solucionActiva.value = ''
    } else {
      solucionActiva.value = solucion
    }
  }

  // Extrae el número de rendimiento del texto (ej: "10 – 16 m² / L" → 10)
  function parseRendimiento(texto) {
    if (!texto) return null
    const match = texto.match(/(\d+)/)
    return match ? parseInt(match[1]) : null
  }

  const productosFiltrados = computed(() => {
    let resultado = [...productos.value]

    // Filtrar por solucion activa
    if (solucionActiva.value) {
      const ids = SOLUCION_MAP[solucionActiva.value]
      if (Array.isArray(ids)) {
        resultado = resultado.filter(p =>
          p.tipo_aplicacion && ids.includes(p.tipo_aplicacion.id)
        )
      } else if (ids) {
        resultado = resultado.filter(p =>
          p.tipo_aplicacion && p.tipo_aplicacion.id === ids
        )
      }
    }

    // Filtrar por categorias activas (join con murallon-categorias)
    const categoriasActivas = Object.entries(filtros.value.categorias)
      .filter(([, v]) => v).map(([k]) => k.toLowerCase())
    if (categoriasActivas.length) {
      resultado = resultado.filter(p =>
        p.categoria && categoriasActivas.includes(p.categoria.nombre.toLowerCase())
      )
    }

    // Filtrar por usos activos (uso es array en DB: ["Interior", "Exterior"])
    const usosActivos = Object.entries(filtros.value.usos)
      .filter(([, v]) => v).map(([k]) => k)
    if (usosActivos.length) {
      resultado = resultado.filter(p =>
        p.uso && usosActivos.some(u => p.uso.includes(u))
      )
    }

    // Filtrar por tamanos activos (tamanos_disponibles es array en DB)
    const tamanosActivos = Object.entries(filtros.value.tamanos)
      .filter(([, v]) => v).map(([k]) => k)
    if (tamanosActivos.length) {
      resultado = resultado.filter(p =>
        p.tamanos_disponibles && tamanosActivos.some(t => p.tamanos_disponibles.includes(t))
      )
    }

    // Filtrar por rendimiento (parsear texto a número)
    const [minR, maxR] = filtros.value.rendimiento
    if (minR > RENDIMIENTO_RANGE.min || maxR < RENDIMIENTO_RANGE.max) {
      resultado = resultado.filter(p => {
        const rend = parseRendimiento(p.rendimiento)
        return rend !== null && rend >= minR && rend <= maxR
      })
    }

    // Ordenar
    if (filtros.value.orden === 'nombre-asc') {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
    } else if (filtros.value.orden === 'nombre-desc') {
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre))
    }

    return resultado
  })

  function removerFiltro(filtroKey) {
    if (filtroKey === 'rendimiento') {
      filtros.value.rendimiento = [RENDIMIENTO_RANGE.min, RENDIMIENTO_RANGE.max]
      return
    }

    const [grupo, valor] = filtroKey.split(':')
    if (grupo === 'categoria') filtros.value.categorias[valor] = false
    if (grupo === 'uso') filtros.value.usos[valor] = false
    if (grupo === 'tamano') filtros.value.tamanos[valor] = false
  }

  function limpiarFiltros() {
    CATEGORIAS.forEach(c => { filtros.value.categorias[c] = false })
    USOS.forEach(u => { filtros.value.usos[u] = false })
    TAMANOS.forEach(t => { filtros.value.tamanos[t] = false })
    filtros.value.rendimiento = [RENDIMIENTO_RANGE.min, RENDIMIENTO_RANGE.max]
    filtros.value.orden = ''
    solucionActiva.value = ''
  }

  const getImageUrl = (imagenPrincipal) => {
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-productos/${imagenPrincipal}`
  }

  return {
    productos,
    productosFiltrados,
    loading,
    error,
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
  }
}
