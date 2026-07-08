export const useCatalogo = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const catalogoUrl = ref(null)

  const fetchCatalogo = async () => {
    const { data, error } = await supabase
      .from('catalogos')
      .select('catalogo_pdf')
      .eq('marca', 'Murallon')
      .single()

    if (error || !data?.catalogo_pdf) return
    catalogoUrl.value = `${config.public.supabase.url}/storage/v1/object/public/catalogos/${data.catalogo_pdf}`
  }

  return { catalogoUrl, fetchCatalogo }
}
