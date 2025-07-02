"use client"
import axios from 'axios'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Page({ params }) {
    const [post, setPost] = useState(null)
    const router = useRouter()
    const { id } = use(params)
    console.log(id, "id")

    const fetchPost = async () => {
        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`)
            setPost(response.data)
        } catch (error) {
            console.error("Error fetching post:", error)
            toast.error("Failed to load post")
        }
    }

    useEffect(() => {
        if (id) {
            fetchPost()
        }
    }, [id])

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`)
            toast.success("Post deleted successfully")
            router.push("/")
        } catch (error) {
            console.error("Error deleting post:", error)
            toast.error("Failed to delete post")
        }
    }

    return (
        <div>
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeft size={18} />
                    Back to all posts
                </Link>

                <article className="card">
                    <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
                    <p className="text-gray-400 mb-6">By {post?.author}</p>

                    <div className="prose prose-invert max-w-none mb-8">
                        <p>{post?.description}</p>
                    </div>

                    <div className="flex gap-4">
                        <Link href={`/edit/${post?._id}`} className="btn btn-secondary flex items-center gap-2">
                            <Edit size={18} />
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger flex items-center gap-2">
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Page