<template>
  <CRUD6DetailView 
    :model="$route.params.model as string" 
    :id="$route.params.id as string" 
  />
</template>

<script setup lang="ts">
import { CRUD6DetailView } from '@/components';
</script>