"use client"
import {useGetAllPostsQuery} from "@/graphql/queries/posts/getAllPosts.generated";
import {useQueryParams} from "@/shared/lib";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

export default function Page () {

  const {accessKey} = useGetAccessKeyFromStorage()
  const {searchTerm, newSortBy, newSortDirection} = useQueryParams()

  const {data: testData, loading} = useGetAllPostsQuery({
    variables: {
      endCursorPostId: 0,
      searchTerm,
    },
    context: {
      base64UsernamePassword: accessKey
    },
    skip: !accessKey
  })

  console.log({testData})
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Test page</h1>
    </div>
  );
};