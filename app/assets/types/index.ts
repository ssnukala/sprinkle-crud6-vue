export interface CRUD6Field {
    type: 'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'text' | 'json';
    label: string;
    required?: boolean;
    readonly?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    filter_type?: 'like' | 'equals' | 'between' | 'in' | 'greater_than' | 'less_than' | 'starts_with';
    validation?: Record<string, any>;
    default?: any;
    auto_increment?: boolean;
    date_format?: string;
}

export interface CRUD6Schema {
    model: string;
    title: string;
    description?: string;
    table: string;
    primary_key: string;
    timestamps?: boolean;
    soft_delete?: boolean;
    permissions?: {
        read?: string;
        create?: string;
        update?: string;
        delete?: string;
    };
    default_sort?: Record<string, 'asc' | 'desc'>;
    template?: string;
    row_template?: string;
    fields: Record<string, CRUD6Field>;
}

export interface CRUD6ListItem {
    [key: string]: any;
}

export interface CRUD6ListResponse {
    rows: CRUD6ListItem[];
    count: number;
    count_filtered: number;
}

export interface CRUD6ListParams {
    page?: number;
    size?: number;
    sorts?: Record<string, 'asc' | 'desc'>;
    filters?: Record<string, any>;
    search?: string;
}

export interface FieldColumnConfig {
    field: string;
    label: string;
    sortable: boolean;
    filterable: boolean;
    searchable: boolean;
    type: string;
    template?: string;
}