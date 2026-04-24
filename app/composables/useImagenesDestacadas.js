export const useImagenesDestacadas = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  const getImageUrl = (path) => {
    if (!path) return null
    return `${config.public.supabase.url}/storage/v1/object/public/murallon-imagenes-destacadas/${path}`
  }

  const fetchImagenPorNombre = async (nombre) => {
    try {
      const { data, error } = await supabase
        .from('murallon-imagenes-destacadas')
        .select('imagen_chica, imagen_mediana, imagen_grande')
        .eq('nombre', nombre)
        .single()

      if (error) throw error

      return {
        chica: getImageUrl(data.imagen_chica),
        mediana: getImageUrl(data.imagen_mediana),
        grande: getImageUrl(data.imagen_grande),
      }
    } catch (e) {
      console.error(`Error al obtener imagen destacada "${nombre}":`, e)
      return null
    }
  }

  return { fetchImagenPorNombre, getImageUrl }
}
