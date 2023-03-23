import * as yup from "yup";
import { IClientRequest, IClientResponse } from "../interfaces/clients";
import { SchemaOf } from "yup";

const clientSerializer: SchemaOf<IClientRequest> = yup.object().shape({
  name: yup.string().max(50).required(),
  firstEmail: yup.string().max(50).email().required(),
  secondaryEmail: yup.string().max(50).email().notRequired(),
  mainPhone: yup
    .string()
    .max(20)
    .matches(
      /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
      "Telefone inválido"
    )
    .required(),
  secondaryPhone: yup
    .string()
    .max(20)
    .matches(
      /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
      "Telefone inválido"
    )
    .notRequired(),
  password: yup.string().min(4).max(120).required(),
});

const clientWithoutPasswordSerializer: SchemaOf<IClientResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().max(50).required(),
    firstEmail: yup.string().max(50).email().required(),
    secondaryEmail: yup.string().max(50).email().nullable(true),
    mainPhone: yup
      .string()
      .max(20)
      .matches(
        /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
        "Telefone inválido"
      )
      .required(),
    secondaryPhone: yup
      .string()
      .max(20)
      .matches(
        /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
        "Telefone inválido"
      )
      .nullable(true),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    isActive: yup.boolean().notRequired(),
  });

export { clientSerializer, clientWithoutPasswordSerializer };
