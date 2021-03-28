<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;

use App\Repository\UserRepository;

use App\Entity\User;


class UserController extends AbstractController
{

    /**
     * @Route("/api/resource/enabled", name="app_resource_like", methods={"GET"})
     * @param Request $request
     * @param UtilisateursRepository $repo
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
	public function disabledUser(Request $request, UserRepository $repo) {
		try {
			$userID = $request->get('user_id');
			$em = $this->getDoctrine()->getManager();
			$User = $repo->getUser($userID);

			if($User->getEnabled() == true) {
				$User->setEnabled(false);
			} else {
				$User->setEnabled(true);
			}
			

			$em->persist($User);
			$em->flush();			
	        return $this->json([
	            'user' => $User
	        ], 200, [], []);
		} catch(ErrorException $e) {
	        return $this->json([
	            'error' => "bad request"
	        ], 500);
		}
	}	
}
