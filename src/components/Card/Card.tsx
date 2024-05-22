import { useEffect, useState } from "react"
import Image from "next/image"
import s from "./Card.module.scss"
import { Meme } from "../types/types"

type Props = {
  meme: Meme
}

const Card = ({ meme }: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [imageUrl, setImageUrl] = useState("")

  const getOptimalImage = (previews: string[]): void => {
    let optimalImage
    if (windowWidth <= 320) {
      const findImage = previews.find((preview) => preview.includes("width=320"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 320 && windowWidth <= 640) {
      const findImage = previews.find((preview) => preview.includes("width=640"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 640 && windowWidth <= 960) {
      const findImage = previews.find((preview) => preview.includes("width=960"))
      findImage && (optimalImage = findImage)
    } else if (windowWidth > 960) {
      const findImage = previews.find((preview) => preview.includes("width=1080"))
      findImage && (optimalImage = findImage)
    }
    optimalImage ? setImageUrl(optimalImage) : setImageUrl(previews[previews.length - 1])
  }

  useEffect(() => {
    if (meme) {
      getOptimalImage(meme.preview)
    }
  }, [windowWidth, meme])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {imageUrl && (
        <div className={s.card}>
          <div className="mb-4">
            <h2>Title: {meme.title}</h2>
            <p>Author: {meme.author}</p>
            <p>Subreddit: {meme.subreddit}</p>
          </div>
          <Image className={s.img} src={imageUrl} alt={meme.title} width={400} height={400} />
        </div>
      )}
    </>
  )
}

export default Card
