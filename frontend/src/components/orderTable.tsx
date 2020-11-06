import * as React from 'react';
import { Table, Tag, Space } from 'antd';
import Order from '../types/order'
import { OrderHttpService } from '../services/orderHttpService';

interface IOrdersState {
  orders: Order[];
}

class OrderTable extends React.Component<{}, IOrdersState> {
	state: Readonly<IOrdersState> = {
        orders: [],
    }
	
	constructor(props: any) {
		super(props);
		
		this.state = { orders: [] };
	}
	
	async componentDidMount() {
		this.setState({ orders: await OrderHttpService.getAllOrders() });
	}

    render() {
		const columns = [
		  {
			title: 'Sales Order Id',
			dataIndex: 'salesOrderId',
			key: 'salesOrderId',
		  },
		  {
			title: 'Customer Id',
			dataIndex: 'customerId',
			key: 'customerId',
		  },
		  {
			title: 'Comment',
			dataIndex: 'comment',
			key: 'comment',
		  },
		  {
			title: 'Order Date',
			key: 'orderDate',
			dataIndex: 'orderDate',
		  },
		  {
			title: 'Action',
			key: 'action',
			render: (text: string, record: any) => (
			  <Space size="middle">
				<a>Pедактировать</a>
				<a>Oткрыть</a>
			  </Space>
			),
		  },
		];

		const data = this.state.orders;

        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default OrderTable;