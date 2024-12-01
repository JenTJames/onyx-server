import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export default interface Status
  extends Model<InferAttributes<Status>, InferCreationAttributes<Status>> {
  id: CreationOptional<number>;
  title: string;
}
