export const useMurallonBlog = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const blog = ref(null)
  const productosRecomendados = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getBlogImageUrl = (path) => {
    if (!path) return ''
    return `${config.public.supabase.url}/storage/v1/object/public/blog-murallon/${path}`
  }

  const getProductoImageUrl = (path) => {
    if (!path) return ''
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-productos/${path}`
  }

  const fetchBlogConProductos = async (slug) => {
    loading.value = true
    error.value = null
    blog.value = null
    productosRecomendados.value = []

    try {
      const { data: blogData, error: blogError } = await supabase
        .from('blog-murallon')
        .select('*')
        .eq('slug', slug)
        .single()

      if (blogError) throw blogError

      blog.value = blogData

      const { data: relaciones, error: relError } = await supabase
        .from('blog-murallon-productos')
        .select(`
          orden,
          producto:producto_id (
            id,
            nombre,
            slug,
            imagen_principal,
            tamanos_disponibles,
            codigo_color_card,
            tipo_aplicacion:tipos_aplicacion_id(id, nombre)
          )
        `)
        .eq('blog_id', blogData.id)
        .order('orden', { ascending: true, nullsFirst: false })

      if (relError) throw relError

      productosRecomendados.value = (relaciones || [])
        .filter((r) => r.producto)
        .map((r) => ({
          ...r.producto,
          orden: r.orden,
        }))
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener blog con productos:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    blog,
    productosRecomendados,
    loading,
    error,
    fetchBlogConProductos,
    getBlogImageUrl,
    getProductoImageUrl,
  }
}
