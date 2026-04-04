export const useDistribuidores = () => {
  const supabase = useSupabaseClient()

  const distribuidores = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDistribuidores = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('waterplast-distribuidores')
        .select('*')
        .contains('vende', ['murallon'])
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      distribuidores.value = data || []
    } catch (e) {
      error.value = e.message
      console.error('Error al obtener distribuidores:', e)
    } finally {
      loading.value = false
    }
  }

  return { distribuidores, loading, error, fetchDistribuidores }
}
