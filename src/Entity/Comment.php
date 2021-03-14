<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={"groups"="comment:read"},
 *     denormalizationContext={"groups"="comment:create"},
 *     collectionOperations={"get"={"normalization_context"={"groups"="comments:read"}},
 *          "post"={"denormalization_context"={"groups"="comment:create"}}},
 *     itemOperations={"get"={"normalization_context"={"groups"="comment:read"}},
 *          "put"={"denormalization_context"={"groups"="comment:update"}},
 *          "delete"={"normalization_context"={"groups"="comment:remove"}}},
 *     subresourceOperations={
 *          "api_resources_comments_get_subresource"={
 *              "method"="GET",
 *              "normalization_context"={
 *                  "groups"={
 *                      "comments:read"
 *                  }
 *              }
 *          }
 *     },
 *     order={"createdAt"="ASC"},
 * )
 * @ApiFilter(SearchFilter::class, properties={"resource": "exact"})
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"comments:read","comment:read","comment:create"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     *
     * @Groups({"comments:read","comment:read","comment:create"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"comments:read","comment:read","comment:create"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"comments:read","comment:read"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"comments:read","comment:read"})
     */
    private $isValidated;

    /**
     * @ORM\OneToOne(targetEntity=Comment::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"comments:read","comment:create","comment:read"})
     *
     */
    private $parentComment;

    /**
     * @ORM\ManyToOne(targetEntity=Resource::class, inversedBy="comments")
     * @Groups({"comment:create"})
     */
    private $resource;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"comments:read","comment:create","comment:read"})
     */
    private $userEntity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

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

    public function getIsValidated(): ?bool
    {
        return $this->isValidated;
    }

    public function setIsValidated(bool $isValidated): self
    {
        $this->isValidated = $isValidated;

        return $this;
    }

    public function getParentComment(): ?self
    {
        return $this->parentComment;
    }

    public function setParentComment(?self $parentComment): self
    {
        $this->parentComment = $parentComment;

        return $this;
    }

    public function getResource(): ?Resource
    {
        return $this->resource;
    }

    public function setResource(?Resource $resource): self
    {
        $this->resource = $resource;

        return $this;
    }

    public function getUserEntity(): ?User
    {
        return $this->userEntity;
    }

    public function setUserEntity(?User $userEntity): self
    {
        $this->userEntity = $userEntity;

        return $this;
    }
}
