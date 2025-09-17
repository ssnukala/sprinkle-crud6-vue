<template>
  <CRUD6ListView :model="$route.params.model as string" />
</template>

<script setup lang="ts">
import { CRUD6ListView } from '@/components';
</script>