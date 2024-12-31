import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from "sequelize";
import Project from "./Project.model.interface";

export default interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password?: string;

  getProjects: HasManyGetAssociationsMixin<Project>
}
