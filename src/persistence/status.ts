import Status from "../models/Status";

export const findStatuses = async () => await Status.findAll();
