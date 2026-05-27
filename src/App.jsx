import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function App() {
  const [ titulo, setTitulo ] = useState('')
  const [ tipo, setTipo ] = useState('')
  const [ arquivo, setArquivo ] = useState(null)
  const [ listaArquivos, setListaArquivos ] = useState([])

  async function carregarArquivos() {
    const resposta = await supabase
      .from('arquivos')
      .select('*')

    if(resposta.data){
      setListaArquivos(resposta.data)
    }else{
      alert('Não foi possível carregar os arquivos: '+resposta.error.message)
    }
  }
  useEffect(()=>{
    carregarArquivos();
  },[])

  return(
    <div>
      <h1>Exibidor de Arquivos</h1>
      <div>
        {listaArquivos.map((arquivo) => (
          <div key={arquivo.id}>
            {
              arquivo.tipo === 'musica' && (
                <audio src={arquivo.url} controls/>
              )
            }
            {
              arquivo.tipo === 'imagem' && (
                <img src={arquivo.url} />
              )
            }
            {
              arquivo.tipo === 'video' && (
                <video src={arquivo.url} controls/>
              )
            }
            <h2>{arquivo.titulo}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}