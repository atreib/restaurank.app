import React, { useContext, useEffect } from 'react'
import './Home.css'
import { GlobalContext } from '../../context/GlobalState'
import { Helmet } from 'react-helmet';
import ResultCard from './../poll/ResultCard'
import VoteCard from './../poll/VoteCard'

const Home = () => {
    const { setPageTitle } = useContext(GlobalContext)
    
    useEffect(() => {
        setPageTitle("BEM VINDO")
    }, [])

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #fafafa !important; }'}</style>
            </Helmet>
            <div className="home-container">
                <div className="cards-wrapper">
                    <ResultCard />
                    <VoteCard />
                </div>
                <div className="footer-wrapper">
                    <img src='/logo.png' className="icon" alt="Restaurank" />
                </div>
            </div>
        </>
    )
}

export default Home