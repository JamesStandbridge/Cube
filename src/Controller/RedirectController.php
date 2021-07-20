<?php

/**
 * author: JamesStandbridge
 * date: 24/01/2021
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RedirectController extends AbstractController
{
    /**
     * @Route("/", name="entry")
     */
    public function homepage(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }


    /**
     * @Route("/register", name="register")
     */
    public function registerRoute(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }


    /**
     * @Route("/login", name="login")
     */
    public function login(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/media/nouveau", name="mediaObject")
     */
    public function createMediaObject(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/ressources/nouveau", name="resource_new")
     */
    public function createResource(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/ressources/{id}/modifier", name="resource_update")
     */
    public function updateResource(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/ressources/supprimer", name="resource_delete")
     */
    public function deleteResource(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/mesRessources", name="my_resources")
     */
    public function getMyResources(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/catalogue/{id}", name="resource_show")
     */
    public function getResource(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/catalogue", name="catalogue")
     */
    public function catalogue(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/categories/creer", name="create_category")
     */
    public function createCategory()
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/profil", name="user_profile")
     */
    public function user_profile(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/moderation/resources", name="register")
     */
    public function moderateResources(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/admin/utilisateur", name="moderate_user")
     */
    public function moderateUsers()
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/admin/dashboardAdmin", name="dashboard_admin")
     */
    public function dashboardAdmin()
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }


    /**
     * @Route("/categories/visualise", name="visualise_category")
     */
    public function visualiseCategory(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/relations", name="user_relations")
     */
    public function userRelations(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/dashboard", name="dashboard_get")
     */
    public function dashboardRoute(): Response
    {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

}
