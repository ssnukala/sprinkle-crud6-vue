<?php

declare(strict_types=1);

/*
 * CRUD6 Vue Sprinkle
 *
 * @link      https://github.com/ssnukala/sprinkle-crud6-vue
 * @copyright Copyright (c) 2025 Srinivas Nukala
 * @license   https://opensource.org/licenses/MIT (MIT License)
 */

namespace UserFrosting\Sprinkle\CRUD6Vue\ServicesProvider;

use DI\Container;
use UserFrosting\ServicesProvider\ServicesProviderInterface;

/**
 * CRUD6Vue services provider.
 */
class CRUD6VueServicesProvider implements ServicesProviderInterface
{
    public function register(Container $container): void
    {
        // Register any additional services needed for CRUD6Vue
        // For now, we'll keep this empty as we're primarily using frontend components
    }
}