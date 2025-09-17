<template>
  <div class="crud6-vue-list">
    <!-- Page Header -->
    <div class="uk-margin-medium-bottom">
      <h1 class="uk-heading-line">
        <span>{{ schema?.title || model }} Management</span>
      </h1>
      <p
        v-if="schema?.description"
        class="uk-text-muted"
      >
        {{ schema.description }}
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading && !schema"
      class="uk-text-center uk-margin-large"
    >
      <div uk-spinner="ratio: 2" />
      <p>Loading schema...</p>
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

    <!-- Main Content -->
    <div
      v-if="schema"
      class="uk-card uk-card-default uk-card-body"
    >
      <!-- Action Bar -->
      <div class="uk-margin-bottom uk-flex uk-flex-between uk-flex-wrap">
        <!-- Search -->
        <div class="uk-width-1-2@s uk-width-1-3@m">
          <div class="uk-inline uk-width-1-1">
            <span
              class="uk-form-icon"
              uk-icon="icon: search"
            />
            <input 
              class="uk-input" 
              type="text" 
              placeholder="Search..."
              :value="listParams.search"
              @input="setSearch(($event.target as HTMLInputElement).value)"
            >
          </div>
        </div>

        <!-- Create Button -->
        <div v-if="canCreate">
          <router-link 
            :to="{ name: 'crud6vue.create', params: { model } }"
            class="uk-button uk-button-primary"
          >
            <span uk-icon="plus" />
            Create {{ schema.title || model }}
          </router-link>
        </div>
      </div>

      <!-- Data Table -->
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-hover uk-table-divider">
          <thead>
            <tr>
              <th 
                v-for="column in visibleColumns" 
                :key="column.field"
                :class="{ 'uk-table-link': column.sortable }"
                @click="column.sortable && toggleSort(column.field)"
              >
                {{ column.label }}
                <span
                  v-if="column.sortable && getSortDirection(column.field)"
                  class="uk-margin-small-left"
                >
                  <span 
                    v-if="getSortDirection(column.field) === 'asc'" 
                    uk-icon="triangle-up"
                  />
                  <span 
                    v-if="getSortDirection(column.field) === 'desc'" 
                    uk-icon="triangle-down"
                  />
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td
                :colspan="visibleColumns.length + 1"
                class="uk-text-center"
              >
                <div uk-spinner />
                Loading data...
              </td>
            </tr>
            <tr v-else-if="items.length === 0">
              <td
                :colspan="visibleColumns.length + 1"
                class="uk-text-center uk-text-muted"
              >
                No items found.
              </td>
            </tr>
            <tr
              v-for="item in items"
              v-else
              :key="item[schema.primary_key]"
            >
              <td
                v-for="column in visibleColumns"
                :key="column.field"
              >
                <component 
                  :is="getFieldComponent(column)"
                  :value="item[column.field]"
                  :field="column"
                  :item="item"
                />
              </td>
              <td>
                <div class="uk-button-group uk-button-group-small">
                  <router-link 
                    :to="{ name: 'crud6vue.detail', params: { model, id: item[schema.primary_key] } }"
                    class="uk-button uk-button-default"
                    title="View"
                  >
                    <span uk-icon="eye" />
                  </router-link>
                  <router-link 
                    v-if="canUpdate"
                    :to="{ name: 'crud6vue.edit', params: { model, id: item[schema.primary_key] } }"
                    class="uk-button uk-button-default"
                    title="Edit"
                  >
                    <span uk-icon="pencil" />
                  </router-link>
                  <button 
                    v-if="canDelete"
                    class="uk-button uk-button-danger"
                    title="Delete"
                    @click="confirmDelete(item)"
                  >
                    <span uk-icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalCount > listParams.size"
        class="uk-margin-top"
      >
        <ul class="uk-pagination uk-flex-center">
          <li :class="{ 'uk-disabled': listParams.page <= 1 }">
            <a @click="setPage(listParams.page - 1)">
              <span uk-pagination-previous />
            </a>
          </li>
          <li
            v-for="page in paginationPages"
            :key="page"
            :class="{ 'uk-active': page === listParams.page }"
          >
            <a @click="setPage(page)">{{ page }}</a>
          </li>
          <li :class="{ 'uk-disabled': listParams.page >= totalPages }">
            <a @click="setPage(listParams.page + 1)">
              <span uk-pagination-next />
            </a>
          </li>
        </ul>
      </div>

      <!-- Item Count -->
      <div class="uk-text-small uk-text-muted uk-margin-top">
        Showing {{ Math.min((listParams.page - 1) * listParams.size + 1, filteredCount) }} 
        to {{ Math.min(listParams.page * listParams.size, filteredCount) }} 
        of {{ filteredCount }} entries
        <span v-if="filteredCount !== totalCount">(filtered from {{ totalCount }} total entries)</span>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      id="delete-modal"
      uk-modal
    >
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">
          Confirm Delete
        </h2>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <p class="uk-text-right">
          <button
            class="uk-button uk-button-default uk-modal-close"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-danger"
            type="button"
            @click="handleDelete"
          >
            Delete
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCRUD6 } from '@/composables/useCRUD6';
import type { CRUD6ListItem, FieldColumnConfig } from '@/types';
import CRUD6FieldDisplay from './CRUD6FieldDisplay.vue';

interface Props {
  model: string;
}

const props = defineProps<Props>();

const {
  schema,
  items,
  loading,
  error,
  totalCount,
  filteredCount,
  listParams,
  columns,
  canCreate,
  canUpdate,
  canDelete,
  loadSchema,
  loadItems,
  deleteItem,
  setSearch,
  setPage,
  setSort
} = useCRUD6(props.model);

const itemToDelete = ref<CRUD6ListItem | null>(null);

// Computed properties
const visibleColumns = computed(() => {
  return columns.value.filter(col => col.field !== schema.value?.primary_key || col.type !== 'integer');
});

const totalPages = computed(() => {
  return Math.ceil(filteredCount.value / listParams.size);
});

const paginationPages = computed(() => {
  const pages = [];
  const current = listParams.page;
  const total = totalPages.value;
  
  // Simple pagination logic - show up to 5 pages
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Methods
function getSortDirection(field: string): 'asc' | 'desc' | null {
  return listParams.sorts[field] || null;
}

function toggleSort(field: string): void {
  const current = getSortDirection(field);
  let newDirection: 'asc' | 'desc' = 'asc';
  
  if (current === 'asc') {
    newDirection = 'desc';
  }
  
  setSort(field, newDirection);
}

function getFieldComponent(column: FieldColumnConfig) {
  // Return the field display component
  return CRUD6FieldDisplay;
}

function confirmDelete(item: CRUD6ListItem): void {
  itemToDelete.value = item;
  // @ts-expect-error - UIkit modal API
  UIkit.modal('#delete-modal').show();
}

async function handleDelete(): Promise<void> {
  if (itemToDelete.value && schema.value) {
    const success = await deleteItem(itemToDelete.value[schema.value.primary_key]);
    if (success) {
      // @ts-expect-error - UIkit modal API
      UIkit.modal('#delete-modal').hide();
      itemToDelete.value = null;
    }
  }
}

// Lifecycle
onMounted(async () => {
  await loadSchema();
  if (schema.value) {
    await loadItems();
  }
});
</script>

<style scoped>
.crud6-vue-list {
  padding: 1rem;
}

.uk-table-link {
  cursor: pointer;
}

.uk-table-link:hover {
  background-color: #f8f8f8;
}
</style>