import {UserTabs} from "@/widget/userTabs/UserTabs";

type Props = {
  params: {id: string, userName: string}
}

export default function Page (props: Props) {
  const {params} = props

  return (
    <>
      <h1>Ну это здравствуйте, конечно</h1>
      <h1>{params.id}</h1>
      <h1>{params.userName}</h1>
      <UserTabs userId={+params.id}/>
    </>
  )
}