"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import s from './Home.module.scss'

interface Meme {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: boolean
  spoiler: boolean
  author: string
  ups: number
  preview: string[]
}

export default function Home() {
  const [meme, setMeme] = useState<Meme | null>(null)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Обновляем ширину окна при изменении размера экрана
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    // Убираем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getMemeHandler = async () => {
    const res = await fetch("https://meme-api.com/gimme")
    if (res.ok) {
      const data: Meme = await res.json()
      setMeme(data)
      console.log(data)
    } else {
      console.error("Error fetching data")
    }
  }

  const getOptimalImage = (previews: string[]): string => {
    // Определяем подходящее изображение в зависимости от разрешения экрана
    let optimalImage
    if (windowWidth <= 320) {
			const findImage = previews.find((preview) => preview.includes("width=320"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 320) {
      const findImage = previews.find((preview) => preview.includes("width=640"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 640) {
      const findImage = previews.find((preview) => preview.includes("width=960"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 960) {
      const findImage = previews.find((preview) => preview.includes("width=1080"))
      findImage && (optimalImage = findImage)
    }
    return optimalImage ? optimalImage : previews[previews.length - 1]
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-700 text-slate-200">
      <button className="py-3 px-5 bg-orange-600 rounded-md mb-5 " onClick={getMemeHandler}>
        GET MEME
      </button>
      {meme && (
        <div className="bg-slate-600 p-4 text-center shadow-xl rounded-sm">
          <h2>Title: {meme.title}</h2>
          <p>Author: {meme.author}</p>
          <Image src={getOptimalImage(meme.preview)} alt={meme.title} width={300} height={300} />
        </div>
      )}
    </main>
  )
}
