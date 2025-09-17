<template>
  <span v-if="field.type === 'boolean'">
    <span v-if="value" class="uk-label uk-label-success">Yes</span>
    <span v-else class="uk-label uk-label-danger">No</span>
  </span>
  
  <span v-else-if="field.type === 'date' || field.type === 'datetime'">
    {{ formatDate(value) }}
  </span>
  
  <span v-else-if="field.type === 'decimal'">
    {{ formatNumber(value) }}
  </span>
  
  <span v-else-if="field.type === 'json'">
    <button 
      v-if="value" 
      class="uk-button uk-button-small uk-button-default"
      @click="showJSON"
    >
      View JSON
    </button>
    <span v-else class="uk-text-muted">—</span>
  </span>
  
  <span v-else-if="field.type === 'text'">
    {{ truncateText(value) }}
  </span>
  
  <span v-else>
    {{ displayValue }}
  </span>

  <!-- JSON Modal -->
  <div :id="`json-modal-${fieldKey}`" uk-modal v-if="field.type === 'json'">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{{ field.label }} Data</h2>
      <pre class="uk-background-muted uk-padding-small">{{ JSON.stringify(value, null, 2) }}</pre>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FieldColumnConfig, CRUD6ListItem } from '@/types';

interface Props {
  value: any;
  field: FieldColumnConfig;
  item: CRUD6ListItem;
}

const props = defineProps<Props>();

const fieldKey = computed(() => {
  return `${props.field.field}-${props.item.id || Math.random()}`;
});

const displayValue = computed(() => {
  if (props.value === null || props.value === undefined) {
    return '—';
  }
  return String(props.value);
});

function formatDate(value: string | Date): string {
  if (!value) return '—';
  
  try {
    const date = new Date(value);
    if (props.field.type === 'date') {
      return date.toLocaleDateString();
    } else {
      return date.toLocaleString();
    }
  } catch {
    return String(value);
  }
}

function formatNumber(value: number | string): string {
  if (value === null || value === undefined) return '—';
  
  const num = Number(value);
  if (isNaN(num)) return String(value);
  
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return '—';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function showJSON(): void {
  // @ts-ignore - UIkit modal API
  UIkit.modal(`#json-modal-${fieldKey.value}`).show();
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 300px;
  overflow-y: auto;
}
</style>