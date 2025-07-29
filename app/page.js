"use client"
import axios from "axios";
import { ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`)
      console.log(response.data)
      setPosts(response.data)
      // console.log(posts, "posts")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Failed to load posts")
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <Link href="/create" className="btn btn-primary flex items-center gap-2">
          <PlusCircle size={18} />
          Create Post
        </Link>
      </div>

      <div>
        {posts.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div key={i} className="card h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-2">By {post.author}</p>
                <p className="mb-4 flex-grow">{post.description.length > 50
                  ? `${post.description.substring(0, 50)}...`
                  : post.description}</p>
                <Link href={`/posts/${post._id}`} >
                  <button className="btn btn-secondary inline-flex items-center gap-2 self-start">
                    View More
                    <ArrowRight size={16} />
                  </button>

                </Link>
              </div>
            ))}
          </div> : <h2 className="italic text-3xl py-10 font-bold text-center">You Dont have any post. Create post</h2>}

      </div>




    </div>
  );
}
