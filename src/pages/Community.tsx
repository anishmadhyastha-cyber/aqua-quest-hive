import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, TrendingUp, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface Post {
  id: number;
  author: string;
  avatar: string;
  badge: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  category: "idea" | "tip" | "achievement";
  liked: boolean;
}

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      badge: "Gold",
      timeAgo: "2 hours ago",
      content: "💡 Innovative idea: I installed a greywater system that redirects water from my washing machine to water my garden. Saved over 500 gallons this month! The setup was easier than expected. Happy to share the DIY guide if anyone's interested!",
      likes: 47,
      comments: 12,
      category: "idea",
      liked: false
    },
    {
      id: 2,
      author: "Mike Johnson",
      avatar: "MJ",
      badge: "Silver",
      timeAgo: "5 hours ago",
      content: "Quick tip: Place a bucket in your shower while waiting for hot water. I collected 2 gallons this morning alone - perfect for watering plants! 🌱 Small actions add up!",
      likes: 89,
      comments: 23,
      category: "tip",
      liked: true
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      avatar: "ER",
      badge: "Bronze",
      timeAgo: "1 day ago",
      content: "🎉 Just completed my first month of 5-minute showers! Reduced my water bill by 25%. The challenge feature really kept me motivated. Who else is taking the challenge?",
      likes: 156,
      comments: 34,
      category: "achievement",
      liked: false
    },
    {
      id: 4,
      author: "David Park",
      avatar: "DP",
      badge: "Gold",
      timeAgo: "1 day ago",
      content: "Brilliant hack: Use ice cubes from leftover drinks to water small potted plants. Nothing goes to waste! Also, I rinse veggies in a bowl now and use that water for outdoor plants. 🌿",
      likes: 203,
      comments: 45,
      category: "idea",
      liked: true
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: number) => {
    toast.success("Post link copied to clipboard!");
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: posts.length + 1,
      author: "You",
      avatar: "YO",
      badge: "Bronze",
      timeAgo: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      category: "idea",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    toast.success("Post shared with the community!");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "idea": return "bg-primary/20 text-primary-foreground";
      case "tip": return "bg-secondary/20 text-secondary-foreground";
      case "achievement": return "bg-accent/20 text-accent-foreground";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "idea": return <Lightbulb className="h-3 w-3" />;
      case "tip": return <TrendingUp className="h-3 w-3" />;
      case "achievement": return <Heart className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community Hub</h1>
          <p className="text-muted-foreground text-lg">
            Share your water-saving ideas and learn from others
          </p>
        </div>

        {/* Create Post Card */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="text-xl">Share Your Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share an innovative idea, conservation tip, or your achievements..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Inspire others with your water conservation journey
              </p>
              <Button 
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
              >
                Post to Community
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.badge}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                      </div>
                      <Badge className={`${getCategoryColor(post.category)} gap-1`}>
                        {getCategoryIcon(post.category)}
                        {post.category}
                      </Badge>
                    </div>
                    
                    <p className="text-foreground leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center gap-6 pt-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${post.liked ? "fill-primary text-primary" : ""}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
