<?php

declare(strict_types=1);

/*
 * CRUD6 Vue Sprinkle
 *
 * @link      https://github.com/ssnukala/sprinkle-crud6-vue
 * @copyright Copyright (c) 2025 Srinivas Nukala
 * @license   https://opensource.org/licenses/MIT (MIT License)
 */

namespace UserFrosting\Sprinkle\CRUD6Vue;

use UserFrosting\Sprinkle\Core\Core;
use UserFrosting\Sprinkle\SprinkleRecipe;
use UserFrosting\Sprinkle\CRUD6\CRUD6;

/**
 * CRUD6Vue Sprinkle Recipe.
 */
class CRUD6Vue implements SprinkleRecipe
{
    /**
     * {@inheritdoc}
     */
    public function getName(): string
    {
        return 'CRUD6Vue Sprinkle';
    }

    /**
     * {@inheritdoc}
     */
    public function getPath(): string
    {
        return __DIR__ . '/../..';
    }

    /**
     * {@inheritdoc}
     */
    public function getSprinkles(): array
    {
        return [
            Core::class,
            CRUD6::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getRoutes(): array
    {
        return [
            Routes\CRUD6VueRoutes::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getServices(): array
    {
        return [
            ServicesProvider\CRUD6VueServicesProvider::class,
        ];
    }
}