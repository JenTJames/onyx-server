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
    }
}, {
    hooks: {
        beforeCreate: async (project: any, options: any) => {
            const transaction: Transaction = await database.transaction();

            try {
                // Fetch the last project ID in a transactional context
                const lastProject = await Project.findOne({
                    order: [['id', 'DESC']],
                    transaction, // Ensure this query is part of the transaction
                });

                // Generate the new ID
                const lastId = lastProject?.id || 'PRJ000';
                const numberPart = parseInt(lastId.replace('PRJ00', ''), 10);
                project.id = `PRJ00${numberPart + 1}`;

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