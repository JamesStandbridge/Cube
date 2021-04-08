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

use App\Service\Stats\DataProvider;

class StatsController extends AbstractController
{


	/**
	 * @Route("/api/resources/stats", name="app_get_resource_stats")
	 */
	public function getUserResourceStats(DataProvider $provider)
	{
		$user = $this->getUser();
		$serie = $provider->getResourceSeries($user->getId());

        return $this->json([
            'serie' => $serie
        ], 200);    
	}

	/**
	 * @Route("/api/user/kpi", name="app_get_kpi")
	 * @param  DataProvider $provider 
	 */
	public function getMainKPI(DataProvider $provider)
	{
		$user = $this->getUser();
		dd();
	}
}