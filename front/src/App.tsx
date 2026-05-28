import { useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");

  //Declaracion de predict
  const [resultpredict, setResultPredict] = useState<ResultPredict | null>(
    null,
  );

  const [historial, setHistorial] = useState<ResultPredict[]>([]);

  type ResultPredict = {
    id: number;
    probabilidad_compra: number;
    prediccion: number;
    perfil_usuario: string;
    nivel_compra: string;
    tipo_producto: string;
    accion_recomendada: string;
  };

  //Tipado del formulario
  type FormData = {
    precio: number;
    tiempo: number;
    productos: number;
    categoria: number;
    dispositivo: number;
    hora: number;
  };

  //Declaracion de formulario
  const [FormPredict, setFormPredict] = useState({
    precio: "",
    tiempo: "",
    productos: "",
    categoria: "",
    dispositivo: "",
    hora: "",
  });

  //Cambio de State del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormPredict({ ...FormPredict, [e.target.name]: e.target.value });
  };

  //Envio de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      precio: Number(FormPredict.precio),
      tiempo: Number(FormPredict.tiempo),
      productos: Number(FormPredict.productos),
      categoria: Number(FormPredict.categoria),
      dispositivo: Number(FormPredict.dispositivo),
      hora: Number(FormPredict.hora),
    };
    await llamarApi(dataToSend);
    getHistorial();

    setMensaje("✅ Predicción registrada correctamente");

    setFormPredict({
      precio: "",
      tiempo: "",
      productos: "",
      categoria: "",
      dispositivo: "",
      hora: "",
    });
  };

  //LLamar api Post
  async function llamarApi(dataToSend: FormData) {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      setResultPredict(data);
      return { ok: response.ok, data };
    } catch (e) {
      console.error("Error en traer producto por ID", e);
      return { ok: false, message: "Error de servidor" };
    }
  }

  //LLamar api Historial
  async function getHistorial() {
    try {
      const response = await fetch("http://127.0.0.1:8000/historial", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respuestahistorial = await response.json();
      setHistorial(respuestahistorial);
    } catch (e) {
      console.error("Error en traer producto por ID", e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col items-center">
      {/* TÍTULO */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-cyan-400 mb-4">
        🛍️ Sistema de Predicción de Compra
      </h1>

      {/* INTRODUCCIÓN */}
      <p className="text-gray-300 max-w-2xl text-center mb-8 text-sm md:text-lg leading-relaxed">
        🧠 Este sistema utiliza modelos de inteligencia artificial para analizar
        el comportamiento de los usuarios en comercio electrónico 🛒. Permite
        predecir si un cliente realizará una compra basada en variables clave
        como tiempo de navegación, productos visualizados y tipo de usuario,
        generando estrategias de negocio 🚀.
      </p>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white text-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
      >
        <label className="font-semibold">💰 Precio del Producto (Monto)</label>
        <input
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          value={FormPredict.precio}
          onChange={handleChange}
          name="precio"
          placeholder="Ej. 150"
        />

        <label className="font-semibold">⏱️ Tiempo de Navegación (Minutos)</label>
        <input
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          value={FormPredict.tiempo}
          onChange={handleChange}
          name="tiempo"
          placeholder="Ej. 12"
        />

        <label className="font-semibold">📦 Cantidad de Productos Visualizados</label>
        <input
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          value={FormPredict.productos}
          onChange={handleChange}
          name="productos"
          placeholder="Ej. 5"
        />

        <label className="font-semibold">👕 Categoría de Interés</label>
        <select
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          name="categoria"
          value={FormPredict.categoria}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="0">Formal</option>
          <option value="1">Casual</option>
          <option value="2">Sport</option>
        </select>

        <label className="font-semibold">📱 Dispositivo de Conexión</label>
        <select
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          name="dispositivo"
          value={FormPredict.dispositivo}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="0">Celular</option>
          <option value="1">Tablet</option>
          <option value="2">PC</option>
        </select>

        <label className="font-semibold">🕒 Momento del Día de la Visita</label>
        <select
          className="p-2 rounded-lg border focus:ring-2 focus:ring-cyan-400"
          name="hora"
          value={FormPredict.hora}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="0">Mañana</option>
          <option value="1">Tarde</option>
          <option value="2">Noche</option>
        </select>

        <button
          type="submit"
          className="mt-4 bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 hover:scale-105 transition"
        >
          🔍 Predecir Compra
        </button>
      </form>

      {/* RESULTADO */}
      {resultpredict && (
        <div className="mt-10 bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center text-cyan-500 mb-4">
            📊 Resultado
          </h2>

          {mensaje && (
            <p className="mt-4 text-green-400 font-semibold">{mensaje}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <p>
              <strong>ID:</strong> {resultpredict.id}
            </p>
            <p>
              <strong>Resultado:</strong>{" "}
              {resultpredict.prediccion === 1 ? "Compra ✅" : "No Compra ❌"}
            </p>
            <p>
              <strong>Probabilidad:</strong>{" "}
              {Math.round(resultpredict.probabilidad_compra * 100)}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-cyan-500 h-3 rounded-full"
                style={{
                  width: `${Math.round(resultpredict.probabilidad_compra * 100)}%`,
                }}
              ></div>
            </div>

            <p>
              <strong>Perfil:</strong> {resultpredict.perfil_usuario}
            </p>
            <p>
              <strong>Nivel:</strong> {resultpredict.nivel_compra}
            </p>
            <p>
              <strong>Tipo:</strong> {resultpredict.tipo_producto}
            </p>
            <p className="col-span-2">
              <strong>💡 Acción:</strong> {resultpredict.accion_recomendada}
            </p>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {historial.length > 0 && (
        <div className="mt-10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white text-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-sm">📊 Total</p>
            <h3 className="text-xl font-bold">{historial.length}</h3>
          </div>

          <div className="bg-white text-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-sm">✅ Compras</p>
            <h3 className="text-xl font-bold text-green-500">
              {historial.filter((i) => i.prediccion === 1).length}
            </h3>
          </div>

          <div className="bg-white text-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-sm">❌ No Compran</p>
            <h3 className="text-xl font-bold text-red-500">
              {historial.filter((i) => i.prediccion === 0).length}
            </h3>
          </div>

          <div className="bg-white text-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-sm">📈 Conversión</p>
            <h3 className="text-xl font-bold text-purple-500">
              {historial.length > 0
                ? Math.round(
                    (historial.filter((i) => i.prediccion === 1).length /
                      historial.length) *
                      100,
                  )
                : 0}
              %
            </h3>
          </div>
        </div>
      )}

      <button
        onClick={() => setHistorial([])}
        className="mt-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        🧹 Limpiar historial
      </button>

      {/* HISTORIAL */}
      {historial.length > 0 && (
        <div className="mt-10 w-full max-w-4xl bg-white text-gray-800 rounded-2xl shadow-lg p-4 overflow-x-auto">
          <h2 className="text-xl font-bold text-center text-cyan-500 mb-4">
            📚 Historial
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cyan-500 text-white">
                <th className="p-2">ID</th>
                <th>Predicción</th>
                <th>Probabilidad</th>
                <th>Perfil</th>
                <th>Nivel</th>
                <th>Tipo</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {historial.map((item) => (
                <tr
                  key={item.id}
                  className="text-center border-b hover:bg-gray-100 transition"
                >
                  <td>{item.id}</td>
                  <td>{item.prediccion === 1 ? "✅" : "❌"}</td>
                  <td>{Math.round(item.probabilidad_compra * 100)}%</td>
                  <td>{item.perfil_usuario}</td>
                  <td>{item.nivel_compra}</td>
                  <td>{item.tipo_producto}</td>
                  <td>{item.accion_recomendada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
