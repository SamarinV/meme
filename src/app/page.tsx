"use client"

import Card from "@/components/Card/Card"
import Header from "@/components/Header/Header"
import { Meme } from "@/components/types/types"
import { useState } from "react"
import useLocalStorage from "use-local-storage"
import s from "./App.module.scss"
import { api } from "@/api/api"

export default function App() {
  const [meme, setMeme] = useState<Meme | null>(null)

  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [isDark, setIsDark] = useLocalStorage("isDark", prefers)

  const getMemeHandler = async () => {
    const newMemeResponse = await api.getMemeGimme()
    newMemeResponse && setMeme(newMemeResponse)
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
