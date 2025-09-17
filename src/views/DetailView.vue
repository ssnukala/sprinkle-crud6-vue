<template>
  <CRUD6DetailView 
    :id="$route.params.id as string" 
    :model="$route.params.model as string" 
  />
</template>

<script setup lang="ts">
import { CRUD6DetailView } from '@/components';
</script>