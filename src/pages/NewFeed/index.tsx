import AddPostCard from '../../components/AddPostCard'
import FeedHeader from '../../components/FeedHeader'
import PostCard from '@/features/post/components/PostCard'
import { usePosts } from '@/features/post'

export default function NewFeed() {
  const {posts} = usePosts();
  
  return (
    <div className="flex flex-col items-center gap-3">
      <FeedHeader/>
      <AddPostCard></AddPostCard>
      {posts.map((post)=>(
        <PostCard key={post.id} {...post}></PostCard>
      ))}
    </div>
  )
}
