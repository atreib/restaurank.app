import React, { useState, useEffect } from 'react'
import * as CONSTANTS from '../../config/constants'
import api from "../../utils/api"
import './VoteCard.css'

const VoteCard = () => {
    const [alreadyVoted, setAlreadyVoted] = useState(true)
    const [choosenRestaurant, setChoosenRestaurant] = useState(0)
    const [restaurants, setRestaurants] = useState("")
    const [localLoading, setLocalLoading] = useState(true)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
    const id = localStorage.getItem(CONSTANTS.CACHED_LOOGED_USER_ID_KEY);

    useEffect(() => {
        setLocalLoading(true)
        
        const checkAlreadyVoted = () => {
            const action = `api/vote/participated/user/${id}`;
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.get(action, params).then((retorno) => {
                setAlreadyVoted(retorno.data)
                setLocalLoading(false)
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setLocalLoading(false)
            })
        }

        const loadRestaurants = () => {
            const action = "api/restaurant";
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.get(action, params).then((retorno) => {
                setRestaurants(retorno.data)
                checkAlreadyVoted()
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setLocalLoading(false)
            })
        }

        loadRestaurants()
    }, [])

    const vote = (idRestaurant) => {
        setLocalLoading(true)
        const action = "api/vote";
        const params = { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        const data = {
            UserId: id,
            RestaurantId: idRestaurant
        }
        api.post(action, data, params).then((retorno) => {
            setLocalLoading(false)
            setAlreadyVoted(true)
        }).catch((err) => {
            console.log("err.response: ", err.response)
            setLocalLoading(false)
        })
    }

    return (
        <>
            <div className="new-card-container">
                { !localLoading 
                && restaurants.length > 0 
                && !alreadyVoted
                && <div>
                    <h2>Vote no seu restaurante favorito</h2>
                    <div className="form-group text-left">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-utensils"></i>
                                </span>
                            </div>
                            <select type="text"
                                    value={choosenRestaurant}
                                    onChange={(e) => setChoosenRestaurant(e.currentTarget.value)}
                                    placeholder="Selecione um restaurante"
                                    className="form-control"
                                    name="name">
                                
                                {
                                    restaurants && 
                                    restaurants.map(r => (
                                        <option key={r.id} value={r.id}>
                                            { r.name }
                                        </option>
                                    ))
                                }
                            </select>
                            <small id="restaurant-helper" className="form-text text-muted">
                                O mais votado será o destino de amanhã
                            </small>
                        </div>
                    </div>
                    <div className="opcoes">
                        <span onClick={() => vote(choosenRestaurant)}
                                className="btn btn-dark">
                            <i className="fas fa-vote-yea"></i>
                            Votar
                        </span>
                    </div>
                </div> }

                { !localLoading 
                    && restaurants.length === 0 
                    && <div className="details">
                        <h2>Oh, oh... :(</h2>
                        <p>
                            Não existem restaurantes cadastrados.
                        </p>
                </div> }

                { !localLoading 
                    && restaurants.length > 0 
                    && alreadyVoted
                    && <div className="details">
                        <h2>Yay! :D</h2>
                        <p>
                            <b>Você já realizou o seu voto hoje!</b>
                        </p>
                        <p>
                            Agora só resta torcer para que o restaurante escolhido para amanhã seja o seu! 
                        </p>
                </div> }

                { localLoading && <div className="details">
                    <h2>Carregando...</h2>
                </div> }
            </div>
        </>
    )
}

export default VoteCard