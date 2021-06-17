import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FcFullTrash } from 'react-icons/fc'
import { GrUpdate } from 'react-icons/gr'
import { Container, Form, Clientes } from './styles';

interface Cadastro {
  id: string;
  cliente: string;
  telefone: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [clientes, setClientes] = useState<Cadastro[]>([])

  const [atualizarCliente, setAtualizarCliente] = useState<Cadastro>({} as Cadastro)

  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');



  useEffect(() => {
    handleLoadClientes()
  }, []);

  async function handleLoadClientes() {
    const clientes = await api.get('/clientes')
    const clientesArray = clientes.data

    setClientes(clientesArray)
  }

  async function handleAddCliente(event: any) {
    event.preventDefault();
    console.log('teste')

    const novoCadastro = {
      cliente: event.target.cliente.value,
      telefone: event.target.telefone.value,
      email: event.target.email.value,
    };

    console.log(novoCadastro)

    const response = await api.post('/clientes', novoCadastro)
    setClientes([...clientes, response.data])
    await handleLoadClientes()

  }

  async function handleDeleteCliente(id: string) {
    await api.delete(`/clientes/${id}`)
    window.location.href = "/"
  }

  async function handleUpdate(event: any) {
    event.preventDefault();

    const dadosClienteAtualizado = {
      cliente: atualizarCliente.cliente,
      email: atualizarCliente.email,
      telefone: atualizarCliente.telefone,
    }

    await api.put(`/clientes/${atualizarCliente.id}`, dadosClienteAtualizado);

    window.location.reload();
  }

  return (
    <Container>
      <Form onSubmit={handleAddCliente}>
        <input
          type="text"
          placeholder="Cliente: "
          name="cliente"
        />
        <input
          type="text"
          placeholder="Email: "
          name="email"
        />
          <input
          type="text"
          placeholder="Telefone: "
          name="telefone"
        />
        <button type="submit">Cadastrar</button>
      </Form>
      <Clientes>
      	<h1>Clientes cadastrados: </h1>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {
              clientes.map((c) => (
                <tr key={c.id} >
                  <td>{c.cliente}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
                  <td>
                    <button type="button" onClick={() => handleDeleteCliente(c.id)}>
                      <FcFullTrash size={24} />
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => {
                      setAtualizarCliente({
                        id: c.id,
                        cliente: c.cliente,
                        email: c.email,
                        telefone: c.telefone
                      })
                    }}>
                      <GrUpdate size={24} />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Form onSubmit={handleUpdate} style={{ marginTop: '100px' }}>
          <h1>Atualizar Cliente</h1>
          <input
            type="text"
            placeholder="Cliente: "
            defaultValue={atualizarCliente.cliente}
            onChange={event => setAtualizarCliente({ ...atualizarCliente, cliente: event.target.value })}
          />
          <input
            type="text"
            placeholder="Email: "
            defaultValue={atualizarCliente.email}
            onChange={event => setAtualizarCliente({ ...atualizarCliente, email: event.target.value })}
          />
            <input
            type="text"
            placeholder="Telefone: "
            defaultValue={atualizarCliente.telefone}
            onChange={event => setAtualizarCliente({ ...atualizarCliente, telefone: event.target.value })}
          />
          <button type="submit">Atualizar</button>
        </Form>

      </Clientes>
    </Container>
  );
};

export default Dashboard;
