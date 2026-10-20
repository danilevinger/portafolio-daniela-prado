"use client";

import { useActionState, useState, type FormEvent, type ReactNode } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { buttonClass } from "@/components/button-styles";
import {
  buildMailto,
  hasErrors,
  readContact,
  validateContact,
  type ContactFieldName,
  type FieldErrors,
} from "@/lib/contact";

const initialState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

const fieldClass =
  "w-full border border-ink/15 bg-paper px-4 py-3 text-base text-ink transition placeholder:text-muted/80 focus:border-pine";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [localErrors, setLocalErrors] = useState<FieldErrors>({});
  const errors = hasErrors(localErrors) ? localErrors : state.fieldErrors;

  function clearField(field: ContactFieldName) {
    setLocalErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = readContact(formData);

    if (!fields.company) {
      const nextErrors = validateContact(fields);
      if (hasErrors(nextErrors)) {
        setLocalErrors(nextErrors);
        const order: ContactFieldName[] = ["name", "email", "subject", "message"];
        const ids: Record<ContactFieldName, string> = {
          name: "nombre",
          email: "correo",
          subject: "asunto",
          message: "mensaje",
        };
        const firstInvalid = order.find((field) => nextErrors[field]);
        if (firstInvalid) document.getElementById(ids[firstInvalid])?.focus();
        return;
      }
      window.location.href = buildMailto(fields);
    }

    setLocalErrors({});
    form.reset();
    formAction(formData);
  }

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="relative border border-white/10 bg-paper p-6 text-ink md:p-8"
    >
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Empresa
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="nombre" label="Nombre" error={errors.name}>
          <input
            id="nombre"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder="Tu nombre"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "nombre-error" : undefined}
            className={fieldClass}
            onChange={() => clearField("name")}
          />
        </Field>
        <Field id="correo" label="Correo" error={errors.email}>
          <input
            id="correo"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            placeholder="tu@correo.com"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "correo-error" : undefined}
            className={fieldClass}
            onChange={() => clearField("email")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="asunto" label="Asunto" error={errors.subject}>
          <input
            id="asunto"
            name="subject"
            type="text"
            maxLength={120}
            placeholder="Oportunidad laboral o proyecto"
            aria-required="true"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "asunto-error" : undefined}
            className={fieldClass}
            onChange={() => clearField("subject")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="mensaje" label="Mensaje" error={errors.message}>
          <textarea
            id="mensaje"
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="Hola Daniela, me gustaría conversar sobre..."
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "mensaje-error" : undefined}
            className={`${fieldClass} resize-y`}
            onChange={() => clearField("message")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={`${buttonClass.base} ${buttonClass.ink} disabled:cursor-wait disabled:opacity-70`}
        >
          {pending ? "Enviando..." : "Enviar mensaje"}
        </button>
        <p aria-live="polite" className="max-w-sm text-sm leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-copper">
          {error}
        </p>
      ) : null}
    </div>
  );
}
