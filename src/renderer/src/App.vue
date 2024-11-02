<template>
  <router-view />
</template>

<script setup>
const router = useRouter();
console.log(router.options.routes);
</script>
