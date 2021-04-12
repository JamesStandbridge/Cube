<?php

namespace App\Repository;

use App\Entity\ResourceContentValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceContentValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceContentValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceContentValue[]    findAll()
 * @method ResourceContentValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourceContentValueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceContentValue::class);
    }
}
