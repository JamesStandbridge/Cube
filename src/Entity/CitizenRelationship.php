<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CitizenRelationshipRepository;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CitizenRelationshipRepository::class)
 * @ApiResource
 */
class CitizenRelationship
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups("app:read:relations")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=TypeOfRelationship::class)
     * @ORM\JoinColumn(nullable=false)
     * @groups("app:read:relations")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="relationships")
     * @ORM\JoinColumn(nullable=false)
     */
    private $UserSource;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     * @groups("app:read:relations")
     */
    private $UserTarget;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?TypeOfRelationship
    {
        return $this->type;
    }

    public function setType(?TypeOfRelationship $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getUserSource(): ?User
    {
        return $this->UserSource;
    }

    public function setUserSource(?User $UserSource): self
    {
        $this->UserSource = $UserSource;

        return $this;
    }

    public function getUserTarget(): ?User
    {
        return $this->UserTarget;
    }

    public function setUserTarget(?User $UserTarget): self
    {
        $this->UserTarget = $UserTarget;

        return $this;
    }

}
