<?php

namespace App\Repository;

use App\Entity\ResourceAttribute;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceAttribute|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceAttribute|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceAttribute[]    findAll()
 * @method ResourceAttribute[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourceAttributeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceAttribute::class);
    }

    // /**
    //  * @return ResourceAttribute[] Returns an array of ResourceAttribute objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ResourceAttribute
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
