"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  // const [cadastrar, setCadastrar] = useEffect("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <main className="p-6">
      <button className="text-2xl text-black mb-4 px-6 py-3 rounded bg-blue-300 font-sans">
        Cadastre o Seu novo Cliente
      </button>
      <ul className="space-y-2">
        {clientes.map((cliente: any) => (
          <li
            key={cliente.id}
            className="bg-gray-100 p-3 rounded shadow text-black"
          >
            <strong>{cliente.nome}</strong> ({cliente.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
