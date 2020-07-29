<template lang="pug" functional>
a-sub-menu(style="padding: 0 !important;" :key="props.menuInfo.meta.title")
    span(slot="title")
        a-icon(:type="props.menuInfo.meta.icon")
        span {{ props.menuInfo.meta.title }}
    template(v-for="item in props.menuInfo.children")
        a-menu-item.a-menu-item(v-if="!item.children" :key="item.meta.title")
            router-link(:to="{ path: item.path }")
                a-icon(v-if=" item.meta.icon == null? false:true " :type="item.meta.icon")
                span {{ item.meta.title }}
        sub-menu(v-else :key="item.name" :menu-info="item")
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
