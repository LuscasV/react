import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importação do jest-dom para métodos adicionais de assertividade
import Header from '../index';
import { renderizaComProvider } from '../../../utils/tests';

describe('Testes para o componente Header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument();
  });

  test("Deve renderizar com 2 itens no carrinho", () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: "RPG",
              imagem: '',
              plataformas: ["Windows"],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: "RPG",
              imagem: '',
              plataformas: ["Windows", "PS%", "Xbox S/X"],
              preco: 190.9,
              precoAntigo: 399.9,
              titulo: 'Hogwarts Legacy'
            },
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
});
