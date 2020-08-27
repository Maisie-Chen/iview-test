export const showTitle = (item, vm) => (vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name));
