import React, { useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useSocketContext } from "../context/socketContext";
import { Ticket } from "../types/Ticket";

const { Title, Text } = Typography;

export const CrearTicket: React.FC = () => {
  useHideMenu(true);
  const { socket } = useSocketContext()!;

  const [ticket, setTicket] = useState<Ticket>();

  const nuevoTicket = () => {
    socket.emit("solicitar-ticket", null, (ticket: Ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} style={{ textAlign: "center" }}>
          <Title level={3}>Persione el boton para un nuevo Ticket</Title>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={nuevoTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} style={{ textAlign: "center" }}>
            <Text>Su numero</Text>
            <br></br>
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket?.numero}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
