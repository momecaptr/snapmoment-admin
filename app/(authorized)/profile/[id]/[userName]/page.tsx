"use client"
import {ProfileData} from "@/pagesComponents";

type Props = {
  params: {id: string, userName: string}
}

export default function Page (props: Props) {
  const {params: {id: userId, userName}} = props

  return (
    <ProfileData userId={+userId}/>
  )
}