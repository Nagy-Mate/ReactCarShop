import { useEffect, useState } from "react";
import type { Car } from "../types/Car";
import apiClient, { BASEURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const AllCars = () => {
  const [cars, setCars] = useState<Array<Car>>([]);
  const [cart, setCart] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("cart") ?? "[]")
  );

  useEffect(() => {
    apiClient
      .get("/autok")
      .then((res) => setCars(res.data))
      .catch((e) => toast.error("Server error"));
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const generateCard = (car: Car) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel variant="top">
            {car.images.map((i) => generateSlide(i))}
          </Carousel>
          <Card.Body>
            <Card.Title>
              {car.marka} {car.modell} {car.evjarat}
              <br />
              Km: {car.futas_km}
            </Card.Title>
            <Card.Text>
              Üzemanyag: {car.uzemanyag}
              <br />
              Váltó: {car.valto}
              <br />
              Szín: {car.szin}
              <br />
              Ár: {car.ar}
              <br />
              {car.leiras}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setCart([...cart, car.id]);
                toast.success("Added to cart");
              }}
            >
              Kosárba
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const generateSlide = (url: string) => (
    <Carousel.Item>
      <img src={`${BASEURL}/kepek/${url}`} width={286} height={200} />
    </Carousel.Item>
  );
  return (
    <>
      {cars?.length < 1 ? (
        <>
          <h1>Cars not found</h1>
        </>
      ) : (
        <>
          <Link to={"/cart"}>
            <Button variant="info">Kosár</Button>
          </Link>

          <Container>
            <Row xs={"auto"} md={"auto"} className="g-4">
              {cars.map((c) => generateCard(c))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default AllCars;
