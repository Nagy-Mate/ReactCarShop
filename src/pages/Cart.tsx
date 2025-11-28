import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import type { Car } from "../types/Car";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

function Cart() {
  const [cars, setCars] = useState<Array<Car>>([]);
  const [sum, setSum] = useState<number>(0);

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

  useEffect(() => {
    setSum(0);
    cart.forEach((i) => {
      const car = cars.find((c) => c.id == i);
      if (car) {
        setSum((prev) => prev + car?.ar);
      }
    });
  }, [cart, cars]);

  const removeItem = (index: number) => {
    setCart(cart.filter((v, i) => i != index));
  };
  return (
    <>
      {cart?.length < 1 ? (
        <h2>Üres a kosár</h2>
      ) : (
        <>
          <h1>Kosár</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Auto</th>
                <th>Évjárat</th>
                <th>ára</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((id, index) => {
                const car = cars.find((c) => c.id === id);

                return (
                  <tr>
                    <td>
                      {car?.marka} {car?.modell}
                    </td>
                    <td>{car?.evjarat}</td>
                    <td>{car?.ar}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeItem(index)}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Összeg:</td>
                <td>{sum}</td>
                <td>
                  <Button variant="danger" onClick={() => setCart([])}>
                    <FaRegTrashAlt />
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </>
      )}
    </>
  );
}

export default Cart;
