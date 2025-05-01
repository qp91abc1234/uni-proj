export default () => {
  return {
    name: 'vite-uni-comp-placeholder',
    enforce: 'post' as any,
    generateBundle: async (_, bundle) => {
      const keys = Object.keys(bundle)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const item = bundle[key]
        if (item.type === 'asset' && key.endsWith('.json')) {
          const obj = JSON.parse(item.source as string)
          if (!obj.usingComponents) continue
          Object.keys(obj.usingComponents).forEach((key) => {
            const value = obj.usingComponents[key]
            if (value.startsWith('../../sub')) {
              obj.componentPlaceholder = obj.componentPlaceholder || {}
              obj.componentPlaceholder[key] = 'view'
            }
          })
          item.source = JSON.stringify(obj)
        }
      }
    }
  }
}
