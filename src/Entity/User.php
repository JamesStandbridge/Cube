<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="fos_user")
 * @ApiResource
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups("read:resources")
     * @groups("app:read:relations")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity=Resource::class, mappedBy="author")
     * @ApiSubresource
     */
    private $resources;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups("read:resources")
     * @groups("app:read:relations")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"resource:read", "comments:read"})
     * @groups("read:resources")
     * @groups("app:read:relations")
     */
    private $firstname;

    /**
     * @ORM\ManyToOne(targetEntity=Address::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $address;

    /**
     * @ORM\OneToMany(targetEntity=CitizenRelationship::class, mappedBy="UserSource", orphanRemoval=true)
     */
    private $relationships;

    public function __construct()
    {
        parent::__construct();
        $this->resources = new ArrayCollection();
        $this->citizenRelationships = new ArrayCollection();
        $this->relationships = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getFirstname().' '.$this->getLastname();
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

    /**
     * @return Collection|CitizenRelationship[]
     */
    public function getRelationships(): Collection
    {
        return $this->relationships;
    }

    public function addRelationship(CitizenRelationship $relationship): self
    {
        if (!$this->relationships->contains($relationship)) {
            $this->relationships[] = $relationship;
            $relationship->setUserSource($this);
        }

        return $this;
    }

    public function removeRelationship(CitizenRelationship $relationship): self
    {
        if ($this->relationships->removeElement($relationship)) {
            // set the owning side to null (unless already changed)
            if ($relationship->getUserSource() === $this) {
                $relationship->setUserSource(null);
            }
        }

        return $this;
    }
}
