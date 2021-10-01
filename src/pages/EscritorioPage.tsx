import React, { useState } from "react";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { useHistory, Redirect } from "react-router-dom";
import { useSocketContext } from "../context/socketContext";
import { Ticket } from "../types/Ticket";

const { Text, Title } = Typography;

export const EscritorioPage: React.FC = () => {
  useHideMenu(false);
  const { socket } = useSocketContext()!;
  const history = useHistory();
  const [usuario] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const salir = () => {
    localStorage.clear();
    history.replace("/ingresar");
  };

  const siguienteTicket = () => {
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket: Ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Redirect to="/ingresar" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4}>
          <Button shape="round" onClick={salir} danger type="primary">
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket numero: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6}>
          <Button onClick={siguienteTicket} type="primary" shape="round">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
