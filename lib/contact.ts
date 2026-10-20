import { profile } from "@/data/profile";

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

export type ContactFieldName = "name" | "email" | "subject" | "message";

export type FieldErrors = Partial<Record<ContactFieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function readContact(formData: FormData): ContactFields {
  return {
    name: singleLine(String(formData.get("name") ?? "")),
    email: singleLine(String(formData.get("email") ?? "")),
    subject: singleLine(String(formData.get("subject") ?? "")),
    message: String(formData.get("message") ?? "").trim(),
    company: singleLine(String(formData.get("company") ?? "")),
  };
}

export function validateContact(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};

  if (fields.name.length < 2) {
    errors.name = "Escribe tu nombre.";
  } else if (fields.name.length > 80) {
    errors.name = "El nombre es demasiado largo.";
  }

  if (fields.email.length > 120 || !emailPattern.test(fields.email)) {
    errors.email = "Ingresa un correo válido.";
  }

  if (fields.subject.length < 3) {
    errors.subject = "Agrega un asunto breve.";
  } else if (fields.subject.length > 120) {
    errors.subject = "El asunto es demasiado largo.";
  }

  if (fields.message.length < 20) {
    errors.message = "Cuéntame un poco más: mínimo 20 caracteres.";
  } else if (fields.message.length > 2000) {
    errors.message = "El mensaje supera los 2000 caracteres.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}

export function buildMailto(fields: ContactFields) {
  const subject = encodeURIComponent(`[Portafolio] ${fields.subject}`);
  const body = encodeURIComponent(
    `Nombre: ${fields.name}\nCorreo: ${fields.email}\n\n${fields.message}`,
  );

  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}
