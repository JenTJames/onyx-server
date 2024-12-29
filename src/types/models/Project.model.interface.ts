import {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

export default interface Project
    extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    id: CreationOptional<string>;
    title: string,
    description: string,
}
