# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-17

### Added
- Initial release of CRUD6Vue sprinkle
- Generic CRUD operations for any model
- JSON schema-driven field configuration
- Support for multiple field types:
  - string (text input)
  - integer (number input)
  - decimal (decimal number input)
  - boolean (checkbox)
  - date (date picker)
  - datetime (datetime picker)
  - text (textarea)
  - json (JSON editor)
- Advanced filtering and sorting capabilities
- Permission-based access control integration
- UIKit-based responsive design
- TypeScript composables for state management
- Reusable Vue 3 components
- Webpack build system
- ESLint configuration
- Complete documentation with examples
- Example configurations for products and users

### Features
- **CRUD6ListView**: List view with sorting, filtering, pagination
- **CRUD6CreateView**: Create form with validation
- **CRUD6DetailView**: Detail view with actions
- **CRUD6EditView**: Edit form with data loading
- **CRUD6FieldDisplay**: Field display component with type handling
- **useCRUD6**: Composable for state management and API interaction
- **CRUD6API**: Utility class for backend communication

### Infrastructure
- UserFrosting 6 sprinkle structure
- Vue 3 + TypeScript support
- Webpack bundling
- ES modules configuration
- CSS preprocessing support