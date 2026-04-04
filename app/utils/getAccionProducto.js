export const getAccionProducto = (tiposAplicacionId) => {
  const impermeabiliza = [
    '0211c246-57e9-4975-8521-7fb3fd4e7d26',
    '93133ad0-5fc0-4c57-9385-ea38a3dbbf38'
  ]

  if (impermeabiliza.includes(tiposAplicacionId)) return 'Impermeabilizá con'
  if (tiposAplicacionId === '7a534668-0933-4660-83da-b0c32cf15f19') return 'Prepará con'
  if (tiposAplicacionId === '8aa61649-6153-4e87-9ff9-f5cc8038401a') return 'Pintá con'

  return 'Prepará con'
}
