"use client"
import PostForm from '@/components/PostForm'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page({ params }) {
    const { id } = use(params)
    console.log(id, "id...")
    const [post, setPost] = useState({})
    const [loading, setLoading]= useState(false);
    const router = useRouter()
    // const [formData, setFormData] = useState({
    //     title: formData?.title ,
    //     description: formData?.description,
    //     author: formData?.author,
    // })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`)
                setPost(response.data)
                setLoading(true)
                // setFormData(response.data)                
            } catch (error) {
                console.error("Error fetching post:", error)
                toast.error("Failed to load post")
            }
        }
        if (id) {
            fetchPost()
        }
    }, [id])

  const handleSubmit = async (formData) => {
    try {
    
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`, formData)
      toast.success("Post updated successfully!")
      router.push(`/posts/${id}`)
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("Failed to update post")
      
    }
  }

    return (
        <div>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
                {loading ?   <PostForm initialData={post} onSubmit={handleSubmit}   /> : null}
              
                {/* <div>
                    <form onSubmit={handleSubmit} className="card">
                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-2 font-medium">
                                Title 
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`input `}
                                placeholder="Enter post title"

                            />

                        </div>

                        <div className="mb-4">
                            <label htmlFor="author" className="block mb-2 font-medium">
                                Author 
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`input `}
                                placeholder="Enter author name"

                            />

                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input min-h-[150px]"
                                placeholder="Enter post description"

                            />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="btn btn-primary flex items-center gap-2">
                                <Save size={18} />
                                Update Post
                            </button>
                            <button type="button" onClick={() => router.back()} className="btn btn-secondary flex items-center gap-2">
                                <ArrowLeft size={18} />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div> */}
            </div>
        </div>
    )
}

export default page