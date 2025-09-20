<template>
  <div class="crud6-vue-edit">
    <!-- Page Header -->
    <div class="uk-margin-medium-bottom">
      <h1 class="uk-heading-line">
        <span>Edit {{ schema?.title || model }}</span>
      </h1>
      <router-link 
        :to="{ name: 'crud6vue.detail', params: { model, id } }"
        class="uk-button uk-button-default uk-button-small"
      >
        <span uk-icon="arrow-left" />
        Back to Details
      </router-link>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading && !currentItem"
      class="uk-text-center uk-margin-large"
    >
      <div uk-spinner="ratio: 2" />
      <p>Loading item...</p>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="uk-alert-danger"
      uk-alert
    >
      <a
        class="uk-alert-close"
        uk-close
      />
      <p>{{ error }}</p>
    </div>

    <!-- Form -->
    <div
      v-if="currentItem && schema"
      class="uk-card uk-card-default uk-card-body"
    >
      <form
        class="uk-form-stacked"
        @submit.prevent="handleSubmit"
      >
        <div
          class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m"
          uk-grid
        >
          <div 
            v-for="field in editableFields" 
            :key="field.name"
            :class="{ 'uk-width-1-1': field.type === 'text' || field.type === 'json' }"
          >
            <label
              class="uk-form-label"
              :for="field.name"
            >
              {{ field.label }}
              <span
                v-if="field.required"
                class="uk-text-danger"
              >*</span>
            </label>
            
            <div class="uk-form-controls">
              <!-- Text Input -->
              <input 
                v-if="field.type === 'string'"
                :id="field.name"
                v-model="formData[field.name]"
                type="text"
                class="uk-input"
                :required="field.required"
                :placeholder="field.label"
              >
              
              <!-- Number Input -->
              <input 
                v-else-if="field.type === 'integer'"
                :id="field.name"
                v-model.number="formData[field.name]"
                type="number"
                class="uk-input"
                :required="field.required"
                step="1"
              >
              
              <!-- Decimal Input -->
              <input 
                v-else-if="field.type === 'decimal'"
                :id="field.name"
                v-model.number="formData[field.name]"
                type="number"
                class="uk-input"
                :required="field.required"
                step="0.01"
              >
              
              <!-- Boolean Checkbox -->
              <label
                v-else-if="field.type === 'boolean'"
                class="uk-form-label"
              >
                <input 
                  :id="field.name"
                  v-model="formData[field.name]"
                  type="checkbox"
                  class="uk-checkbox"
                >
                {{ field.label }}
              </label>
              
              <!-- Date Input -->
              <input 
                v-else-if="field.type === 'date'"
                :id="field.name"
                v-model="formData[field.name]"
                type="date"
                class="uk-input"
                :required="field.required"
              >
              
              <!-- DateTime Input -->
              <input 
                v-else-if="field.type === 'datetime'"
                :id="field.name"
                v-model="formData[field.name]"
                type="datetime-local"
                class="uk-input"
                :required="field.required"
              >
              
              <!-- Textarea -->
              <textarea 
                v-else-if="field.type === 'text'"
                :id="field.name"
                v-model="formData[field.name]"
                class="uk-textarea"
                :required="field.required"
                :placeholder="field.label"
                rows="4"
              />
              
              <!-- JSON Editor -->
              <div
                v-else-if="field.type === 'json'"
                class="uk-margin-small-top"
              >
                <textarea 
                  :id="field.name"
                  v-model="jsonText[field.name]"
                  class="uk-textarea"
                  placeholder="Enter valid JSON..."
                  rows="6"
                  @blur="validateJSON(field.name)"
                />
                <div
                  v-if="jsonErrors[field.name]"
                  class="uk-text-danger uk-margin-small-top"
                >
                  Invalid JSON: {{ jsonErrors[field.name] }}
                </div>
              </div>
              
              <!-- Default: Text Input -->
              <input 
                v-else
                :id="field.name"
                v-model="formData[field.name]"
                type="text"
                class="uk-input"
                :required="field.required"
                :placeholder="field.label"
              >
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="uk-margin-top">
          <button 
            type="submit" 
            class="uk-button uk-button-primary uk-width-1-1 uk-width-auto@s"
            :disabled="loading"
          >
            <span
              v-if="loading"
              uk-spinner="ratio: 0.8"
            />
            <span
              v-else
              uk-icon="check"
            />
            Update {{ schema.title || model }}
          </button>
          
          <router-link 
            :to="{ name: 'crud6vue.detail', params: { model, id } }"
            class="uk-button uk-button-default uk-margin-left"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCRUD6 } from '@/composables/useCRUD6';

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
  loadSchema,
  loadItem,
  updateItem
} = useCRUD6(props.model);

const formData = reactive<Record<string, any>>({});
const jsonText = reactive<Record<string, string>>({});
const jsonErrors = reactive<Record<string, string>>({});

// Computed properties
const editableFields = computed(() => {
  if (!schema.value) return [];
  
  return Object.entries(schema.value.fields)
    .filter(([_, field]) => !field.readonly && !field.auto_increment)
    .map(([name, field]) => ({
      name,
      ...field
    }));
});

// Methods
function initializeForm(): void {
  if (!currentItem.value) return;
  
  editableFields.value.forEach(field => {
    const value = currentItem.value![field.name];
    
    if (field.type === 'json') {
      formData[field.name] = value;
      jsonText[field.name] = value ? JSON.stringify(value, null, 2) : '';
    } else if (field.type === 'date' || field.type === 'datetime') {
      // Format dates for input fields
      if (value) {
        const date = new Date(value);
        if (field.type === 'date') {
          formData[field.name] = date.toISOString().split('T')[0];
        } else {
          // datetime-local format
          const offset = date.getTimezoneOffset() * 60000;
          const localDate = new Date(date.getTime() - offset);
          formData[field.name] = localDate.toISOString().slice(0, 16);
        }
      } else {
        formData[field.name] = '';
      }
    } else {
      formData[field.name] = value ?? '';
    }
  });
}

function validateJSON(fieldName: string): void {
  const text = jsonText[fieldName];
  if (!text.trim()) {
    formData[fieldName] = null;
    delete jsonErrors[fieldName];
    return;
  }
  
  try {
    formData[fieldName] = JSON.parse(text);
    delete jsonErrors[fieldName];
  } catch (err) {
    jsonErrors[fieldName] = err instanceof Error ? err.message : 'Invalid JSON';
  }
}

function validateForm(): boolean {
  // Check for JSON errors
  if (Object.keys(jsonErrors).length > 0) {
    return false;
  }
  
  // Check required fields
  for (const field of editableFields.value) {
    if (field.required && (formData[field.name] === '' || formData[field.name] == null)) {
      return false;
    }
  }
  
  return true;
}

async function handleSubmit(): Promise<void> {
  if (!validateForm()) {
    return;
  }
  
  // Validate all JSON fields one more time
  editableFields.value
    .filter(field => field.type === 'json')
    .forEach(field => validateJSON(field.name));
  
  if (Object.keys(jsonErrors).length > 0) {
    return;
  }
  
  const success = await updateItem(props.id, formData);
  if (success) {
    router.push({ name: 'crud6vue.detail', params: { model: props.model, id: props.id } });
  }
}

// Watch for changes in currentItem and initialize form
watch(currentItem, (newItem) => {
  if (newItem) {
    initializeForm();
  }
}, { immediate: true });

// Lifecycle
onMounted(async () => {
  await loadSchema();
  if (schema.value) {
    await loadItem(props.id);
  }
});
</script>

<style scoped>
.crud6-vue-edit {
  padding: 1rem;
}

.uk-form-controls textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>