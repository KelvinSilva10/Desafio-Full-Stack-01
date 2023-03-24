import * as Yup from "yup";

const contactSerializer = Yup.object().shape({
  name: Yup.string().max(50).required(),
  firstEmail: Yup.string().email().max(50).required(),
  secondaryEmail: Yup.string().email().max(50).optional(),
  mainPhone: Yup.string().max(20).required(),
  secondaryPhone: Yup.string().max(20).optional(),
});

const contactResponseSerializer = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  firstEmail: Yup.string().email().required(),
  secondaryEmail: Yup.string().email().nullable(),
  mainPhone: Yup.string().required(),
  secondaryPhone: Yup.string().nullable(),
  isActive: Yup.boolean().required(),
  createdAt: Yup.date().required(),
  updatedAt: Yup.date().required(),
  client: Yup.object()
    .shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      firstEmail: Yup.string().email().required(),
    })
    .required(),
});

export const contactUpdateSerializer = Yup.object().shape({
  name: Yup.string(),
  firstEmail: Yup.string().email(),
  secondaryEmail: Yup.string().nullable().email(),
  mainPhone: Yup.string(),
  secondaryPhone: Yup.string().nullable(),
});

export { contactSerializer, contactResponseSerializer };
