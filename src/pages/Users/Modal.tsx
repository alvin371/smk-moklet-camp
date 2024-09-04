import { Button, Form, Input, Modal } from "antd";
import { IUser } from "./action";

export const UsersModal = ({
  isModalOpen,
  setIsModalOpen,
  editingUser,
  setEditingUser,
  handleSubmit,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingUser?: IUser | null;
  setEditingUser: (user: IUser | null) => void;
  handleSubmit: (values: IUser) => void;
}) => {
  return (
    <Modal
      title={editingUser ? "Edit User" : "Create User"}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setEditingUser(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={
          editingUser || {
            name: "",
            username: "",
            email: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
            },
          }
        }
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Input Name" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input placeholder="Input Username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input placeholder="Input Email" />
        </Form.Item>
        <Form.Item
          label="Street"
          name={["address", "street"]}
          rules={[{ required: true, message: "Please input the street!" }]}
        >
          <Input placeholder="Input Street" />
        </Form.Item>
        <Form.Item label="Suite" name={["address", "suite"]}>
          <Input placeholder="Input Suite" />
        </Form.Item>
        <Form.Item
          label="City"
          name={["address", "city"]}
          rules={[{ required: true, message: "Please input the city!" }]}
        >
          <Input placeholder="Input City" />
        </Form.Item>
        <Form.Item
          label="Zipcode"
          name={["address", "zipcode"]}
          rules={[{ required: true, message: "Please input the zipcode!" }]}
        >
          <Input placeholder="Input Zipcode" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingUser ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UsersModal;
