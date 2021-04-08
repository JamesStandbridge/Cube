<?php

namespace App\DataFixtures;

use Faker\Generator;

class DateProvider
{
    public function genDate()
    {
    	$today = new \DateTime();
    	$old = (new \DateTime)->sub(new \DateInterval('P11M'));
        return $this->randomDate($today, $old);
    }

	private function randomDate($start_date, $end_date)
	{
	    // Convert to timetamps
	    $min = strtotime($start_date->format('Y-m-d'));
	    $max = strtotime($end_date->format('Y-m-d'));

	    // Generate random number using above bounds
	    $val = rand($min, $max);


	    // Convert back to desired date format
	    return new \DateTime(date('Y-m-d H:i:s', $val));
	}
}
