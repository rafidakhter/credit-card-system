import { Injectable } from '@nestjs/common';
import { Prisma, AuditLog } from '@prisma/client';

type CreateAuditLogInput = {
  actorCustomerId: string;
  action: string;
  targetType: string;
  targetId: string;
  metadata?: Prisma.JsonValue;
};

@Injectable()
export class AuditService {
  async createAuditLog(
    tx: Prisma.TransactionClient,
    input: CreateAuditLogInput,
  ): Promise<AuditLog> {
    return tx.auditLog.create({
      data: {
        actorCustomerId: input.actorCustomerId,
        action: input.action,
        targetType: input.targetType,
        targetId: input.targetId,
        metadata: input.metadata,
      },
    });
  }
}
