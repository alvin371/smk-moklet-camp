import React, { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import Layout from "../../components/templates/Layouts";
import { Space, Table, Breadcrumb, Button } from 'antd';
import type { TableProps } from 'antd';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

const dummyData: User[] = [
    {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        address: {
            street: '123 Elm St',
            suite: 'Apt 4',
            city: 'Gotham',
            zipcode: '12345',
        },
    },
    {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        address: {
            street: '456 Oak St',
            suite: 'Suite 10',
            city: 'Metropolis',
            zipcode: '67890',
        },
    },
    {
        id: 3,
        name: 'Alice Johnson',
        username: 'alicejohnson',
        email: 'alicejohnson@example.com',
        address: {
            street: '789 Pine St',
            suite: 'Apt 2',
            city: 'Star City',
            zipcode: '11223',
        },
    },
    {
        id: 4,
        name: 'Bob Brown',
        username: 'bobbrown',
        email: 'bobbrown@example.com',
        address: {
            street: '101 Maple St',
            suite: 'Suite 5',
            city: 'Central City',
            zipcode: '33445',
        },
    },
    {
        id: 5,
        name: 'Charlie Davis',
        username: 'charliedavis',
        email: 'charliedavis@example.com',
        address: {
            street: '202 Cedar St',
            suite: 'Apt 3',
            city: 'Coast City',
            zipcode: '55667',
        },
    },
];

const UserPages: React.FC = () => {
    const [users, setUsers] = useState<User[]>(dummyData);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false); // No need for real fetching, so set loading to false immediately
    }, []);

    const columns: TableProps<User>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            key: 'address',
            render: ({ address }: User) => (
                <span>
                    {address.street}, {address.suite}, {address.city}, {address.zipcode}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="primary" icon={<PlusOutlined />} />
                    <Button type="primary" style={{ backgroundColor: 'green' }} icon={<EditOutlined />} />
                    <Button danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="flex justify-start ml-10 my-10">
                <Breadcrumb
                    items={[
                        {
                            href: '/',
                            title: <HomeOutlined />,
                        },
                        {
                            title: 'User List',
                        },
                    ]}
                />
            </div>
            <div className="my-20 flex justify-center">
                <Table columns={columns} dataSource={users.map(user => ({ ...user, key: user.id.toString() }))} />
            </div>
        </Layout>
    );
};

export default UserPages;
