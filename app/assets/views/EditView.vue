<template>
  <CRUD6EditView 
    :id="$route.params.id as string" 
    :model="$route.params.model as string" 
  />
</template>

<script setup lang="ts">
import { CRUD6EditView } from '@/components';
</script>