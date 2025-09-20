<template>
  <CRUD6CreateView :model="$route.params.model as string" />
</template>

<script setup lang="ts">
import { CRUD6CreateView } from '@/components';
</script>