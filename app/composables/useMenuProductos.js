export const useMenuProductos = () => {
  const supabase = useSupabaseClient()

  const categorias = ref([])
  const loading = ref(false)

  const CATEGORIAS_MENU = {
    'Soluciones para impermeabilizar': {
      solucion: 'protege',
      ids: [
        '0211c246-57e9-4975-8521-7fb3fd4e7d26',
        '93133ad0-5fc0-4c57-9385-ea38a3dbbf38',
      ],
    },
    'Soluciones para preparar': {
      solucion: 'prepara',
      ids: ['7a534668-0933-4660-83da-b0c32cf15f19'],
    },
    'Soluciones para pintar': {
      solucion: 'renova',
      ids: ['8aa61649-6153-4e87-9ff9-f5cc8038401a'],
    },
  }

  const fetchMenuProductos = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('murallon-productos')
        .select('id, nombre, slug, tipos_aplicacion_id')

      if (error) throw error

      categorias.value = Object.entries(CATEGORIAS_MENU).map(([nombre, { solucion, ids }]) => ({
        nombre,
        solucion,
        productos: (data || []).filter(p => ids.includes(p.tipos_aplicacion_id)),
      }))
    } catch (e) {
      console.error('Error al obtener menú de productos:', e)
    } finally {
      loading.value = false
    }
  }

  return { categorias, loading, fetchMenuProductos }
}
