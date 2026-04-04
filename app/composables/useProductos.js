export const useProductos = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const productos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDestacados = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('murallon-productos')
        .select('*, tipo_aplicacion:tipos_aplicacion_id(id, nombre)')
        .eq('destacado', true)

      if (fetchError) throw fetchError
      productos.value = data || []
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener productos destacados:', e)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (imagenPrincipal) => {
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-productos/${imagenPrincipal}`
  }

  return { productos, loading, error, fetchDestacados, getImageUrl }
}
