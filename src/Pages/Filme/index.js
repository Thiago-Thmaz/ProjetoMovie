import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css';

import api from '../../services/api'

function Filme(){
    const { id } = useParams();
    const [ filme, setFilme ] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"e0625846a46f36d126e56d1454ab8d05",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("NÃO TEM ESSE FIRME NÃO CHEFE")
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();


return ()=> {
    console.log("DESMONTADO")
    }
    }, [navigate, id])


    function salvarFilme(){
      const minhalista = localStorage.getItem ("@primeflix");

      let filmesSalvos = JSON.parse (minhalista) || [];

        const hasfilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)
    
        if(hasfilme){
            alert("ESSE FILME JA TEM LA BOY");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("FILME SALVO BOY")
        

        }

    if(loading){
        return(
            <div>
                <h1>CARREGANDO</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
          <h1>{filme.title}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação:{filme.vote_average}</strong>
            <h4>Popularidade:<strong>{filme.popularity}</strong></h4>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
          
        </div>
    )
}

export default Filme;