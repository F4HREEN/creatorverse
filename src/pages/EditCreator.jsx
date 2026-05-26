//an EditCreator page to allow the user to update a content creator's information
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error(error)
                setIsLoading(false)
                return
            }

            setCreator({
                name: data.name || '',
                url: data.url || '',
                description: data.description || '',
                imageURL: data.imageURL || ''
            })
            setIsLoading(false)
        }

        fetchCreator()
    }, [id])

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
            .update(creator)
            .eq('id', id)

        if (error) {
            console.error(error)
            return
        }

        navigate(`/creator/${id}`)
    }

    async function handleDelete() {
        const shouldDelete = window.confirm('Delete this creator?')

        if (!shouldDelete) {
            return
        }

        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

        if (error) {
            console.error(error)
            return
        }

        navigate('/')
    }

    if (isLoading) {
        return <p>Loading creator...</p>
    }

    return (
        <main className="page">
            <h1>Edit creator</h1>

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

                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" className="danger" onClick={handleDelete}>
                        Delete Creator
                    </button>
                </div>
            </form>
        </main>
    )
}