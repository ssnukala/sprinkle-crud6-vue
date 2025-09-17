<?php

declare(strict_types=1);

/*
 * CRUD6 Vue Sprinkle
 *
 * @link      https://github.com/ssnukala/sprinkle-crud6-vue
 * @copyright Copyright (c) 2025 Srinivas Nukala
 * @license   https://opensource.org/licenses/MIT (MIT License)
 */

namespace UserFrosting\Sprinkle\CRUD6Vue\Routes;

use Slim\App;
use UserFrosting\Routes\RouteDefinitionInterface;
use UserFrosting\Sprinkle\CRUD6Vue\Controller\CRUD6VueController;

/**
 * CRUD6Vue Routes.
 */
class CRUD6VueRoutes implements RouteDefinitionInterface
{
    public function register(App $app): void
    {
        $app->group('/crud6vue', function () {
            // Generic CRUD view routes
            $this->get('/{model}', CRUD6VueController::class . ':listView')
                ->setName('crud6vue.list');
                
            $this->get('/{model}/create', CRUD6VueController::class . ':createView')
                ->setName('crud6vue.create');
                
            $this->get('/{model}/{id}', CRUD6VueController::class . ':detailView')
                ->setName('crud6vue.detail');
                
            $this->get('/{model}/{id}/edit', CRUD6VueController::class . ':editView')
                ->setName('crud6vue.edit');
        });
    }
}