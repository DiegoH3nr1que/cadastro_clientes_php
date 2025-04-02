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

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`);
      fetchClientes(); // atualiza a lista depois da exclusão
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <main className="min-h-screen bg-foreground flex items-center justify-center text-black font-sans px-4 py-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl">
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
          <ul className="space-y-4 max-h-64 overflow-y-auto hide-scrollbar">
            {clientes.map((cliente: any) => (
              <li key={cliente.id} className="bg-gray-100 p-4 rounded shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cliente.nome}
                    </h3>
                    <p className="text-sm text-gray-500">{cliente.email}</p>
                    {cliente.telefone && (
                      <p className="text-sm text-gray-600">
                        <strong>Telefone:</strong> {cliente.telefone}
                      </p>
                    )}
                    {cliente.cep && (
                      <p className="text-sm text-gray-600">
                        <strong>CEP:</strong> {cliente.cep}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded self-start sm:self-auto"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
