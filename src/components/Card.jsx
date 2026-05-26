//has the creators name, url, description, and imageURL
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Card({ creator }) {
    return (
        <motion.article
            className="card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
        >
            {creator.imageURL && (
                <img className="card-image" src={creator.imageURL} alt={creator.name} />
            )}
            <div className="card-body">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                <div className="actions">
                    <Link to={`/creator/${creator.id}`}>View</Link>
                    <Link to={`/creator/${creator.id}/edit`}>Edit</Link>
                    <a href={creator.url} target="_blank" rel="noreferrer">Visit</a>
                </div>
            </div>
        </motion.article>
    )
}

