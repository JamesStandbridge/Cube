<?php


namespace App\Service\Stats;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Resource;

class DataProvider {

	private $em;

	public function __construct(EntityManagerInterface $em) 
	{
		$this->em = $em;
	}


	public function getResourceSeries(int $user_id)
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

	private function formatSerie($origin)
	{
		$array = [];
		for($i = 12; $i > 0; $i--) {
			$array[] = array("value" => 0, "date" => $origin->format('m-Y'));
			$origin = $origin->sub(new \DateInterval('P1M'));
		}
		return $array;
	}
}

// janvier
// fevrier
// mars
// avril
// mai
// juin
// juillet
// aout
// septembre
// octobre
// novembre
// decembre