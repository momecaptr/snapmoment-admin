import {UserTabs} from "@/widget/userTabs/UserTabs";

type Props = {
  params: {id: string, userName: string}
}

export default function Page (props: Props) {
  const {params: {id: userId, userName}} = props

  return (
    <UserTabs userId={+userId}/>
  )
}