import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { providerCart } from '../../context/CartContext';

const CheckOrder = () => {

  const [ loading , setLoading ] = useState(true);
  const [ localOrder , setLocalOrder ] = useState([]);
    const {
        checkOrder,
      } = useContext(providerCart);

      useEffect(() => {
        setLocalOrder(checkOrder)
        setTimeout(() => { setLoading(false) }, 2000);
      }, [checkOrder])

      if (loading) return <h1> cargando </h1>
     
    return (
      <Container>
      <Row >
    
        <Col sm={8}>
        <Table striped bordered hover>
      <thead><h1>Detalles de la compra {/* {checkOrder.idorder} */}</h1>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unitario</th>
          <th>Total</th>
        </tr>
      </thead>
     <tbody>
    {
      localOrder.map((i) => {  
        return(
        i.product.map((j,idx) => { console.log(`j.idproduct`, j.idproduct)
            return (
              <tr key={idx}>
        <td>{j.idproduct} </td>
        <td>{j.product} </td>
        <td>{j.totalcant} </td>
        <td>{j.price} </td>
        <td>{j.totalprice} </td>
        </tr> 
   )}))})}  
    </tbody> 
    </Table>
    </Col>
    <Col sm={4}>
    <Table striped bordered hover>
      <thead><h1>Datos cliente</h1>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Num. Telefono</th>
          <th>Direccion de Correo</th>
        </tr>
      </thead>
     <tbody>
      {localOrder.map((i,idx) => {
            return (
              <tr key={idx}>
        <td>{i.name} </td>
        <td>{i.lastname} </td>
        <td>{i.numberphone} </td>
        <td>{i.email} </td>
        </tr> 
      )})}  
    </tbody> 
    </Table>
    </Col>
    </Row>
    </Container>
       )
      };

export default CheckOrder
