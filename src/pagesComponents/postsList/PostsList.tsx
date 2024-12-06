"use client"
import {Input} from "@momecap/ui-kit-snapmoment";
import {Posts} from "@/widget";

export const PostsList = () => {
  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <Input type={'search'} />
      </div>
      <div>
        <Posts />
      </div>
    </>
  );
}