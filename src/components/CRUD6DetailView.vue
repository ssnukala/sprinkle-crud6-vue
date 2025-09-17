<template>
  <div class="crud6-vue-detail">
    <!-- Page Header -->
    <div class="uk-margin-medium-bottom">
      <h1 class="uk-heading-line">
        <span>{{ schema?.title || model }} Details</span>
      </h1>
      <div>
        <router-link 
          :to="{ name: 'crud6vue.list', params: { model } }"
          class="uk-button uk-button-default uk-button-small"
        >
          <span uk-icon="arrow-left"></span>
          Back to List
        </router-link>
        
        <router-link 
          v-if="canUpdate && currentItem"
          :to="{ name: 'crud6vue.edit', params: { model, id } }"
          class="uk-button uk-button-primary uk-button-small uk-margin-small-left"
        >
          <span uk-icon="pencil"></span>
          Edit
        </router-link>
        
        <button 
          v-if="canDelete && currentItem"
          @click="confirmDelete"
          class="uk-button uk-button-danger uk-button-small uk-margin-small-left"
        >
          <span uk-icon="trash"></span>
          Delete
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !currentItem" class="uk-text-center uk-margin-large">
      <div uk-spinner="ratio: 2"></div>
      <p>Loading item...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ error }}</p>
    </div>

    <!-- Item Details -->
    <div v-if="currentItem && schema" class="uk-card uk-card-default uk-card-body">
      <dl class="uk-description-list uk-description-list-divider">
        <div v-for="field in displayFields" :key="field.name" class="uk-margin-small">
          <dt class="uk-text-bold">{{ field.label }}</dt>
          <dd>
            <CRUD6FieldDisplay 
              :value="currentItem[field.name]"
              :field="{ 
                field: field.name, 
                label: field.label, 
                type: field.type,
                sortable: false,
                filterable: false,
                searchable: false
              }"
              :item="currentItem"
            />
          </dd>
        </div>
      </dl>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="delete-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Confirm Delete</h2>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button @click="handleDelete" class="uk-button uk-button-danger" type="button">Delete</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCRUD6 } from '@/composables/useCRUD6';
import CRUD6FieldDisplay from './CRUD6FieldDisplay.vue';

interface Props {
  model: string;
  id: string | number;
}

const props = defineProps<Props>();
const router = useRouter();

const {
  schema,
  currentItem,
  loading,
  error,
  canUpdate,
  canDelete,
  loadSchema,
  loadItem,
  deleteItem
} = useCRUD6(props.model);

// Computed properties
const displayFields = computed(() => {
  if (!schema.value) return [];
  
  return Object.entries(schema.value.fields)
    .map(([name, field]) => ({
      name,
      ...field
    }))
    .sort((a, b) => {
      // Primary key first, then other fields
      if (a.name === schema.value?.primary_key) return -1;
      if (b.name === schema.value?.primary_key) return 1;
      return 0;
    });
});

// Methods
function confirmDelete(): void {
  // @ts-ignore - UIkit modal API
  UIkit.modal('#delete-modal').show();
}

async function handleDelete(): Promise<void> {
  if (currentItem.value && schema.value) {
    const success = await deleteItem(currentItem.value[schema.value.primary_key]);
    if (success) {
      // @ts-ignore - UIkit modal API
      UIkit.modal('#delete-modal').hide();
      router.push({ name: 'crud6vue.list', params: { model: props.model } });
    }
  }
}

// Lifecycle
onMounted(async () => {
  await loadSchema();
  if (schema.value) {
    await loadItem(props.id);
  }
});
</script>

<style scoped>
.crud6-vue-detail {
  padding: 1rem;
}

.uk-description-list dt {
  width: 200px;
}

.uk-description-list dd {
  margin-left: 220px;
}

@media (max-width: 959px) {
  .uk-description-list dt {
    width: auto;
  }
  
  .uk-description-list dd {
    margin-left: 0;
  }
}
</style>