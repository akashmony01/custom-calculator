-- CreateTable
CREATE TABLE `Tbl_Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tbl_Calculator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calc_name` VARCHAR(50) NOT NULL,
    `calc_desc` LONGTEXT NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tbl_Expression` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expression` LONGTEXT NOT NULL,
    `o_id` INTEGER NOT NULL,

    UNIQUE INDEX `Tbl_Expression_o_id_key`(`o_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tbl_Input` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disp_name` VARCHAR(50) NOT NULL,
    `var_name` VARCHAR(50) NOT NULL,
    `c_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tbl_Output` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disp_name` VARCHAR(50) NOT NULL,
    `c_id` INTEGER NOT NULL,

    UNIQUE INDEX `Tbl_Output_c_id_key`(`c_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tbl_Expression` ADD CONSTRAINT `Tbl_Expression_o_id_fkey` FOREIGN KEY (`o_id`) REFERENCES `Tbl_Output`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tbl_Input` ADD CONSTRAINT `Tbl_Input_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `Tbl_Calculator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tbl_Output` ADD CONSTRAINT `Tbl_Output_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `Tbl_Calculator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
