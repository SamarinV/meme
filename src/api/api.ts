import { Meme } from "@/components/types/types"
import axios from "axios"

const instance = axios.create({
  baseURL: "https://meme-api.com/",
})

export const api = {
  async getMemeGimme() {
    const res = await instance<Meme>("gimme")
    if (res.status === 200) {
      return res.data
    } else {
      console.error("Error fetching data")
    }
  },
}
