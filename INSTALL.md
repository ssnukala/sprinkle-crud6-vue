# CRUD6Vue Installation Guide

This guide will walk you through installing and configuring the CRUD6Vue sprinkle for UserFrosting 6.

## Prerequisites

- UserFrosting 6.x installed and configured
- PHP 8.1 or higher
- Node.js 16+ with npm
- [sprinkle-crud6](https://github.com/ssnukala/sprinkle-crud6) backend installed

## Step 1: Install the Sprinkle

Add the sprinkle to your UserFrosting project:

```bash
composer require ssnukala/sprinkle-crud6-vue
```

## Step 2: Register the Sprinkle

Add the sprinkle to your `app/sprinkles.json` file:

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

## Step 3: Install Frontend Dependencies

This sprinkle supports two approaches for frontend development:

### Option A: Use Pre-built Sprinkle Pages (Traditional)

Navigate to the sprinkle directory and build the assets:

```bash
cd vendor/ssnukala/sprinkle-crud6-vue
npm install
npm run build
```

This approach uses the traditional UserFrosting sprinkle pages at routes like `/crud6vue/your-model`.

### Option B: Import Vue Components Directly (Modern)

Install the npm package in your frontend application:

```bash
npm install @ssnukala/sprinkle-crud6-vue
```

Then import components as needed:

```typescript
import { CRUD6ListView } from '@ssnukala/sprinkle-crud6-vue/components';
```

## Step 4: Configure Your Model

Create a JSON schema file for your model in `app/schema/crud6vue/your-model.json`:

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
    }
  }
}
```

## Step 6: Set Up Permissions

Ensure the appropriate permissions are defined in your UserFrosting permission system.

## Step 7: Access the Interface

### Using Traditional Sprinkle Pages
Navigate to:
- List view: `/crud6vue/your-model`
- Create: `/crud6vue/your-model/create`
- Detail: `/crud6vue/your-model/{id}`
- Edit: `/crud6vue/your-model/{id}/edit`

### Using Vue Components in Your App
Import and use components directly in your Vue application:

```vue
<template>
  <CRUD6ListView model="products" />
</template>

<script setup>
import { CRUD6ListView } from '@ssnukala/sprinkle-crud6-vue/components';
</script>
```

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Make sure Node.js version is 16+
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Permission Issues

Make sure your UserFrosting user has the appropriate permissions for the model operations.

### API Connection Issues

Verify that the CRUD6 backend sprinkle is properly installed and configured.

## Development Mode

For active development, use watch mode:

```bash
npm run dev
```

This will automatically rebuild when you make changes to the source files.

## Next Steps

- Check out the [examples/](examples/) directory for more configuration examples
- Try the groups management interface: `/crud6vue/groups` (compatible with theme-pink-cupcake)
- Read the [README.md](README.md) for detailed feature documentation
- Customize the components for your specific needs

### Example Usage

Once installed, you can access the groups management interface at:
```
http://your-site.com/crud6vue/groups
```

This provides the same functionality as theme-pink-cupcake's Admin/PageGroups.vue but using the CRUD6Vue components and schema configuration.