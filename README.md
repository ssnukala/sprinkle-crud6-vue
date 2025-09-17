# CRUD6 Vue Frontend Sprinkle

A generic CRUD Vue frontend sprinkle for UserFrosting 6 that connects to the [sprinkle-crud6](https://github.com/ssnukala/sprinkle-crud6) backend API layer. This sprinkle provides reusable Vue components for building CRUD interfaces with minimal configuration.

## Features

- 🚀 **Generic CRUD Operations**: Create, Read, Update, Delete functionality for any model
- 📋 **JSON Schema Configuration**: Define field types, validation, sorting, and filtering via JSON
- 🎨 **Vue 3 + TypeScript**: Modern Vue.js components with full TypeScript support
- 🔧 **UIKit Integration**: Built with UIKit CSS framework for consistent styling
- 🔍 **Advanced Filtering**: Support for multiple filter types (like, equals, between, etc.)
- 📊 **Sorting & Pagination**: Built-in sorting and pagination capabilities
- 🛡️ **Permission-based Access**: Integrated with UserFrosting's permission system
- 📱 **Responsive Design**: Mobile-friendly responsive interface
- 🎯 **Row Templates**: Custom row formatting support

## Installation

### Requirements

- UserFrosting 6.x
- PHP 8.1+
- Node.js 16+
- [sprinkle-crud6](https://github.com/ssnukala/sprinkle-crud6) backend API

### Install via Composer

```bash
composer require ssnukala/sprinkle-crud6-vue
```

### Install Frontend Dependencies

```bash
npm install
npm run build
```

### Register the Sprinkle

Add the sprinkle to your UserFrosting app's `sprinkles.json`:

```json
{
    "base": [
        "\\UserFrosting\\Sprinkle\\Core\\Core",
        "\\UserFrosting\\Sprinkle\\Account\\Account", 
        "\\UserFrosting\\Sprinkle\\Admin\\Admin",
        "\\UserFrosting\\Sprinkle\\CRUD6\\CRUD6",
        "\\UserFrosting\\Sprinkle\\CRUD6Vue\\CRUD6Vue"
    ]
}
```

## Usage

### 1. Create JSON Schema Configuration

Create a JSON schema file for your model (e.g., `app/schema/crud6vue/products.json`):

```json
{
  "model": "products",
  "title": "Product Management",
  "description": "Manage your product catalog",
  "table": "products",
  "primary_key": "id",
  "timestamps": true,
  "permissions": {
    "read": "view_products",
    "create": "create_product",
    "update": "edit_product", 
    "delete": "delete_product"
  },
  "default_sort": {
    "name": "asc"
  },
  "fields": {
    "id": {
      "type": "integer",
      "label": "ID",
      "auto_increment": true,
      "readonly": true,
      "sortable": true
    },
    "name": {
      "type": "string",
      "label": "Product Name",
      "required": true,
      "sortable": true,
      "filterable": true,
      "searchable": true
    },
    "price": {
      "type": "decimal",
      "label": "Price",
      "required": true,
      "sortable": true,
      "filterable": true,
      "filter_type": "between"
    },
    "is_active": {
      "type": "boolean",
      "label": "Active",
      "default": true,
      "sortable": true,
      "filterable": true
    }
  }
}
```

### 2. Access the Interface

Once configured, you can access the CRUD interface at:

- **List View**: `/crud6vue/products`
- **Create**: `/crud6vue/products/create`
- **Detail**: `/crud6vue/products/{id}`
- **Edit**: `/crud6vue/products/{id}/edit`

### 3. Use as Vue Components

You can also use the components directly in your Vue application:

```vue
<template>
  <CRUD6ListView model="products" />
</template>

<script setup>
import { CRUD6ListView } from '@ssnukala/sprinkle-crud6-vue';
</script>
```

## Configuration Options

### Field Types

Supported field types:

- `string` - Text input
- `integer` - Number input (integers)
- `decimal` - Number input (with decimals)
- `boolean` - Checkbox
- `date` - Date picker
- `datetime` - Date and time picker
- `text` - Textarea
- `json` - JSON editor

### Field Options

```json
{
  "field_name": {
    "type": "string",
    "label": "Display Label",
    "required": true,
    "readonly": false,
    "sortable": true,
    "filterable": true,
    "searchable": true,
    "filter_type": "like",
    "default": "default_value",
    "validation": {
      "required": true,
      "length": { "min": 2, "max": 255 }
    }
  }
}
```

### Filter Types

- `like` - Contains search
- `equals` - Exact match
- `between` - Range filter (for numbers/dates)
- `in` - Multiple selection
- `greater_than` - Greater than comparison
- `less_than` - Less than comparison
- `starts_with` - Starts with search

### Row Templates

You can specify custom row formatting:

```json
{
  "row_template": "custom_template_name"
}
```

## API Integration

The frontend automatically connects to the CRUD6 backend API endpoints:

- `GET /api/crud6/{model}/schema` - Get model schema
- `GET /api/crud6/{model}` - List items with filtering/sorting
- `POST /api/crud6/{model}` - Create new item
- `GET /api/crud6/{model}/{id}` - Get single item
- `PUT /api/crud6/{model}/{id}` - Update item
- `DELETE /api/crud6/{model}/{id}` - Delete item

## Development

### Build for Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

## Examples

See the `examples/` directory for complete configuration examples:

- `examples/products.json` - Product catalog management
- `examples/users.json` - User management interface

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vue Frontend  │    │   CRUD6 API     │    │   Database      │
│                 │    │                 │    │                 │
│ • Components    │◄──►│ • Controllers   │◄──►│ • Tables        │
│ • Composables   │    │ • Sprunje       │    │ • Models        │
│ • Types         │    │ • Validation    │    │ • Relationships │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Related Projects

- [sprinkle-crud6](https://github.com/ssnukala/sprinkle-crud6) - Backend API layer
- [UserFrosting](https://github.com/userfrosting/UserFrosting) - PHP user management framework
- [theme-pink-cupcake](https://github.com/userfrosting/theme-pink-cupcake) - Vue theme for UserFrosting
