// =====================================================
// MODELO DE PRODUTOS
// =====================================================

// Por enquanto usamos um array.
// Futuramente este arquivo será ligado ao banco de dados.

const produtos = [
    {
        id: 1,
        nome: "Shampoo hidratante",
        preco: 49
    },
    {
        id: 2,
        nome: "Creme anti-idade",
        preco: 89
    }
];

// Exporta o array para que outros arquivos possam utilizá-lo.

module.exports = produtos;