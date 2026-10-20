import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const winAnsi = {
  á: 0xe1,
  é: 0xe9,
  í: 0xed,
  ó: 0xf3,
  ú: 0xfa,
  Á: 0xc1,
  É: 0xc9,
  Í: 0xcd,
  Ó: 0xd3,
  Ú: 0xda,
  ñ: 0xf1,
  Ñ: 0xd1,
  ü: 0xfc,
  Ü: 0xdc,
  "¿": 0xbf,
  "¡": 0xa1,
  "·": 0xb7,
  "–": 0x96,
  "—": 0x97,
};

function escapePdf(value) {
  let output = "";
  for (const char of value) {
    if (char === "(" || char === ")" || char === "\\") {
      output += `\\${char}`;
      continue;
    }
    const code = winAnsi[char] ?? char.charCodeAt(0);
    if (code > 255) {
      output += "?";
      continue;
    }
    output += code > 127 ? `\\${code.toString(8).padStart(3, "0")}` : char;
  }
  return output;
}

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const ink = "0.063 0.078 0.063";
const paper = "0.953 0.937 0.902";
const signal = "0.843 0.937 0.416";
const copper = "0.604 0.243 0.118";
const muted = "0.369 0.353 0.314";

const commands = [];

function rect(x, y, width, height, color) {
  commands.push(`${color} rg ${x} ${y} ${width} ${height} re f`);
}

function text(font, size, x, y, color, value) {
  commands.push(
    `${color} rg BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`,
  );
}

rect(0, 0, 612, 792, paper);
rect(0, 700, 612, 92, ink);
rect(48, 700, 72, 4, signal);

text("F2", 28, 48, 748, "1 1 1", "Daniela Prado");
text("F1", 12, 48, 724, signal, "Ingeniera en Sistemas Computacionales");
text(
  "F1",
  9,
  48,
  676,
  muted,
  "danipradomolina@gmail.com   ·   github.com/danilevinger   ·   linkedin.com/in/danilevinger",
);

let cursor = 642;

function heading(label) {
  cursor -= 8;
  text("F2", 11, 48, cursor, copper, label.toUpperCase());
  cursor -= 8;
  rect(48, cursor, 516, 0.6, "0.82 0.78 0.72");
  cursor -= 18;
}

function paragraph(value, size = 10.5, color = ink, max = 92) {
  for (const line of wrap(value, max)) {
    text("F1", size, 48, cursor, color, line);
    cursor -= size + 5;
  }
}

function bullet(value) {
  text("F1", 10.5, 58, cursor, ink, `•  ${value}`);
  cursor -= 16;
}

heading("Perfil");
paragraph(
  "Diseño y desarrollo software de punta a punta: interfaces claras, servicios estables y datos bien modelados. Me interesa convertir problemas reales en sistemas útiles, con criterio analítico y atención a la mejora de procesos.",
);

heading("Habilidades");
bullet("Frontend: HTML, CSS, JavaScript, TypeScript, React, Next.js y Tailwind CSS.");
bullet("Backend: Node.js, Python, C# y .NET.");
bullet("Bases de datos: SQL Server.");
bullet("Herramientas: Git, GitHub, Postman y Vercel.");

heading("Formación");
text("F2", 12, 48, cursor, ink, "Bachillerato en Ingeniería en Sistemas Computacionales");
cursor -= 16;
text("F1", 10, 48, cursor, muted, "Universidad Latina de Costa Rica  ·  2021–2025");
cursor -= 22;

heading("Proyectos");
const projects = [
  "Tienda de ropa — Share Fashion, tienda en línea para ver prendas y completar una compra.",
  "Sistema de gestión de inventario — Carga de códigos y consulta del inventario de productos.",
  "Control de almuerzos — Registro del tiempo de almuerzo y consulta del día.",
];
for (const project of projects) bullet(project);

text("F1", 8, 48, 36, muted, "Daniela Prado  ·  Ingeniera en Sistemas Computacionales");

const stream = commands.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

const output = join(dirname(fileURLToPath(import.meta.url)), "../public/cv/daniela-prado-cv.pdf");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, pdf);
console.log(output);
