import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import { db } from "./data/db";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function App() {

  const initialCarrito = () => {
    const localStorageCard = localStorage.getItem('card')
    return localStorageCard ? JSON.parse(localStorageCard) : []
  }

  const [data] = useState(db);
  const [card, setCard] = useState(initialCarrito);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  // Funcion para mantener la informacion en el localstorage
  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  // Agregar productos al carrito
  function addToCart(item) {
    // verificar si existe el item
    const itemExiste = card.findIndex((guitarra) => guitarra.id === item.id);
    if (itemExiste >= 0) {
      if (card[itemExiste].cantidad >= MAX_ITEM) return;
      // existe en el carrito
      const actualizarCarrito = [...card];
      actualizarCarrito[itemExiste].cantidad++;
      setCard(actualizarCarrito);
    } else {
      item.cantidad = 1;
      setCard([...card, item]);
    }
  }

  // eliminar productos del carrito
  const eliminarCarrito = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCard((anteriorCard) =>
          anteriorCard.filter((guitar) => guitar.id !== id)
        );

        Swal.fire({
          title: "Borrado!",
          text: "Se elimino la guitarra del carrito.",
          icon: "success",
        });
      }
    });
  };

  // Manejar cantidades del carrito
  // incrementar cantidad carrito
  const incrementarCantidad = (id) => {
    const actualizarCarrito = card.map((item) => {
      if (item.id === id && item.cantidad < MAX_ITEM) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });
    setCard(actualizarCarrito);
  };

  // decrementar las cantidades del carrito
  const decrementarCantidad = (id) => {
    const actualizarCarro = card.map((item) => {
      if (item.id === id && item.cantidad > MIN_ITEM) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        };
      }
      return item;
    });
    setCard(actualizarCarro);
  };

  // funcion para vaciar carrito
  const vaciarCarrito = () => {
    setCard([]);
  };

  return (
    <>
      <div>
        <Header
          card={card}
          eliminarCarrito={eliminarCarrito}
          incrementarCantidad={incrementarCantidad}
          decrementarCantidad={decrementarCantidad}
          vaciarCarrito={vaciarCarrito}
        />

        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitarra
                key={guitar.id}
                guitar={guitar}
                setCard={setCard}
                addToCart={addToCart}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
