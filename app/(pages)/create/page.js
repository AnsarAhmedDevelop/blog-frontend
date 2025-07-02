"use client"
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    author:"",
  })

   const handleChange = (e) => {
    
    const { name, value } = e.target
    // setFormData((prev) => ({ ...prev, [name]: value }))   
    // OR
      setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => { 
   
    try {
      e.preventDefault();
    
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, formData)
      toast.success("Post created successfully!")
      router.push("/")
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("Failed to create post")
      setLoading(false)
    }
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <div  className="card">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title <span className="text-red-500">*</span>
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
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`input`}
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
          <button type="submit" onClick={handleSubmit} className="btn btn-primary flex items-center gap-2">
            <Save size={18} />
            Create Post
          </button>
          <button type="button" onClick={() => router.back()} className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft size={18} />
            Cancel
          </button>
        </div>
      </div>

    </div>
  )
}

export default page