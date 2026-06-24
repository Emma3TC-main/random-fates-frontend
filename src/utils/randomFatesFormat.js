export const stateLabels = {
  DRAFT: "Borrador",
  ACTIVE: "Publicado",
  FINISHED: "Finalizado",
  CANCELLED: "Cancelado",
};

export const stateStyles = {
  DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  FINISHED: "bg-cyan-100 text-cyan-700 border-cyan-200",
  CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
};

export const typeLabels = {
  ROULETTE: "Ruleta",
  RANDOM_PICKER: "Selección aleatoria",
  SLOT: "Slots",
};

export const roleLabels = {
  ADMIN: "Administrador",
  USER: "Usuario",
  PREMIUM: "Premium",
};

export function labelState(state) {
  return stateLabels[state] || state || "Sin estado";
}

export function labelType(type) {
  return typeLabels[type] || type || "Sorteo";
}

export function shortId(value = "") {
  if (!value) return "—";
  return `${String(value).slice(0, 8)}…`;
}

export function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function getWinnerFromExecution(execution) {
  const winner = execution?.result?.winners?.[0];
  if (!winner) return null;
  return {
    ...winner,
    id: winner.participant?.id || winner.id,
    name: winner.participant?.fullName || "Ganador",
    fullName: winner.participant?.fullName,
    identifier: winner.participant?.identifier,
    email: winner.participant?.email,
    prizeName: winner.prize?.name,
    verificationHash: execution?.result?.verificationHash,
    seedHash: execution?.seedHash,
  };
}

export function getParticipantCount(raffle) {
  return Number(raffle?.metrics?.participants || raffle?._count?.participants || 0);
}

export function getPrizeCount(raffle) {
  return Number(raffle?.metrics?.prizes || raffle?.prizes?.length || 0);
}
