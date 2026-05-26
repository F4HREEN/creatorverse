//a ViewCreator page to view a single content creator
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom'

export default function ViewCreator() {
    const { id } = useParams()
    const [creator, setCreator] = useState(null)
    
    useEffect(() => {
        async function fetchCreator() {
          const { data, error } = await supabase
            .from('creators')
            .select('*')
            .eq('id', id)
            .single()
          if (error) {
            console.error(error)
          } else {
            setCreator(data)
          }
        }
        fetchCreator()
      }, [id])
      if (!creator) {
        return <p>Loading creator...</p>
      }

    return (
        <main className="page creator-details">
          {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
          <h1>{creator.name}</h1>
          <a href={creator.url} target="_blank" rel="noreferrer">
            {creator.url}
          </a>
          <p>{creator.description}</p>
          <div className="actions">
            <Link to="/">Back to all creators</Link>
            <Link to={`/creator/${creator.id}/edit`}>Edit Creator</Link>
          </div>
        </main>
      )

}
