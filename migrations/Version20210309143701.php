<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210309143701 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT fk_8225f95956ae248b');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT fk_8225f959441b8b65');
        $this->addSql('DROP INDEX idx_8225f959441b8b65');
        $this->addSql('DROP INDEX idx_8225f95956ae248b');
        $this->addSql('ALTER TABLE citizen_relationship ADD type_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD user_source_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD user_target_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship DROP user1_id');
        $this->addSql('ALTER TABLE citizen_relationship DROP user2_id');
        $this->addSql('ALTER TABLE citizen_relationship DROP type');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT FK_8225F959C54C8C93 FOREIGN KEY (type_id) REFERENCES type_of_relationship (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT FK_8225F95995DC9185 FOREIGN KEY (user_source_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT FK_8225F959156E8682 FOREIGN KEY (user_target_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8225F959C54C8C93 ON citizen_relationship (type_id)');
        $this->addSql('CREATE INDEX IDX_8225F95995DC9185 ON citizen_relationship (user_source_id)');
        $this->addSql('CREATE INDEX IDX_8225F959156E8682 ON citizen_relationship (user_target_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT FK_8225F959C54C8C93');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT FK_8225F95995DC9185');
        $this->addSql('ALTER TABLE citizen_relationship DROP CONSTRAINT FK_8225F959156E8682');
        $this->addSql('DROP INDEX IDX_8225F959C54C8C93');
        $this->addSql('DROP INDEX IDX_8225F95995DC9185');
        $this->addSql('DROP INDEX IDX_8225F959156E8682');
        $this->addSql('ALTER TABLE citizen_relationship ADD user1_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD user2_id INT NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship ADD type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE citizen_relationship DROP type_id');
        $this->addSql('ALTER TABLE citizen_relationship DROP user_source_id');
        $this->addSql('ALTER TABLE citizen_relationship DROP user_target_id');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT fk_8225f95956ae248b FOREIGN KEY (user1_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE citizen_relationship ADD CONSTRAINT fk_8225f959441b8b65 FOREIGN KEY (user2_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8225f959441b8b65 ON citizen_relationship (user2_id)');
        $this->addSql('CREATE INDEX idx_8225f95956ae248b ON citizen_relationship (user1_id)');
    }
}
