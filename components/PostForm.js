"use client"
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function PostForm({ initialData, onSubmit }) {
    console.log(initialData,"post data")
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: initialData?.title ,
        description: initialData?.description ,
        author: initialData?.author ,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }
    return (
        <div>
            <div>
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
            </div>
        </div>
    )
}

export default PostForm