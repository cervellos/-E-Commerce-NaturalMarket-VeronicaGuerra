import { Button, Card, CloseButton, Col, Container, Row, Table, Offcanvas } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { providerCart } from "../context/CartContext";
import { Link, Redirect } from "react-router-dom";
import OrderForm from "../orderform/OrderForm";


const CartComponent = () => {
  const {
    reduceCartCount,
    cartContent,
    clearCart,
    removeProd,
    setShowButton,
    totalBuy,
    setBuy,
  } = useContext(providerCart);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [totalProd, setProd] = useState(0);

  useEffect(() => {
    const tempBuy = cartContent.reduce(
      (prev, { price, cartCount }) => prev + price * cartCount,
      0
    );
    setBuy(tempBuy);
    const tempProd = cartContent.reduce(
      (prev, { cartCount }) => prev + cartCount,
      0
    );
    setProd(tempProd);
    setTimeout(() => {}, 1000);
  }, [cartContent, setBuy]);

  // llevar reduce al contexto para usarlo en el bagde

  const removeProduct = (idProduct) => {
    removeProd(idProduct);
    setShowButton(false); /// ####### que sea una funcion que pasas por props desde itemDetail
  };

  if (!cartContent.length) {
    //agregar settimeout con un mensaje de 1 segundo que diga que no tiene nada en el carrito e invitar a la compra
    return <Redirect to="/" />;
  }

  return (
    <Container>
  <Row >

    <Col md="auto">
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Producto</th>
      <th>Cantidad Seleccionada</th>
      <th>Precio Unitario</th>
      <th>Sub Total</th>
      <th>#</th>
    </tr>
  </thead>
  <tbody>
   
   {cartContent.map((item,idx) => {
        return (
          <tr key={idx}>
    <td> <Link to={`/item/${item.id}`}>{item.name}</Link> </td>
     <td>         <Button
                variant="success"
                disabled={item.stock === 0}
                onClick={() => {
                  reduceCartCount(item.id, item.cartCount + 1);
                }}
              >
                {" "}
                +{" "}
              </Button>
              <> {item.cartCount} </>
              <Button
                variant="danger"
                disabled={item.cartCount <= 1}
                onClick={() => {
                  reduceCartCount(item.id, item.cartCount - 1);
                }}
              >
                {" "}
                -{" "}
              </Button></td>
           <td> {item.price} </td>
           <td> {item.price * item.cartCount} </td>
           <td> <CloseButton
                aria-label="delete-product"
                variant="info"
                onClick={() => {
                  removeProduct(item.id);
                }}
              ></CloseButton></td>
    </tr>
  
          
             
           
        );
      })}
      </tbody>
    </Table>
      </Col>
      <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>
          {`Precio Total ${totalBuy}`}
          </Card.Text>
      <Card.Text>
      {`Cantidad de Productos ${totalProd}`}
      </Card.Text>
      <Card.Text>
      <Button variant="outline-info" onClick={handleShow}>
      Finalizar compra
      </Button>
      </Card.Text>
      <Card.Text>
      <Button variant="info" onClick={() => {clearCart();}}>Vaciar carrito</Button>
      </Card.Text>
        </Card.Body>
      </Card>   
      <Offcanvas show={show} onHide={handleClose} placement="end"> 
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Formulario de Compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Rellena este formulario con tus datos, luego te informaremos tu número de orden y podrás seguir tu pedido.
          <p></p>
          <OrderForm/>
        </Offcanvas.Body>
      </Offcanvas>  
      </Col>
      </Row>
    
      
    
      </Container>

  );
};

export default CartComponent;
