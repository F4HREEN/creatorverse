//an AddCreator page to allow the user to add a new content creator
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
    const navigate = useNavigate()
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    })

    function handleChange(event) {
        const { name, value } = event.target

        setCreator((previousCreator) => ({
            ...previousCreator,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const { error } = await supabase
            .from('creators')
            .insert([creator])

        if (error) {
            console.error(error)
            return
        }

        navigate('/')
    }

    return (
        <main className="page">
            <h1>Add a creator</h1>

            <form className="creator-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={creator.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="url">URL</label>
                <input
                    id="url"
                    name="url"
                    type="url"
                    value={creator.url}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={creator.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="imageURL">Image URL</label>
                <input
                    id="imageURL"
                    name="imageURL"
                    type="url"
                    value={creator.imageURL}
                    onChange={handleChange}
                />

                <button type="submit">Add Creator</button>
            </form>
        </main>
    )
}