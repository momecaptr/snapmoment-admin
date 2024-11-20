import { ReactNode } from 'react'

import {TableParts} from "@momecap/ui-kit-snapmoment";

type Props = {
  children: ReactNode
  dataLength: number
}
export const EmptyTable = (props: Props) => {
  const { children, dataLength } = props

  return (
    <TableParts.Body>
      <TableParts.Row>
        <TableParts.Cell colSpan={dataLength}>{children}</TableParts.Cell>
      </TableParts.Row>
    </TableParts.Body>
  )
}