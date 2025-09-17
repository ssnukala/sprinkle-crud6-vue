import { ref, reactive, computed } from 'vue';
import { CRUD6API } from '@/utils/api';
import { CRUD6Schema, CRUD6ListResponse, CRUD6ListParams, CRUD6ListItem, FieldColumnConfig } from '@/types';

export function useCRUD6(model: string) {
    const api = new CRUD6API();
    
    // Reactive state
    const schema = ref<CRUD6Schema | null>(null);
    const items = ref<CRUD6ListItem[]>([]);
    const currentItem = ref<CRUD6ListItem | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const totalCount = ref(0);
    const filteredCount = ref(0);
    
    // List parameters
    const listParams = reactive<CRUD6ListParams>({
        page: 1,
        size: 25,
        sorts: {},
        filters: {},
        search: ''
    });

    // Computed properties
    const columns = computed<FieldColumnConfig[]>(() => {
        if (!schema.value) return [];
        
        return Object.entries(schema.value.fields)
            .filter(([_, field]) => !field.readonly || field.type !== 'json')
            .map(([fieldName, field]) => ({
                field: fieldName,
                label: field.label,
                sortable: field.sortable || false,
                filterable: field.filterable || false,
                searchable: field.searchable || false,
                type: field.type,
                template: field.type // Can be overridden by schema
            }));
    });

    const canCreate = computed(() => {
        return schema.value?.permissions?.create ? true : false; // TODO: Check actual permissions
    });

    const canUpdate = computed(() => {
        return schema.value?.permissions?.update ? true : false; // TODO: Check actual permissions
    });

    const canDelete = computed(() => {
        return schema.value?.permissions?.delete ? true : false; // TODO: Check actual permissions
    });

    // Methods
    async function loadSchema(): Promise<void> {
        try {
            loading.value = true;
            error.value = null;
            schema.value = await api.getSchema(model);
            
            // Set default sort from schema
            if (schema.value.default_sort) {
                listParams.sorts = { ...schema.value.default_sort };
            }
        } catch (err) {
            error.value = `Failed to load schema: ${err}`;
            console.error('Failed to load schema:', err);
        } finally {
            loading.value = false;
        }
    }

    async function loadItems(): Promise<void> {
        try {
            loading.value = true;
            error.value = null;
            const response: CRUD6ListResponse = await api.getList(model, listParams);
            items.value = response.rows;
            totalCount.value = response.count;
            filteredCount.value = response.count_filtered;
        } catch (err) {
            error.value = `Failed to load items: ${err}`;
            console.error('Failed to load items:', err);
        } finally {
            loading.value = false;
        }
    }

    async function loadItem(id: string | number): Promise<void> {
        try {
            loading.value = true;
            error.value = null;
            currentItem.value = await api.getItem(model, id);
        } catch (err) {
            error.value = `Failed to load item: ${err}`;
            console.error('Failed to load item:', err);
        } finally {
            loading.value = false;
        }
    }

    async function createItem(data: Record<string, any>): Promise<boolean> {
        try {
            loading.value = true;
            error.value = null;
            const newItem = await api.createItem(model, data);
            items.value.unshift(newItem);
            return true;
        } catch (err) {
            error.value = `Failed to create item: ${err}`;
            console.error('Failed to create item:', err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function updateItem(id: string | number, data: Record<string, any>): Promise<boolean> {
        try {
            loading.value = true;
            error.value = null;
            const updatedItem = await api.updateItem(model, id, data);
            
            // Update in list if present
            const index = items.value.findIndex(item => item[schema.value?.primary_key || 'id'] == id);
            if (index !== -1) {
                items.value[index] = updatedItem;
            }
            
            // Update current item if it's the same
            if (currentItem.value && currentItem.value[schema.value?.primary_key || 'id'] == id) {
                currentItem.value = updatedItem;
            }
            
            return true;
        } catch (err) {
            error.value = `Failed to update item: ${err}`;
            console.error('Failed to update item:', err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function deleteItem(id: string | number): Promise<boolean> {
        try {
            loading.value = true;
            error.value = null;
            await api.deleteItem(model, id);
            
            // Remove from list
            const index = items.value.findIndex(item => item[schema.value?.primary_key || 'id'] == id);
            if (index !== -1) {
                items.value.splice(index, 1);
                totalCount.value--;
                filteredCount.value--;
            }
            
            return true;
        } catch (err) {
            error.value = `Failed to delete item: ${err}`;
            console.error('Failed to delete item:', err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    function setSort(field: string, direction: 'asc' | 'desc'): void {
        listParams.sorts = { [field]: direction };
        loadItems();
    }

    function setFilter(field: string, value: any): void {
        if (value === null || value === undefined || value === '') {
            delete listParams.filters[field];
        } else {
            listParams.filters[field] = value;
        }
        listParams.page = 1; // Reset to first page when filtering
        loadItems();
    }

    function setSearch(searchTerm: string): void {
        listParams.search = searchTerm;
        listParams.page = 1; // Reset to first page when searching
        loadItems();
    }

    function setPage(page: number): void {
        listParams.page = page;
        loadItems();
    }

    function setPageSize(size: number): void {
        listParams.size = size;
        listParams.page = 1; // Reset to first page when changing page size
        loadItems();
    }

    return {
        // State
        schema,
        items,
        currentItem,
        loading,
        error,
        totalCount,
        filteredCount,
        listParams,
        
        // Computed
        columns,
        canCreate,
        canUpdate,
        canDelete,
        
        // Methods
        loadSchema,
        loadItems,
        loadItem,
        createItem,
        updateItem,
        deleteItem,
        setSort,
        setFilter,
        setSearch,
        setPage,
        setPageSize
    };
}