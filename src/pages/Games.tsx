import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Target, Award, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import badgeGold from "@/assets/badge-gold.png";

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  icon: typeof Trophy;
  completed: boolean;
}

const Games = () => {
  const [totalPoints, setTotalPoints] = useState(120);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "5-Minute Shower Challenge",
      description: "Take showers under 5 minutes for 7 days straight",
      points: 50,
      difficulty: "easy",
      icon: Trophy,
      completed: false
    },
    {
      id: 2,
      title: "Zero Drip Week",
      description: "Check and fix all leaky faucets in your home",
      points: 75,
      difficulty: "medium",
      icon: Target,
      completed: true
    },
    {
      id: 3,
      title: "Dishwasher Efficiency",
      description: "Run dishwasher only when completely full for 14 days",
      points: 60,
      difficulty: "easy",
      icon: Star,
      completed: false
    },
    {
      id: 4,
      title: "Garden Water Saver",
      description: "Install and use a rain barrel for outdoor watering",
      points: 100,
      difficulty: "hard",
      icon: Zap,
      completed: false
    },
    {
      id: 5,
      title: "Water Audit Pro",
      description: "Complete a comprehensive home water usage audit",
      points: 80,
      difficulty: "medium",
      icon: Award,
      completed: false
    },
    {
      id: 6,
      title: "Reduce Lawn Watering",
      description: "Cut lawn watering frequency by 50% for one month",
      points: 90,
      difficulty: "hard",
      icon: Trophy,
      completed: false
    }
  ]);

  const handleCompleteChallenge = (challengeId: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    setChallenges(challenges.map(c => 
      c.id === challengeId ? { ...c, completed: true } : c
    ));
    setTotalPoints(totalPoints + challenge.points);
    
    toast.success(`Challenge completed! 🎉`, {
      description: `You earned ${challenge.points} points!`
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-accent/20 text-accent-foreground";
      case "medium": return "bg-secondary/20 text-secondary-foreground";
      case "hard": return "bg-primary/20 text-primary-foreground";
      default: return "bg-muted";
    }
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const badgeLevel = totalPoints >= 500 ? "gold" : totalPoints >= 300 ? "silver" : totalPoints >= 150 ? "bronze" : "starter";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary to-primary-glow text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Total Points</p>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                </div>
                <Trophy className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}/{challenges.length}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badge Level</p>
                  <p className="text-2xl font-bold text-foreground capitalize">{badgeLevel}</p>
                </div>
                <Award className="h-10 w-10 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-secondary text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Next Badge</p>
                  <p className="text-2xl font-bold">{500 - totalPoints} pts</p>
                </div>
                <Star className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leader Badge Display */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Leader Badge</CardTitle>
            <CardDescription>Unlock higher badges by completing more challenges</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <img 
              src={badgeGold} 
              alt="Leader Badge" 
              className="w-32 h-32 object-contain animate-pulse"
            />
            <div className="text-center">
              <p className="text-xl font-bold capitalize">{badgeLevel} Level</p>
              <p className="text-muted-foreground">{totalPoints} points earned</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Badge variant="outline" className="text-xs">Starter: 0-149 pts</Badge>
              <Badge variant="outline" className="text-xs">Bronze: 150-299 pts</Badge>
              <Badge variant="outline" className="text-xs">Silver: 300-499 pts</Badge>
              <Badge variant="outline" className="text-xs">Gold: 500+ pts</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Active Challenges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <Card 
                  key={challenge.id}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    challenge.completed ? "border-accent bg-accent/5" : "hover:-translate-y-1"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${
                        challenge.completed 
                          ? "bg-accent/20" 
                          : "bg-gradient-to-br from-primary to-secondary"
                      }`}>
                        <Icon className={`h-6 w-6 ${challenge.completed ? "text-accent" : "text-white"}`} />
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{challenge.points} pts</span>
                      {challenge.completed ? (
                        <Button variant="outline" disabled className="gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Completed
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleCompleteChallenge(challenge.id)}
                          variant="default"
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
