<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ApiResource(
 * collectionOperations = {"get" = {"normalization_context"= {"groups"="category:list"}}, "post" = {"denormalization_context"= {"groups"="category:create"}}},
 *     subresourceOperations={
 *          "api_resources_category_get_subresource"={
 *              "method"="GET",
 *              "path"="/resources/{id}/category"
 *          }},
 * )
 * 
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"category:list","category:create"})
     * @groups("read:resources")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"category:list","category:create","resource:list","resource:read"})
     * @groups("read:resources")
     *
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=Resource::class, mappedBy="category")
     * @Groups({"category:list"})
     */
    private $resources;

    public function __construct()
    {
        $this->resources = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
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
            $resource->setCategory($this);
        }

        return $this;
    }

    public function removeResource(Resource $resource): self
    {
        if ($this->resources->removeElement($resource)) {
            // set the owning side to null (unless already changed)
            if ($resource->getCategory() === $this) {
                $resource->setCategory(null);
            }
        }

        return $this;
    }
}
