<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\ResourceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResourceRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={"groups"="resource:read"},
 *     collectionOperations={"get"={"normalization_context"={"groups"="resource:read"}},
 *          "post"={"denormalization_context"={"groups"="resource:create"}}},
 *     itemOperations={"get"={"normalization_context"={"groups"="resource:read", "resource:read:full"}},
 *          "put"={"denormalization_context"={"groups"="resource:update"}},
 *          "delete"={"normalization_context"={"groups"="resource:remove"}}},
 *     order={"createdAt"="DESC"},
 *     paginationEnabled=true,
 *     subresourceOperations={
 *          "api_user_resources_get_subresource"={
 *              "method"="GET",
 *              "path"="/user/{id}/resources",
 *          }
 *     }
 * )
 */
class Resource
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"resource:read"})
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     * @groups("read:resources")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"resource:read", "resource:create", "resource:update"})
     * @groups("read:resource_state")
     * @groups("read:resources")
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=ResourceType::class, inversedBy="resources")
     * @Groups({"resource:read", "resource:create"})
     * @groups("read:resources")
     */
    private $type;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"resource:list", "resource:read", "resource:create"})
     * @groups("read:resources")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime",nullable=true)
     * @groups("read:resources")
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups("read:resources")
     */
    private $numberViews;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"resource:read"})
     * @groups("read:resources")
     */
    private $isValidated;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="resources")
     * @Groups({"resource:read", "resource:create"})
     * @groups("read:resources")
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity=ResourceContentValue::class, mappedBy="resource", cascade="persist")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"resource:read", "resource:create"})
     */
    private $content;

    /**
     * @ORM\Column(type="boolean",nullable=true)
     *
     * @Groups({"resource:read"})
     * @groups("read:resources")
     */
    private $isPublic;

    /**
     * @ORM\ManyToMany(targetEntity=TypeOfRelationship::class, inversedBy="resources")
     * @ORM\JoinColumn(nullable=true)
     * @groups("read:resources")
     */
    private $typeofrelationship;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="resources")
     * @Groups({"resource:read", "resource:create"})
     * @groups("read:resources")
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="resource")
     * @ORM\JoinColumn(nullable=true)
     * @ApiSubresource
     */
    private $comments;

    public function __construct()
    {
        $this->content = new ArrayCollection();
        $this->typeofrelationship = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getType(): ?ResourceType
    {
        return $this->type;
    }

    public function setType(?ResourceType $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getNumberViews(): ?int
    {
        return $this->numberViews;
    }

    public function setNumberViews(int $numberViews): self
    {
        $this->numberViews = $numberViews;

        return $this;
    }

    public function getIsValidated(): ?bool
    {
        return $this->isValidated;
    }

    public function setIsValidated(bool $isValidated): self
    {
        $this->isValidated = $isValidated;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|ResourceContentValue[]
     */
    public function getContent(): Collection
    {
        return $this->content;
    }

    public function addContent(ResourceContentValue $content): self
    {
        if (!$this->content->contains($content)) {
            $this->content[] = $content;
            $content->setResource($this);
        }

        return $this;
    }

    public function removeContent(ResourceContentValue $content): self
    {
        if ($this->content->removeElement($content)) {
            // set the owning side to null (unless already changed)
            if ($content->getResource() === $this) {
                $content->setResource(null);
            }
        }

        return $this;
    }

    public function getIsPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): self
    {
        $this->isPublic = $isPublic;

        return $this;
    }

    /**
     * @return Collection|TypeOfRelationship[]
     */
    public function getTypeofrelationship(): Collection
    {
        return $this->typeofrelationship;
    }

    public function addTypeofrelationship(TypeOfRelationship $typeofrelationship): self
    {
        if (!$this->typeofrelationship->contains($typeofrelationship)) {
            $this->typeofrelationship[] = $typeofrelationship;
        }

        return $this;
    }

    public function removeTypeofrelationship(TypeOfRelationship $typeofrelationship): self
    {
        $this->typeofrelationship->removeElement($typeofrelationship);

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setResource($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getResource() === $this) {
                $comment->setResource(null);
            }
        }

        return $this;
    }
}
