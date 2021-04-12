<?php

/**
 * author: JamesStandbridge
 * date: 08/04/2021
 */

namespace App\Service\Stats;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Resource;


/**
 * This class give tools in order to get an Array of Resource filtered by date
 */
class ResourceChartProvider {

	private $em;

	public function __construct(EntityManagerInterface $em) 
	{
		$this->em = $em;
	}


	public function getResourceSeries(int $user_id) : array
	{
		$today = new \DateTime();


		$serie = $this->formatSerie(new \DateTime());
		$resources = $this->em->getRepository(Resource::class)->getResourcesByDate($user_id, (new \DateTime)->sub(new \DateInterval('P11M')));

		$data = $this->associateSerie($serie, $resources);

		return $data;
	}


	private function associateSerie(array $serie, array $resources) : array 
	{
		foreach($resources as $resource) {
			$date = $resource->getCreatedAt()->format('m-Y');

			for($i = 0; $i < count($serie); $i++) {
				if($serie[$i]['date'] === $date) {
					$serie[$i]['value']++;
				}
			}
		}
		
		return $serie;
	}

	private function formatSerie($origin) : array
	{
		$array = [];
		for($i = 12; $i > 0; $i--) {
			$array[] = array("value" => 0, "date" => $origin->format('m-Y'));
			$origin = $origin->sub(new \DateInterval('P1M'));
		}
		return $array;
	}
}