const form = document.querySelector('#form');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;


const armazenarLocalStorage = (produtos) => {localStorage.setItem('armazenados', JSON.stringify(produtos))}


const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('armazenados')|| '[]');


const armazenarProduto = (savedProduto) =>{
    savedProduto.preventDefault()
    const produto = form.produto.value;
    const valor = Number(form.valor.value);
    const prime = form.prime.checked;
    
    if(idx == 'novo'){
    const produtos = recuperarLocalStorage();
    produtos.push({id:produtos.length + 1, produto, valor, prime});
    armazenarLocalStorage(produtos);
    preencheTabela();
    form.reset();  
    }else{
        let produtoedit = {id: idx, produto, valor, prime}

        updateProduto(idx, produtoedit);
        preencheTabela();
        form.reset();
        idx = 'novo';
    }
}

const preencheTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){
        tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}></th>
            <td>${produto.produto}</td>
            <td>${produto.valor}</td>
            <td>${produto.prime ? "Sim" : "Não"}</td>
            <td>
                <img type="button" width="40" src="img/lixo.jpg" onclick="deletProduto(${produto.id})">
                <img type="button" width="40" src="img/lapis.jpg" onclick="editProduto(${produto.id})">
            </td>
        </tr>    
        `
    }
}

const deletProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    if(indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    armazenarLocalStorage(produtos);
    alert('O produto foi removido')
    preencheTabela();
}

const editProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    form.produto.value = produtos[indexProduto].produto;
    form.valor.value = produtos[indexProduto].valor;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}

const updateProduto = (id, produtoedit) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produtoedit) => produtoedit.id === id);
    produtos[indexProduto] = produtoedit;
    armazenarLocalStorage(produtos);
}

form.addEventListener('submit', armazenarProduto);
document.addEventListener('DOMContentLoaded', preencheTabela);