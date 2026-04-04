export const useBlog = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('blog-murallon')
        .select('*')
        .order('fecha', { ascending: false })

      if (fetchError) throw fetchError
      posts.value = data || []
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener posts del blog:', e)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (path) => {
    return `${config.public.supabase.url}/storage/v1/object/public/blog-murallon/${path}`
  }

  return { posts, loading, error, fetchPosts, getImageUrl }
}
