import database from "../lib/database";
import { DataTypes, Transaction } from "sequelize";
import Project from "../types/models/Project.model.interface";

const Project = database.define<Project>("projects", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    hooks: {
        beforeCreate: async (project: any, options: any) => {
            const transaction: Transaction = await database.transaction();

            try {
                const lastProject = await Project.findOne({
                    order: [['id', 'DESC']],
                    transaction,
                });

                // Generate the new ID
                const lastId = lastProject?.id || 'PR000';
                const numberPart = +lastId.split("00")[1];
                console.log(numberPart);
                project.id = `PR00${numberPart + 1}`;

                // Commit the transaction
                await transaction.commit();
            } catch (error) {
                // Rollback the transaction in case of an error
                await transaction.rollback();
                throw error;
            }
        }
    }
});

export default Project;