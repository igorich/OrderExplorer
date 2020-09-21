import * as React from 'react';
import { Table, Tag, Space } from 'antd';
import Order from '../types'
import { OrderHttpService } from 'services/OrderHttpService';

class OrderTable extends React.Component {

    render() {
		const columns = [
		  {
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		  },
		  {
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		  },
		  {
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		  },
		  {
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
		  },
		  {
			title: 'Action',
			key: 'action',
			render: (text: string, record: any) => (
			  <Space size="middle">
				<a>Редактировать</a>
				<a>Открыть</a>
			  </Space>
			),
		  },
		];

		const data = orderService.getAllOrders()
			.then((response: Order[]) => {
				this.setState({orders: response});
			})
			.catch(() => console.log('Failed to update orders list'));

        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default OrderTable;