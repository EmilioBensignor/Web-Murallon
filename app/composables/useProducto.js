export const useProducto = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const producto = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProductoBySlug = async (slug) => {
    loading.value = true
    error.value = null
    producto.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('murallon-productos')
        .select(`
          *,
          categoria:categorias_id(id, nombre),
          tipo_aplicacion:tipos_aplicacion_id(id, nombre)
        `)
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError
      producto.value = data
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener producto:', e)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (path) => {
    if (!path) return ''
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-productos/${path}`
  }

  return {
    producto,
    loading,
    error,
    fetchProductoBySlug,
    getImageUrl,
  }
}
