import { ScheduleService } from "../schedule.service";

export async function scheduleMockFactory(
  service: ScheduleService,
  clientIds: string[]
) {
  clientIds.forEach(async (clientId) => {
    await service.create({
      timestamp: 1709303593000,
      clientId,
    });
  });
}
