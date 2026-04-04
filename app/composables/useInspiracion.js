export const useInspiracion = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const inspiraciones = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchInspiraciones = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('inspiracion-murallon')
        .select('*')
        .order('orden', { ascending: true })

      if (fetchError) throw fetchError
      inspiraciones.value = data || []
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener inspiraciones:', e)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (path) => {
    return `${config.public.supabase.url}/storage/v1/object/public/inspiracion-murallon/${path}`
  }

  return { inspiraciones, loading, error, fetchInspiraciones, getImageUrl }
}
