<?php

namespace App\Repository;

use App\Entity\TypeOfRelationship;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TypeOfRelationship|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeOfRelationship|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeOfRelationship[]    findAll()
 * @method TypeOfRelationship[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeOfRelationshipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeOfRelationship::class);
    }
}
