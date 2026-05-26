// ShowCreators page to show all content creators
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {supabase} from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
    const [creators, setCreators] =useState([])
    useEffect(() => {
        async function fetchCreators() {
            const {data,error } = await supabase.from('creators').select('*')
    
            if (error){
                console.error(error)
            }
            else{
                setCreators(data)
            }
            
        }
        fetchCreators()
    },[])
    return (
        <div>
            <header className="home-hero">
                <div className="hero-content">
                    <h1>Creatorverse</h1>
                    <div className="hero-actions">
                        <a className="hero-button secondary" href="#creators">View All Creators</a>
                        <Link className="hero-button" to="/add">Add a Creator</Link>
                    </div>
                </div>
            </header>

            <main className="show-creators" id="creators">
            {
            creators.length===0 ? 
            (<p>No creators!</p>) :
            (
                creators.map((creator) => (
                <Card key={creator.id} creator={creator} />
                ))
            )
            }
            </main>
        </div>
    )
}
