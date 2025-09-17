<template>
  <CRUD6EditView 
    :model="$route.params.model as string" 
    :id="$route.params.id as string" 
  />
</template>

<script setup lang="ts">
import { CRUD6EditView } from '@/components';
</script>