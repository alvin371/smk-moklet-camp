import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Layout from "../../components/templates/Layouts";
import {
  Space,
  Table,
  Breadcrumb,
  Button,
  notification,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import UsersModal from "./Modal";
import { IUser, deleteUser } from "./action";
import { SuspenseLoading } from "../../components";

const UserPages: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    userFetch();
    setLoading(false); // No need for real fetching, so set loading to false immediately
  }, []);

  // NOTES: The following code is commented out, waiting for function update or edit users
  //   const handleSubmit = async (values: IUser) => {
  //     try {
  //       if (editingUser) {
  //         await updateUser(editingUser.id ? editingUser.id : 0, values); // Use PUT to update the user
  //       } else {
  //         const newUser = await createUser(values); // Use POST to create a new user
  //         setUsers([
  //           {
  //             ...newUser,
  //             id: users?.length ? users.length + 1 : 1,
  //           },
  //           newUser,
  //         ]);
  //       }
  //       setIsModalOpen(false);
  //       setEditingUser(null);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id); // Use DELETE to remove the user
      setUsers(users?.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      key: "address",
      render: ({ address }: IUser) => (
        <span>
          {address.street}, {address.suite}, {address.city}, {address.zipcode}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUser(record);
              setIsModalOpen(true);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              record.id
                ? handleDelete(record.id)
                : notification.error({
                    message: "Error",
                    description: "User ID not found",
                  });
            }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading)
    return (
      <Layout>
        <SuspenseLoading />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex justify-start ml-10 my-10">
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              title: "User List",
            },
          ]}
        />
      </div>
      <div className="my-20 flex justify-center">
        <Table
          columns={columns}
          dataSource={users?.map((user) => ({
            ...user,
            key: user.id ? user.id.toString() : "",
          }))}
        />
      </div>
      {isModalOpen && (
        <UsersModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          handleSubmit={(values) => {
            console.log(values);
            // TODO: Uncomment the following line to enable the form submission
            // handleSubmit(values);
          }}
        />
      )}
    </Layout>
  );
};

export default UserPages;
