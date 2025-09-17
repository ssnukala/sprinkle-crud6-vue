import axios, { AxiosResponse } from 'axios';
import { CRUD6Schema, CRUD6ListResponse, CRUD6ListParams, CRUD6ListItem } from '@/types';

export class CRUD6API {
    private baseURL: string;

    constructor(baseURL = '/api/crud6') {
        this.baseURL = baseURL;
    }

    /**
     * Get schema configuration for a model
     */
    async getSchema(model: string): Promise<CRUD6Schema> {
        const response: AxiosResponse<CRUD6Schema> = await axios.get(`${this.baseURL}/${model}/schema`);
        return response.data;
    }

    /**
     * Get list of items for a model
     */
    async getList(model: string, params: CRUD6ListParams = {}): Promise<CRUD6ListResponse> {
        const response: AxiosResponse<CRUD6ListResponse> = await axios.get(`${this.baseURL}/${model}`, {
            params: this.buildQueryParams(params)
        });
        return response.data;
    }

    /**
     * Get a single item by ID
     */
    async getItem(model: string, id: string | number): Promise<CRUD6ListItem> {
        const response: AxiosResponse<CRUD6ListItem> = await axios.get(`${this.baseURL}/${model}/${id}`);
        return response.data;
    }

    /**
     * Create a new item
     */
    async createItem(model: string, data: Record<string, any>): Promise<CRUD6ListItem> {
        const response: AxiosResponse<CRUD6ListItem> = await axios.post(`${this.baseURL}/${model}`, data);
        return response.data;
    }

    /**
     * Update an existing item
     */
    async updateItem(model: string, id: string | number, data: Record<string, any>): Promise<CRUD6ListItem> {
        const response: AxiosResponse<CRUD6ListItem> = await axios.put(`${this.baseURL}/${model}/${id}`, data);
        return response.data;
    }

    /**
     * Delete an item
     */
    async deleteItem(model: string, id: string | number): Promise<void> {
        await axios.delete(`${this.baseURL}/${model}/${id}`);
    }

    /**
     * Build query parameters for list requests
     */
    private buildQueryParams(params: CRUD6ListParams): Record<string, any> {
        const query: Record<string, any> = {};

        if (params.page) query.page = params.page;
        if (params.size) query.size = params.size;
        if (params.search) query.search = params.search;

        if (params.sorts) {
            Object.entries(params.sorts).forEach(([field, direction]) => {
                query[`sorts[${field}]`] = direction;
            });
        }

        if (params.filters) {
            Object.entries(params.filters).forEach(([field, value]) => {
                query[`filters[${field}]`] = value;
            });
        }

        return query;
    }
}