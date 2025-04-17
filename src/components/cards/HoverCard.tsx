import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post, User } from "@/types";
import { Heart, MessageCircle } from "lucide-react";
import { formatPostDate } from "@/lib/date";

interface ClassicCardProps {
  post: Post;
  user?: User;
}

export const HoverCard: React.FC<ClassicCardProps> = ({ post, user }) => {
  return (
    <Card className="card gap-1 bg-background justify-space-between py-3 text-foreground h-auto shadow-md rounded-xl transition hover:shadow-lg break-inside-avoid over:shadow-lg hover:scale-103 hover:bg-blue-100">
      <CardHeader className="pb-0 h-auto">
        <div className="flex flex-col text-sm text-muted-foreground h-auto">
          <span className="font-semibold h-auto">{user?.username ?? "Неизвестный пользователь"}</span>
          <span>{formatPostDate(post.date)}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-1 h-auto flex flex-col gap-1 justify-around h-full">
          <p className="text-base mb-1 h-auto  border-t  py-2">{post.caption}</p>
  
          <div className="flex items-center justify-start pt-2 border-t gap-1 text-sm text-muted-foreground h-auto">
            <div className="flex items-center gap-1 h-auto">
              <Heart className="w-4 h-4" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1 h-auto">
              <MessageCircle className="w-4 h-4 h-auto"  />
              {post.comments}
            </div>
          </div>
        </CardContent>
    </Card>
  );
};
