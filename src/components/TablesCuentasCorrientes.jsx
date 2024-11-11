import React, { useContext, useState } from "react";
import SelectClientes from "./SelectClientes";
import { Modal, Button, Table, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";
import TablaEntregas from "./TablaEntregas";
import "../App.css";
import LogOutButton from "./LogOutButton";

const TablesCuentasCorrientes = () => {
  const [cliente, setCliente] = useState(null);
  const { remitos, fetchRemitos, entregas, fetchEntregas } =
    useContext(DataContext);

  const handleSelectedClient = () => {
    if (!cliente) {
      Modal.warning({
        title: "Advertencia",
        content: "Debe seleccionar un cliente con cuenta corriente",
        icon: <ExclamationCircleOutlined />,
      });
    } else {
      fetchRemitos(cliente);
      fetchEntregas(cliente);
    }
  };

  const handleClienteChange = (cliente) => {
    setCliente(cliente);
  };

  const columnsRemitos = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    { title: "Saldo", dataIndex: "saldo", key: "saldo" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (text === 1 ? "No pagado" : "Pagado"),
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "16px" }}
      >
        <Col xs={24} md={8} lg={6}>
          <SelectClientes
            value={cliente}
            onChangeCliente={handleClienteChange}
            onInputChange={setCliente}
          />
        </Col>
        <Col xs={24} md={4} lg={6}>
          <Button type="primary" onClick={handleSelectedClient} block>
            Buscar
          </Button>
        </Col>
        <Col xs={24} md={4} lg={6} style={{ textAlign: "right" }}>
          <LogOutButton />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12} xx={16}>
          {remitos.length > 0 && (
            <>
              <h2>Remitos</h2>
              <Table
                dataSource={remitos}
                columns={columnsRemitos}
                rowKey={(remito) => remito.id}
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content", y: 300 }}
                style={{ width: "100%" }}
              />
            </>
          )}
        </Col>
        <Col xs={24} lg={12}>
          {entregas.length > 0 && (
            <>
              <h2>Entregas</h2>
              <TablaEntregas entregas={entregas} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TablesCuentasCorrientes;
