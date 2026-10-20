"use server";

import { hasErrors, readContact, validateContact, type FieldErrors } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: FieldErrors;
};

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const fields = readContact(formData);

  if (fields.company) {
    return {
      status: "success",
      message: "Gracias. Tu mensaje quedó listo.",
      fieldErrors: {},
    };
  }

  const fieldErrors = validateContact(fields);

  if (hasErrors(fieldErrors)) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors,
    };
  }

  return {
    status: "success",
    message:
      "Se abrió tu aplicación de correo con el mensaje listo para enviar. Si no apareció, escríbeme directo al correo de esta página.",
    fieldErrors: {},
  };
}
