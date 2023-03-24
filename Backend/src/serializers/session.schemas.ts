import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISessionRequest } from "../interfaces/sessions";

const createSessionSchema: SchemaOf<ISessionRequest> = yup.object().shape({
  firstEmail: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

export { createSessionSchema };
