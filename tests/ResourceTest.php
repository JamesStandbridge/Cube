<?php

namespace App\tests;

use App\Entity\Resource;
use Doctrine\Common\Collections\Expr\Value;
use PHPUnit\Framework\TestCase;


class ResourceTest extends TestCase 
{
    private Resource $ressource;

    protected function setUp(): void
    {
        parent::setUp();

        $this->ressource = new Resource();
    }

    
    public function testGetTitle(): void
    {
        $value = 'ma ressource';
        
        $myRes = $this->ressource;
        $this->ressource->setTitle($value);

        self::assertInstanceOf(Resource::class, $myRes);

        self::assertEquals($value, $this->ressource->getTitle());
    }

    public function testGetIsPublic(): void
    {
        $value = true;
        
        $myRes = $this->ressource;
        $this->ressource->setIspublic($value);

        self::assertInstanceOf(Resource::class, $myRes);

        self::assertEquals($value, $this->ressource->getIsPublic());
    }

    public function testGetNumberViews(): void
    {
        $value = 16;
        
        $myRes = $this->ressource;
        $this->ressource->setNumberViews($value);

        self::assertInstanceOf(Resource::class, $myRes);

        self::assertEquals($value, $this->ressource->getNumberViews());
    }
    
}