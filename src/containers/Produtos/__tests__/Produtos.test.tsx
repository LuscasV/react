import { rest } from "msw";
import { setupServer } from 'msw/node'
import { screen, waitFor } from "@testing-library/react";

import Produtos from "..";
import { renderizaComProvider } from "../../../utils/tests";

const mocks = [
  {
    id: 2,
    categoria: "RPG",
    imagem: '',
    plataformas: ["Windows", "PS%", "Xbox S/X"],
    preco: 190.9,
    precoAntigo: 399.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: "Ação",
    imagem: '',
    plataformas: ["Ps5", "Xbox S/X"],
    preco: 150.9,
    precoAntigo: 200.9,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: "Aventura",
    imagem: '',
    plataformas: ["Nintendo"],
    preco: 190.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  },
]

const server = setupServer(
  rest.get('http://localhost:4000/produtos', (requisicao, resposta, contexto) => {
    return resposta(contexto.json(mocks))
  })
)

describe("testes para o container produtos", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())


  test("Deve renderizar corretamente com o texto de carregamento", () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test("Deve renderizar corretamente com a listagem de jogos", async () => {
    renderizaComProvider(<Produtos />)
    waitFor(() => {
      expect(screen.getByText('Gotham Knights')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
