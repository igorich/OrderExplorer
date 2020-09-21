import { Order, OrderDetails } from 'src/types';
import { HttpService } from './httpService';

export const OrderHttpService = {
    async getOrderDetails(): Promise<OrderDetails> {
        return HttpService.get(`ENTITY/pendingVacations`);
    },


    async getAllOrders(): Promise<Order[]> {
        return Promise.resolve([
			{
				salesOrderId: 1,
				customerId: 1,
				salesStatusId: 1,
				comment: 'comment 1',
				orderDate: '01.01.1970',
			},
			{
				salesOrderId: 2,
				customerId: 2,
				salesStatusId: 2,
				comment: 'comment 2',
				orderDate: '02.01.1970',
			},
			{
				salesOrderId: 3,
				customerId: 3,
				salesStatusId: 3,
				comment: 'comment 3',
				orderDate: '03.01.1970',
			},
		]);
    }
}
