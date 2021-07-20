<?php

/**
 * author: JamesStandbridge
 * date: 24/01/2021
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use Symfony\Component\HttpFoundation\Request;

use App\Repository\ResourceRepository;

use App\Entity\Resource;


class ResourceController extends AbstractController
{

	/**
	 * @Route("/xhr/search-resources", name="xhr_search_resources", methods={"POST"})
	 * @param  Request            $request
	 * @param  ResourceRepository $repo    
	 */
	public function search(Request $request, ResourceRepository $repo) {
		
		$filters = json_decode($request->getContent(), true);

		$resources = $repo->search($filters, 15);

        return $this->json([
            'resources' => $resources
        ], 200);
	}

	/**
	 * @Route("/api/resources/new", name="app_resource_new_get", methods={"GET"})
	 * 
	 * @IsGranted("ROLE_MODERATOR")
	 * 
	 * @param  ResourceUserStateRepository $repo
	 */
	public function getStates(ResourceRepository $repo) {
		$resources = $repo->findAllNew();

        return $this->json([
            'resources' => $resources
        ], 200, [], ['groups' => 'read:resources']);
	}

	/**
	 * @Route("/api/resources/moderate", name="app_moderate_resource", methods={"POST"})
	 * 
	 * @IsGranted("ROLE_MODERATOR")
	 * 
	 * @param  ResourceUserStateRepository $repo
	 */
	public function moderateResource(Request $request, ResourceRepository $repo) {
		$content = json_decode($request->getContent(), true);

		$resource = $repo->find($content["resource_id"]);
		$em = $this->getDoctrine()->getManager();
		$bool = $content["bool"];
		if($resource) {
			$resource->setIsValidated($bool);
			if(!$bool) $resource->setIsPublic(false);
			$em->persist($resource);
			$em->flush();

	        return $this->json([
	            'resource' => $resource
	        ], 200, [], ['groups' => 'read:resources']);
		} else {
	        return $this->json([
	            'error' => "non existant resource"
	        ], 403);			
		}
	}
}