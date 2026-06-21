import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

export const dashboardService = {
  async summary() {
    const rafflesResponse = await getData(endpoints.raffles.list({ page: 1, limit: 100 }));
    const raffles = Array.isArray(rafflesResponse) ? rafflesResponse : [];

    const totalRaffles = raffles.length;
    const activeRaffles = raffles.filter((raffle) => raffle.state === "ACTIVE").length;
    const finishedRaffles = raffles.filter((raffle) => raffle.state === "FINISHED").length;
    const totalParticipants = raffles.reduce(
      (sum, raffle) => sum + Number(raffle._count?.participants || 0),
      0,
    );

    return {
      totalRaffles,
      activeRaffles,
      finishedRaffles,
      totalParticipants,
      raffles,
    };
  },
};
