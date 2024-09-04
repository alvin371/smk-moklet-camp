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



const UserPages: React.FC = () => {
    const [users, setUsers] = useState<User[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const userFetch = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data, 'data');
                setUsers(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        userFetch();
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
                <Table columns={columns} dataSource={users?.map(user => ({ ...user, key: user.id.toString() }))} />
            </div>
        </Layout>
    );
};

export default UserPages;
