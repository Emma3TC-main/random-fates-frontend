import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  FileSpreadsheet,
  Lock,
  UploadCloud,
  XCircle,
} from "lucide-react";

const splitCsvLine = (line) => {
  const output = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      output.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  output.push(current.trim());
  return output;
};

const normalizeHeader = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const findColumn = (headers, aliases) => {
  const normalizedAliases = aliases.map(normalizeHeader);
  return headers.findIndex((header) =>
    normalizedAliases.includes(normalizeHeader(header)),
  );
};

const parseCsv = (text) => {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length)
    return { participants: [], errors: ["El archivo está vacío."] };

  const first = splitCsvLine(lines[0]);
  const hasHeader = first.some((item) =>
    /nombre|name|email|correo|dni|identifier|identificador/i.test(item),
  );
  const headers = hasHeader ? first : ["fullName", "identifier", "email"];
  const rows = hasHeader ? lines.slice(1) : lines;

  const nameIndex = findColumn(headers, [
    "fullName",
    "nombre",
    "name",
    "participante",
  ]);
  const identifierIndex = findColumn(headers, [
    "identifier",
    "identificador",
    "dni",
    "documento",
    "codigo",
    "id",
  ]);
  const emailIndex = findColumn(headers, ["email", "correo", "mail"]);

  const errors = [];
  const seen = new Set();
  const participants = [];

  rows.forEach((line, index) => {
    const cols = splitCsvLine(line);
    const fullName = String(cols[nameIndex >= 0 ? nameIndex : 0] || "").trim();
    const identifier = String(
      cols[identifierIndex >= 0 ? identifierIndex : 1] || "",
    )
      .trim()
      .toUpperCase();
    const email =
      emailIndex >= 0
        ? String(cols[emailIndex] || "")
            .trim()
            .toLowerCase()
        : undefined;
    const rowNumber = hasHeader ? index + 2 : index + 1;

    if (!fullName || !identifier) {
      errors.push(
        `Fila ${rowNumber}: nombre e identificador son obligatorios.`,
      );
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(`Fila ${rowNumber}: correo inválido.`);
      return;
    }

    if (seen.has(identifier)) {
      errors.push(
        `Fila ${rowNumber}: identificador duplicado (${identifier}).`,
      );
      return;
    }

    seen.add(identifier);
    participants.push({
      fullName,
      identifier,
      email: email || undefined,
      source: "CSV",
    });
  });

  return { participants, errors };
};

export default function CsvParticipantsImporter({ onImport, busy, account }) {
  const inputRef = useRef(null);
  const [filename, setFilename] = useState("frontend-form.csv");
  const [participants, setParticipants] = useState([]);
  const [errors, setErrors] = useState([]);

  const allowCsv = account?.entitlements?.allowCsvImport !== false;
  const maxBulk = account?.entitlements?.maxBulkParticipants ?? 0;
  const isOverLimit = maxBulk >= 0 && participants.length > maxBulk;

  const summary = useMemo(() => {
    const validEmails = participants.filter(
      (participant) => participant.email,
    ).length;
    return `${participants.length} filas válidas · ${validEmails} con email`;
  }, [participants]);

  const handleFile = async (file) => {
    if (!file) return;
    setFilename(file.name);
    const text = await file.text();
    const parsed = parseCsv(text);
    setParticipants(parsed.participants);
    setErrors(parsed.errors);
  };

  const loadTemplate = () => {
    const template = `fullName,identifier,email\nAna Torres,DNI-001,ana@test.com\nLuis Rojas,DNI-002,luis@test.com\nMaría Pérez,DNI-003,maria@test.com`;
    const parsed = parseCsv(template);
    setFilename("template-demo.csv");
    setParticipants(parsed.participants);
    setErrors(parsed.errors);
  };

  if (!allowCsv) {
    return (
      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-center gap-3 text-amber-800">
          <Lock size={22} />
          <h3 className="text-xl font-bold">CSV disponible en Premium</h3>
        </div>
        <p className="mt-3 text-sm text-amber-800/80">
          En Free puedes registrar participantes de forma manual y tienes
          intentos limitados. Actualiza tu plan para importar CSV, validar filas
          y crear lotes completos automáticamente.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <FileSpreadsheet className="text-cyan-500" /> Carga CSV inteligente
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Columnas aceptadas: fullName/nombre, identifier/dni/id y
            email/correo.
          </p>
        </div>
        <button
          type="button"
          onClick={loadTemplate}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          Usar demo
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-cyan-300 bg-cyan-50/70 p-5 text-center">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900 hover:bg-cyan-300"
        >
          <UploadCloud size={18} /> Seleccionar CSV
        </button>
        <p className="mt-3 text-sm font-semibold text-cyan-900">{filename}</p>
        <p className="text-xs text-cyan-800">{summary}</p>
      </div>

      {errors.length > 0 && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <AlertTriangle size={16} /> Observaciones del CSV
          </div>
          <ul className="max-h-32 list-disc overflow-y-auto pl-5">
            {errors.slice(0, 12).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {isOverLimit && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          <XCircle size={16} /> Este lote supera el máximo de tu plan ({maxBulk}
          ).
        </div>
      )}

      {participants.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
          <div className="max-h-56 overflow-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="sticky top-0 bg-slate-100 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Identificador</th>
                  <th className="px-4 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {participants.slice(0, 50).map((participant) => (
                  <tr
                    key={participant.identifier}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {participant.fullName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.identifier}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {participant.email || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        disabled={
          busy || participants.length === 0 || errors.length > 0 || isOverLimit
        }
        onClick={() => onImport(participants, filename)}
        className="mt-4 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-900 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Importar participantes válidos
      </button>
    </section>
  );
}
