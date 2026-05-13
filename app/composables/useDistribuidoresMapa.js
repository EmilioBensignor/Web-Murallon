let _instance = null

export const useDistribuidoresMapa = () => {
  if (_instance) return _instance

  const { distribuidores, loading: isLoading, fetchDistribuidores } = useDistribuidores()

  const selectedProvincia = ref('')
  const selectedLocalidad = ref('')
  const selectedComercio = ref('')
  const activeDropdown = ref(null)
  const searchProvincia = ref('')
  const searchLocalidad = ref('')
  const searchComercio = ref('')
  const selectedDistribuidor = shallowRef(null)

  const provincias = computed(() => {
    return [...new Set(distribuidores.value.map((d) => d.provincia))].sort()
  })

  const filteredProvincias = computed(() => {
    if (!searchProvincia.value) return provincias.value
    return provincias.value.filter((p) =>
      p.toLowerCase().includes(searchProvincia.value.toLowerCase())
    )
  })

  const localidades = computed(() => {
    if (!selectedProvincia.value) return []
    return [
      ...new Set(
        distribuidores.value
          .filter((d) => d.provincia === selectedProvincia.value)
          .map((d) => d.localidad)
      ),
    ].sort()
  })

  const filteredLocalidades = computed(() => {
    if (!searchLocalidad.value) return localidades.value
    return localidades.value.filter((l) =>
      l.toLowerCase().includes(searchLocalidad.value.toLowerCase())
    )
  })

  const comercios = computed(() => {
    if (!selectedLocalidad.value) return []
    return distribuidores.value.filter(
      (d) =>
        d.provincia === selectedProvincia.value &&
        d.localidad === selectedLocalidad.value
    )
  })

  const filteredComercios = computed(() => {
    if (!searchComercio.value) return comercios.value
    return comercios.value.filter((c) =>
      c.nombreComercio.toLowerCase().includes(searchComercio.value.toLowerCase())
    )
  })

  const selectedComercioName = computed(() => {
    if (!selectedComercio.value) return ''
    const comercio = distribuidores.value.find(
      (d) => d.id == selectedComercio.value
    )
    return comercio ? comercio.nombreComercio : ''
  })

  const filteredDistribuidores = computed(() => {
    if (!selectedProvincia.value) return []
    let result = distribuidores.value.filter(
      (d) => d.provincia === selectedProvincia.value
    )
    if (selectedLocalidad.value) {
      result = result.filter((d) => d.localidad === selectedLocalidad.value)
    }
    if (selectedComercio.value) {
      result = result.filter((d) => d.id == selectedComercio.value)
    }
    return result
  })

  const listadoDistribuidores = computed(() => {
    if (!selectedProvincia.value) return distribuidores.value
    return filteredDistribuidores.value
  })

  const toggleDropdown = (dropdown) => {
    if (activeDropdown.value === dropdown) {
      activeDropdown.value = null
      return
    }
    activeDropdown.value = dropdown
    nextTick(() => {
      if (dropdown === 'provincia') searchProvincia.value = ''
      if (dropdown === 'localidad') searchLocalidad.value = ''
      if (dropdown === 'comercio') searchComercio.value = ''
    })
  }

  const selectProvincia = (provincia) => {
    selectedProvincia.value = provincia
    selectedLocalidad.value = ''
    selectedComercio.value = ''
    activeDropdown.value = null
    searchProvincia.value = ''
  }

  const selectLocalidad = (localidad) => {
    selectedLocalidad.value = localidad
    selectedComercio.value = ''
    activeDropdown.value = null
    searchLocalidad.value = ''
  }

  const selectComercio = (comercio) => {
    selectedComercio.value = comercio.id
    activeDropdown.value = null
    searchComercio.value = ''
  }

  _instance = {
    distribuidores,
    isLoading,
    fetchDistribuidores,
    selectedProvincia,
    selectedLocalidad,
    selectedComercio,
    activeDropdown,
    searchProvincia,
    searchLocalidad,
    searchComercio,
    selectedDistribuidor,
    filteredProvincias,
    filteredLocalidades,
    filteredComercios,
    selectedComercioName,
    filteredDistribuidores,
    listadoDistribuidores,
    toggleDropdown,
    selectProvincia,
    selectLocalidad,
    selectComercio,
  }

  return _instance
}
