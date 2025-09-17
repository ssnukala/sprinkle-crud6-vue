<?php

declare(strict_types=1);

/*
 * CRUD6 Vue Sprinkle
 *
 * @link      https://github.com/ssnukala/sprinkle-crud6-vue
 * @copyright Copyright (c) 2025 Srinivas Nukala
 * @license   https://opensource.org/licenses/MIT (MIT License)
 */

namespace UserFrosting\Sprinkle\CRUD6Vue\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use UserFrosting\Sprinkle\Core\Controller\SimpleController;

/**
 * CRUD6Vue Controller.
 *
 * Renders Vue frontend pages for generic CRUD operations.
 */
class CRUD6VueController extends SimpleController
{
    /**
     * Render the list view for a model.
     */
    public function listView(Request $request, Response $response, array $args): Response
    {
        $model = $args['model'];
        
        return $this->renderTemplate($response, 'pages/crud6vue/list.html.twig', [
            'model' => $model,
            'page_title' => ucfirst($model) . ' Management',
        ]);
    }

    /**
     * Render the create view for a model.
     */
    public function createView(Request $request, Response $response, array $args): Response
    {
        $model = $args['model'];
        
        return $this->renderTemplate($response, 'pages/crud6vue/create.html.twig', [
            'model' => $model,
            'page_title' => 'Create ' . ucfirst($model),
        ]);
    }

    /**
     * Render the detail view for a model.
     */
    public function detailView(Request $request, Response $response, array $args): Response
    {
        $model = $args['model'];
        $id = $args['id'];
        
        return $this->renderTemplate($response, 'pages/crud6vue/detail.html.twig', [
            'model' => $model,
            'id' => $id,
            'page_title' => ucfirst($model) . ' Details',
        ]);
    }

    /**
     * Render the edit view for a model.
     */
    public function editView(Request $request, Response $response, array $args): Response
    {
        $model = $args['model'];
        $id = $args['id'];
        
        return $this->renderTemplate($response, 'pages/crud6vue/edit.html.twig', [
            'model' => $model,
            'id' => $id,
            'page_title' => 'Edit ' . ucfirst($model),
        ]);
    }
}