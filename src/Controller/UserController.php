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
     * @Route("/api/resource/enabled", name="app_update_user_state", methods={"GET"})
     * @param Request $request
     * @param UtilisateursRepository $repo
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
	public function changeUserState(Request $request, UserRepository $repo) {
		try {
			$userID = $request->get('user_id');
			$em = $this->getDoctrine()->getManager();
			$user = $repo->find($userID);

			$user->setEnabled(!$user->isEnabled());

			$em->persist($user);
			$em->flush();			
	        return $this->json([
	            'user' => $user
	        ], 200, [], []);
		} catch(ErrorException $e) {
	        return $this->json([
	            'error' => "bad request"
	        ], 500);
		}
	}	
}
