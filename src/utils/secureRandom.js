const cryptoRandomInt = (exclusiveMax) => {
  if (!Number.isInteger(exclusiveMax) || exclusiveMax <= 0) return 0;
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % exclusiveMax);
  const buffer = new Uint32Array(1);

  let value = maxUint32;
  while (value >= limit) {
    window.crypto.getRandomValues(buffer);
    value = buffer[0];
  }

  return value % exclusiveMax;
};

export function secureRandomWinner(participants, options = {}) {
  const avoidIds = new Set(options.avoidIds || []);
  const eligible = participants.filter(
    (participant) => !avoidIds.has(participant.id),
  );
  const pool = eligible.length > 0 ? eligible : participants;
  if (!pool.length) return null;
  return pool[cryptoRandomInt(pool.length)];
}
