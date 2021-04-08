<?php

/**
 * author: JamesStandbridge
 * date: 24/01/2021
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
     * @param Request $request
     * @param ResourceUserStateRepository $repo
     * @param ResourceRepository $resRepo
     * @return JsonResponse
     */
	public function likeResource(Request $request, ResourceUserStateRepository $repo, ResourceRepository $resRepo): JsonResponse
    {
		try {
			$resourceID = $request->get('resource_id');
			$user = $this->getUser();
			$em = $this->getDoctrine()->getManager();
			$resourceState = $repo->findByResourceID($resourceID, $user->getId());

			if(!$resourceState) {
				$resourceState = $this->initResourceState($em, $user, $resRepo->find($resourceID));
				$resourceState->setIsFavorite(true);
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
     * @Route("/api/resource/exploited", name="app_resource_exploit", methods={"GET"})
     * @param Request $request
     * @param ResourceUserStateRepository $resRepo
     * @return JsonResponse
     */
	public function exploitResource(Request $request, ResourceUserStateRepository $resRepo, ResourceRepository $repo): JsonResponse
    {
		try {
			$resourceID = $request->get('resource_id');

			$user = $this->getUser();
			$em = $this->getDoctrine()->getManager();
			$resourceState = $resRepo->findByResourceID($resourceID, $user->getId());
			$resource = $repo->find($resourceID);

			if(!$resourceState) {
				$resourceState = $this->initResourceState($em, $user, $resource);
			}
			
			if($resourceState->getIsExploited() === false) {


				$resourceState->setIsExploited(true);

				
				$resource->setNumberViews($resource->getNumberViews() + 1);

				$em->persist($resource);
				$em->persist($resourceState);
				$em->flush();					
			}

		
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
     * @Route("/api/resource/aside", name="app_resource_aside", methods={"GET"})
     * @param Request $request
     * @param ResourceUserStateRepository $repo
     * @param ResourceRepository $resRepo
     * @return JsonResponse
     */
	public function asideResource(Request $request, ResourceUserStateRepository $repo, ResourceRepository $resRepo): JsonResponse
    {
		try {
			$resourceID = $request->get('resource_id');
			$user = $this->getUser();
			$em = $this->getDoctrine()->getManager();
			$resourceState = $repo->findByResourceID($resourceID, $user->getId());

			if(!$resourceState) {
				$resourceState = $this->initResourceState($em, $user, $resRepo->find($resourceID));
				$resourceState->setIsAside(true);
			} else {
				$resourceState->setIsAside(!$resourceState->getIsAside());
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


	private function initResourceState($em, $user, $resource): ResourceUserState
    {
		$resourceState = new ResourceUserState();
		$resourceState->setUserEntity($user)
					  ->setIsFavorite(false)
					  ->setIsAside(false)
					  ->setIsExploited(false)
					  ->setResource($resource)
		;
		return $resourceState;
	}

	/**
	 * @Route("/api/resource-user-states", name="app_resource_states_get", methods={"GET"})
	 * @param  ResourceUserStateRepository $repo
	 */
	public function getStates(ResourceUserStateRepository $repo): JsonResponse
    {
		$user = $this->getUser();
		$states = $repo->findAllByUser($user->getId());

        return $this->json([
            'resourceStates' => $states
        ], 200, [], ['groups' => 'read:resource_states']);
	}
}
