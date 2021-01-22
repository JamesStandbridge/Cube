<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210122195308 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE citizen_relationship ADD user1_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD user2_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT FK_8225F95956AE248B FOREIGN KEY (user1_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT FK_8225F959441B8B65 FOREIGN KEY (user2_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8225F95956AE248B ON citizen_relationship (user1_id)');
        $this->addSql('CREATE INDEX IDX_8225F959441B8B65 ON citizen_relationship (user2_id)');
        $this->addSql('ALTER TABLE comment ADD user_entity_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C81C5F0B9 FOREIGN KEY (user_entity_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_9474526C81C5F0B9 ON comment (user_entity_id)');
        $this->addSql('ALTER TABLE fos_user ADD lastname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE fos_user ADD firstname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE resource_content_value ADD attribute_id INT NOT NULL');
        $this->addSql('ALTER TABLE resource_content_value ALTER resource_id SET NOT NULL');
        $this->addSql('ALTER TABLE resource_content_value ADD CONSTRAINT FK_BF582A20B6E62EFA FOREIGN KEY (attribute_id) REFERENCES resource_attribute (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_BF582A20B6E62EFA ON resource_content_value (attribute_id)');
        $this->addSql('ALTER TABLE resource_user_state ADD user_entity_id INT NOT NULL');
        $this->addSql('ALTER TABLE resource_user_state ADD resource_id INT NOT NULL');
        $this->addSql('ALTER TABLE resource_user_state ADD CONSTRAINT FK_21496E2581C5F0B9 FOREIGN KEY (user_entity_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_user_state ADD CONSTRAINT FK_21496E2589329D25 FOREIGN KEY (resource_id) REFERENCES resource (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_21496E2581C5F0B9 ON resource_user_state (user_entity_id)');
        $this->addSql('CREATE INDEX IDX_21496E2589329D25 ON resource_user_state (resource_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT FK_8225F95956AE248B');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT FK_8225F959441B8B65');
        $this->addSql('DROP INDEX IDX_8225F95956AE248B');
        $this->addSql('DROP INDEX IDX_8225F959441B8B65');
        $this->addSql('ALTER TABLE citizen_relationship DROP user1_id');
        $this->addSql('ALTER TABLE citizen_relationship DROP user2_id');
        $this->addSql('ALTER TABLE resource_user_state DROP CONSTRAINT FK_21496E2581C5F0B9');
        $this->addSql('ALTER TABLE resource_user_state DROP CONSTRAINT FK_21496E2589329D25');
        $this->addSql('DROP INDEX IDX_21496E2581C5F0B9');
        $this->addSql('DROP INDEX IDX_21496E2589329D25');
        $this->addSql('ALTER TABLE resource_user_state DROP user_entity_id');
        $this->addSql('ALTER TABLE resource_user_state DROP resource_id');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C81C5F0B9');
        $this->addSql('DROP INDEX IDX_9474526C81C5F0B9');
        $this->addSql('ALTER TABLE comment DROP user_entity_id');
        $this->addSql('ALTER TABLE fos_user DROP lastname');
        $this->addSql('ALTER TABLE fos_user DROP firstname');
        $this->addSql('ALTER TABLE resource_content_value DROP CONSTRAINT FK_BF582A20B6E62EFA');
        $this->addSql('DROP INDEX IDX_BF582A20B6E62EFA');
        $this->addSql('ALTER TABLE resource_content_value DROP attribute_id');
        $this->addSql('ALTER TABLE resource_content_value ALTER resource_id DROP NOT NULL');
    }
}
