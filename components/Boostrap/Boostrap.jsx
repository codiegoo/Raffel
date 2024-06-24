"use client"

import { useEffect } from "react"



export default function Boostrap() {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle')
  }, [])


  return null
}