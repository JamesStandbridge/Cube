<?php

/**
 * author: JamesStandbridge
 * date: 24/01/2021
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;

use App\Repository\ResourceRepository;
use App\Repository\ResourceUserStateRepository;

use App\Entity\ResourceUserState;


class ResourceUserStateController extends AbstractController
{

	/**
	 * @Route("/api/resource/favorite", name="app_resource_like", methods={"GET"})
	 * @param  Request $request 
	 */
	public function likeResource(Request $request, ResourceUserStateRepository $repo, ResourceRepository $resRepo) {
		try {
			$resourceID = $request->get('resource_id');
			$user = $this->getUser();

			$em = $this->getDoctrine()->getManager();
			$resourceState = $repo->findByResourceID($resourceID, $user->getId());

			if(!$resourceState) {
				$resourceState = new ResourceUserState();
				$resourceState->setUserEntity($user)
							  ->setIsFavorite(true)
							  ->setIsAside(false)
							  ->setIsExploited(false)
							  ->setResource($resRepo->find($resourceID))
				;
			} else {
				$resourceState->setIsFavorite(!$resourceState->getIsFavorite());
			}
			

			$em->persist($resourceState);
			$em->flush();			
	        return $this->json([
	            'resourceState' => $resourceState
	        ], 200, [], ['groups' => 'read:resource_state']);
		} catch(ErrorException $e) {
	        return $this->json([
	            'error' => "bad request"
	        ], 500);
		}
	}

	/**
	 * @Route("/api/resource-user-states", name="app_resource_states_get", methods={"GET"})
	 * @param  ResourceUserStateRepository $repo
	 */
	public function getStates(ResourceUserStateRepository $repo) {
		$user = $this->getUser();
		$states = $repo->findAllByUser($user->getId());

        return $this->json([
            'resourceStates' => $states
        ], 200, [], ['groups' => 'read:resource_states']);
	}
}