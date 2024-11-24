import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export default interface Role
  extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  id: CreationOptional<number>;
  name: string;
}
