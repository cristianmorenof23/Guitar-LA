/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
export default function Header({
  card,
  eliminarCarrito,
  incrementarCantidad,
  decrementarCantidad,
  vaciarCarrito
}) {
  // State derivado
  const isEmpty = () => card.length === 0;

  // Calcular total a pagar
  const cardTotal = () =>
    card.reduce((total, item) => total + item.cantidad * item.price, 0);

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="/img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="/img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-5 rounded-lg shadow-lg">
                  {isEmpty() ? (
                    <p className="text-center mb-4">El carrito está vacío</p>
                  ) : (
                    <table className="w-100 table-auto mb-4">
                      <thead>
                        <tr>
                          <th className="p-2">Imagen</th>
                          <th className="p-2">Nombre</th>
                          <th className="p-2">Precio</th>
                          <th className="p-2">Cantidad</th>
                          <th className="p-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {card.map((guitar) => (
                          <tr key={guitar.id} className="border-b">
                            <td className="p-2">
                              <img
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                                className="w-20 h-20 rounded-lg img-fluid"
                              />
                            </td>
                            <td className="p-2">
                              <h2 className="text-lg font-bold text-gray-900">
                                {guitar.name}
                              </h2>
                            </td>
                            <td className="p-2">
                              <p className="text-sm">${guitar.price}</p>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decrementarCantidad(guitar.id)}
                                  className="bg-gray-100 py-1 px-3.5 rounded-l duration-100 hover:bg-blue-500 hover:text-white"
                                >
                                  -
                                </button>
                                <input
                                  className="h-8 w-12 border text-center text-xs"
                                  type="number"
                                  value={`${guitar.cantidad}`}
                                  min="1"
                                />
                                <button
                                  className="bg-gray-100 py-1 px-3 rounded-r duration-100 hover:bg-blue-500 hover:text-white"
                                  onClick={() => incrementarCantidad(guitar.id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="p-2">
                              <button
                                className=" hover:bg-red-700 hover:rounded-lg hover:p-0.5"
                                onClick={() => eliminarCarrito(guitar.id)}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="1.5"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                                      stroke="#000000"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {isEmpty() ? null : (
                    <p className="text-end text-lg">
                      Total pagar:{" "}
                      <span className="font-bold">$ {cardTotal()}</span>
                    </p>
                  )}

                  <button className="btn btn-dark w-100 mt-4 py-2" onClick={vaciarCarrito}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
