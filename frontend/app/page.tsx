"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
  });

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/clientes", formData);
      setFormData({ nome: "", email: "", telefone: "", cep: "" });
      fetchClientes(); // atualiza a lista
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <main className="h-screen bg-foreground flex items-center justify-center text-black font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Cadastrar Cliente
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cadastrar
          </button>
        </form>

        <div className="bg-blue-50 p-4 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Clientes cadastrados</h2>
          <ul className="space-y-2 max-h-48 overflow-y-scroll hide-scrollbar">
            {clientes.map((cliente: any) => (
              <li key={cliente.id} className="bg-gray-100 p-3 rounded shadow">
                <strong>{cliente.nome}</strong> — {cliente.email}
                {cliente.telefone && <div>Telefone: {cliente.telefone}</div>}
                {cliente.cep && <div>CEP: {cliente.cep}</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
