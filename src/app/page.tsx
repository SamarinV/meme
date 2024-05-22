"use client"

import Card from "@/components/Card/Card"
import Header from "@/components/Header/Header"
import { Meme } from "@/components/types/types"
import { useEffect, useState } from "react"
import useLocalStorage from "use-local-storage"
import s from "./App.module.scss"
import { api } from "@/api/api"

export default function App() {
  const [meme, setMeme] = useState<Meme | null>(null)
  const [isDark, setIsDark] = useLocalStorage("isDark", false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
		const myLocalStorage = localStorage.getItem("isDark") === "true"
		if (myLocalStorage){
			setIsDark(true)
		} else {
			const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
			setIsDark(prefers)
		}
    setMounted(true)
  }, [])

  const getMemeHandler = async () => {
    const newMemeResponse = await api.getMemeGimme()
    newMemeResponse && setMeme(newMemeResponse)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={s.App} data-theme={isDark ? "dark" : "light"}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={s.main}>
        <h2>Work only with VPN</h2>
        <button className={s.button} onClick={getMemeHandler}>
          GET MEME
        </button>
        {meme && <Card meme={meme} />}
      </main>
    </div>
  )
}
