<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210211110829 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE resource_type_resource_attribute (resource_type_id INT NOT NULL, resource_attribute_id INT NOT NULL, PRIMARY KEY(resource_type_id, resource_attribute_id))');
        $this->addSql('CREATE INDEX IDX_B47442FF98EC6B7B ON resource_type_resource_attribute (resource_type_id)');
        $this->addSql('CREATE INDEX IDX_B47442FF3387A51C ON resource_type_resource_attribute (resource_attribute_id)');
        $this->addSql('ALTER TABLE resource_type_resource_attribute ADD CONSTRAINT FK_B47442FF98EC6B7B FOREIGN KEY (resource_type_id) REFERENCES resource_type (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_type_resource_attribute ADD CONSTRAINT FK_B47442FF3387A51C FOREIGN KEY (resource_attribute_id) REFERENCES resource_attribute (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_attribute DROP CONSTRAINT fk_52b3bc6498ec6b7b');
        $this->addSql('DROP INDEX idx_52b3bc6498ec6b7b');
        $this->addSql('ALTER TABLE resource_attribute DROP resource_type_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE resource_type_resource_attribute');
        $this->addSql('ALTER TABLE resource_attribute ADD resource_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE resource_attribute ADD CONSTRAINT fk_52b3bc6498ec6b7b FOREIGN KEY (resource_type_id) REFERENCES resource_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_52b3bc6498ec6b7b ON resource_attribute (resource_type_id)');
    }
}
