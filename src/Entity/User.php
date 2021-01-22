<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity=Resource::class, mappedBy="author")
     */
    private $resources;

    /**
     * @ORM\OneToMany(targetEntity=CitizenRelationship::class, mappedBy="user1", orphanRemoval=true)
     */
    private $citizenRelationships;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\ManyToOne(targetEntity=Address::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $address;

    public function __construct()
    {
        parent::__construct();
        $this->resources = new ArrayCollection();
        $this->citizenRelationships = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Resource[]
     */
    public function getResources(): Collection
    {
        return $this->resources;
    }

    public function addResource(Resource $resource): self
    {
        if (!$this->resources->contains($resource)) {
            $this->resources[] = $resource;
            $resource->setAuthor($this);
        }

        return $this;
    }

    public function removeResource(Resource $resource): self
    {
        if ($this->resources->removeElement($resource)) {
            // set the owning side to null (unless already changed)
            if ($resource->getAuthor() === $this) {
                $resource->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CitizenRelationship[]
     */
    public function getCitizenRelationships(): Collection
    {
        return $this->citizenRelationships;
    }

    public function addCitizenRelationship(CitizenRelationship $citizenRelationship): self
    {
        if (!$this->citizenRelationships->contains($citizenRelationship)) {
            $this->citizenRelationships[] = $citizenRelationship;
            $citizenRelationship->setUser1($this);
        }

        return $this;
    }

    public function removeCitizenRelationship(CitizenRelationship $citizenRelationship): self
    {
        if ($this->citizenRelationships->removeElement($citizenRelationship)) {
            // set the owning side to null (unless already changed)
            if ($citizenRelationship->getUser1() === $this) {
                $citizenRelationship->setUser1(null);
            }
        }

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): self
    {
        $this->address = $address;

        return $this;
    }
}
