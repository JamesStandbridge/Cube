<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityTestController extends AbstractController
{
    /**
     * @Route("/security/test", name="security_test")
     */
    public function index(): Response
    {
        return $this->render('security_test/index.html.twig', [
            'controller_name' => 'SecurityTestController',
        ]);
    }

    /**
     * @Route("/api/token_test", name="api_token_test")
     * @return [type] [description]
     */
    public function testUser() {
    	dd('ca marche !');
    }
}
