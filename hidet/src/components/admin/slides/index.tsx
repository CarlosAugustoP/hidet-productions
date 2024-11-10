import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/router"
import { Plus, Edit, Trash2, Eye, X } from "lucide-react"

interface Slide {
  title: string
  id: number
  order: number
}

interface Post {
  id: number
  title: string
  content: string
  img: string
  video: string
  isImg: boolean
}

const API = {
  getAllSlides: async () => {
    const res = await fetch("/api/slides")
    return res.json()
  },
  getSlidesPosts: async (slideId: number) => {
    const res = await fetch(`/api/slides/${slideId}/posts`)
    return res.json()
  },
  insertSlide: async (slide: Omit<Slide, "id">, password: string) => {
    const res = await fetch(`/api/slides`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...slide, password }),
    })
    if (!res.ok) {
      throw new Error(res.status === 401 ? "Senha inválida" : "Falha ao adicionar slide")
    }
    return res.json()
  },
  updateSlide: async (slide: Slide, password: string) => {
    const res = await fetch(`/api/slides/${slide.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...slide, password }),
    })
    if (!res.ok) {
      throw new Error(res.status === 403 ? "Senha inválida" : "Falha ao atualizar slide")
    }
    return res.json()
  },
  deleteSlide: async (slideId: number, password: string) => {
    const res = await fetch(`/api/slides/${slideId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      throw new Error(res.status === 403 ? "Senha inválida" : "Falha ao deletar slide")
    }
  },
}

export default function Slides() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [slidesPosts, setSlidesPosts] = useState<{ [key: number]: Post[] }>({})
  const [embedUrls, setEmbedUrls] = useState<{ [key: number]: string | null }>({})

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    const data = await API.getAllSlides()
    setSlides(data)
    data.forEach((slide: Slide) => fetchSlidePosts(slide.id))
  }

  const fetchSlidePosts = async (slideId: number) => {
    const posts = await API.getSlidesPosts(slideId)
    setSlidesPosts((prev) => ({ ...prev, [slideId]: posts }))
    posts.forEach((post: Post) => {
      if (!post.isImg) fetchVimeoEmbed(post)
    })
  }

  const fetchVimeoEmbed = async (post: Post) => {
    const videoId = post.video.match(/(\d+)$/)?.[0]
    if (videoId) {
      try {
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
        const data = await res.json()
        const embedSrc = data.html.match(/src="([^"]+)"/)?.[1] || null
        setEmbedUrls((prev) => ({ ...prev, [post.id]: embedSrc }))
      } catch (error) {
        console.error("Falha ao buscar URL de incorporação do Vimeo:", error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Slides</h1>
        <AddSlideDialog onAddSlide={fetchSlides} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            posts={slidesPosts[slide.id] || []}
            embedUrls={embedUrls}
            onUpdate={fetchSlides}
            onDelete={fetchSlides}
          />
        ))}
      </div>
    </div>
  )
}

function SlideCard({ slide, posts, embedUrls, onUpdate, onDelete }: {
  slide: Slide
  posts: Post[]
  embedUrls: { [key: number]: string | null }
  onUpdate: () => void
  onDelete: () => void
}) {
  const router = useRouter()

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{slide.title}</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/slides/${slide.id}`)}>
              <Eye className="w-4 h-4 mr-2" />
              Ver
            </Button>
            <EditSlideDialog slide={slide} onUpdate={onUpdate} />
            <DeleteSlideDialog slideId={slide.id} onDelete={onDelete} />
          </div>
        </div>
        <p className="text-sm text-gray-600">Ordem: {slide.order}</p>
        <p className="text-sm text-gray-600">ID: {slide.id}</p>
      </div>
      <div className="border-t border-gray-200 p-4 overflow-x-auto">
        <div className="flex space-x-4">
          {posts.map((post) => (
            <div key={post.id} className="flex-shrink-0 w-36 h-36">
              {post.isImg ? (
                <img className="w-full h-full object-cover" src={post.img} alt={post.title} />
              ) : (
                embedUrls[post.id] && (
                  <iframe
                    className="w-full h-full"
                    src={embedUrls[post.id] || undefined}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={post.title}
                  ></iframe>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AddSlideDialog({ onAddSlide }: { onAddSlide: () => void }) {
  const [title, setTitle] = useState("")
  const [order, setOrder] = useState<number | undefined>(undefined)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!title || !order || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }
    try {
      await API.insertSlide({ title, order }, password)
      toast({ title: "Sucesso", description: "Slide adicionado com sucesso" })
      onAddSlide()
      setTitle("")
      setOrder(undefined)
      setPassword("")
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Slide
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Novo Slide</DialogTitle>
          <Button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white" />
          </div>
          <div>
            <Label htmlFor="order" className="text-white">Ordem</Label>
            <Input
              id="order"
              type="number"
              value={order || ""}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">Senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="bg-yellow-600 text-white">Adicionar Slide</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditSlideDialog({ slide, onUpdate }: { slide: Slide; onUpdate: () => void }) {
  const [title, setTitle] = useState(slide.title)
  const [order, setOrder] = useState(slide.order)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!title || !order || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }
    try {
      await API.updateSlide({ ...slide, title, order }, password)
      toast({ title: "Sucesso", description: "Slide atualizado com sucesso" })
      onUpdate()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Editar Slide</DialogTitle>
          <Button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-white" htmlFor="title">Título</Label>
            <Input className="bg-white" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label className="text-white" htmlFor="order">Ordem</Label>
            <Input className="bg-white" id="order" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-white" htmlFor="password">Senha</Label>
            <Input className="bg-white" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="bg-yellow-600 text-white">Atualizar Slide</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteSlideDialog({ slideId, onDelete }: { slideId: number; onDelete: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setError("")
    if (!password) {
      setError("Por favor, insira a senha")
      return
    }
    try {
      await API.deleteSlide(slideId, password)
      toast({ title: "Sucesso", description: "Slide deletado com sucesso" })
      onDelete()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Deletar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Deletar Slide</DialogTitle>
          <Button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        <div className="space-y-4 text-white">
          <p>Tem certeza que deseja deletar este slide? Esta ação não pode ser desfeita.</p>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-black"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button variant="destructive" className="bg-red-600" onClick={handleDelete}>
            Deletar Slide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}