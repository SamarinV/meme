"use client"

import Header from "@/components/Header/Header"
import Image from "next/image"
import { useEffect, useState } from "react"
import s from "./App.module.scss"

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
    <div className={s.App}>
      <Header />
      <main className={s.main}>
        <button className={s.button} onClick={getMemeHandler}>
          GET MEME
        </button>

        {meme && getOptimalImage(meme.preview) && (
          <div className={s.card}>
            <div className="mb-4">
              <h2>Title: {meme.title}</h2>
              <p>Author: {meme.author}</p>
              <p>Subreddit: {meme.subreddit}</p>
            </div>
            <Image className={s.img} src={getOptimalImage(meme.preview)} alt={meme.title} width={400} height={400} />
          </div>
        )}
      </main>
    </div>
  )
}
