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
    public function homepage() {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

        /**
     * @Route("/register", name="register")
     */
    public function registerRoute() {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/login", name="login")
     */
    public function login() {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/catalogue", name="catalogue")
     */
    public function catalogue() {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

    /**
     * @Route("/categories/creer", name="create_category")
     */
    public function createCategory() {
        return $this->render('cube_react_app/appEntryPoint.html.twig');
    }

}