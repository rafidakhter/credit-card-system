import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
	constructor(private readonly prisma: PrismaService) { }

	async getCustomerOrThrow(customerId: string): Promise<Customer> {
		const customer = await this.prisma.customer.findUnique({
			where: { id: customerId },
		});

		if (!customer) {
			throw new NotFoundException('Customer not found');
		}

		return customer;
	}
}