import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export default interface Team
  extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  id: CreationOptional<number>;
  title: string;
}
