# UserFrosting 6.0 Hybrid Distribution Model

## Question Addressed

> The vue frontend component is imported as "@userfrosting/sprinkle-admin": "^6.0.0-beta" in the userfrosting 6.0.beta, should this sprinkle not be like that and imported in package.json no composer?

## Answer

**Both approaches are correct and intentional** in UserFrosting 6.0. This is called the **hybrid distribution model**.

### Why Both Composer AND npm?

UserFrosting 6.0 sprinkles are designed to support two distribution channels:

1. **Composer Package** (`ssnukala/sprinkle-crud6-vue`)
   - Contains PHP backend code (controllers, routes, services)
   - Contains Twig templates
   - Contains JSON schemas
   - Provides traditional sprinkle functionality

2. **npm Package** (`@ssnukala/sprinkle-crud6-vue`)
   - Contains Vue components, composables, and views
   - Allows direct import in modern Vue applications
   - Enables tree-shaking and modern build tools
   - Follows modern frontend development practices

### This Matches Official UserFrosting Pattern

The official `@userfrosting/sprinkle-admin` does exactly the same thing:
- **Composer**: `userfrosting/sprinkle-admin` (PHP backend)
- **npm**: `@userfrosting/sprinkle-admin` (Vue frontend)

### Benefits of Hybrid Approach

1. **Traditional UserFrosting Users**: Can install via Composer and use built-in pages
2. **Modern Frontend Developers**: Can npm install and import components directly
3. **Flexibility**: Choose the approach that fits your development workflow
4. **Future-Proof**: Supports both traditional and modern development patterns

### Usage Examples

#### Option A: Traditional Sprinkle (Composer only)
```bash
composer require ssnukala/sprinkle-crud6-vue
# Visit /crud6vue/your-model in browser
```

#### Option B: Modern Vue App (npm)
```bash
npm install @ssnukala/sprinkle-crud6-vue
```
```typescript
import { CRUD6ListView } from '@ssnukala/sprinkle-crud6-vue/components';
```

#### Option C: Hybrid (Both)
```bash
composer require ssnukala/sprinkle-crud6-vue  # Backend API
npm install @ssnukala/sprinkle-crud6-vue      # Frontend components
```

## Conclusion

The dual distribution approach via both Composer and npm is **intentional and correct**. It follows UserFrosting 6.0's modern architecture and provides maximum flexibility for developers.