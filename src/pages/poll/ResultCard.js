import React, { useState, useEffect } from 'react'
import * as CONSTANTS from '../../config/constants'
import api from "../../utils/api"
import './ResultCard.css'

const ResultCard = () => {
    const [winner, setWinner] = useState(null)
    const [localLoading, setLocalLoading] = useState(true)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
    
    useEffect(() => {
        setLocalLoading(true)
        const loadWinner = () => {
            setLocalLoading(true);
            const action = "api/vote/winner";
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.get(action, params).then((retorno) => {
                setWinner(retorno.data)
                console.log("winner: ", retorno.data)
                setLocalLoading(false)
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setLocalLoading(false)
            })
        }
        loadWinner()
    }, [])

    return (
        <>
            <div className="card-container">
                { !localLoading && winner && <div>
                    <p>Restaurante do dia:</p>
                    <h1>
                        <i className="fas fa-crown"></i>
                    </h1>
                    <h2>{ winner.name }</h2>
                </div> }

                { !localLoading && !winner && <div>
                    <p>Oh, oh...</p>
                    <h1>
                        <i className="fas fa-frown"></i>
                    </h1>
                    <h2>Sem votos</h2>
                    <p>Parece que não tivemos uma votação para decidir o restaurante campeão de hoje...</p>
                </div> }

                { localLoading && <div>
                    Procurando vencedor...
                </div> }
            </div>
        </>
    )
}

export default ResultCard