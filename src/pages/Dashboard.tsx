import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, TrendingDown, Award, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import badgeGold from "@/assets/badge-gold.png";

const Dashboard = () => {
  // Mock data - would come from backend in real app
  const stats = {
    dailyUsage: 85,
    weeklyAverage: 92,
    monthlyTotal: 2760,
    savedThisMonth: 840,
    currentStreak: 7,
    totalPoints: 320,
    quizzesTaken: 12,
    challengesCompleted: 5
  };

  const weeklyData = [
    { day: "Mon", usage: 95, target: 90 },
    { day: "Tue", usage: 88, target: 90 },
    { day: "Wed", usage: 92, target: 90 },
    { day: "Thu", usage: 87, target: 90 },
    { day: "Fri", usage: 85, target: 90 },
    { day: "Sat", usage: 90, target: 90 },
    { day: "Sun", usage: 83, target: 90 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Track your water conservation journey and impact
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary to-primary-glow text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80">Today's Usage</span>
                <Droplets className="h-5 w-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">{stats.dailyUsage}</p>
              <p className="text-sm text-white/80">gallons</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Water Saved</span>
                <TrendingDown className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent">{stats.savedThisMonth}</p>
              <p className="text-sm text-muted-foreground">gallons this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-secondary">{stats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">days active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-secondary text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80">Total Points</span>
                <Award className="h-5 w-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">{stats.totalPoints}</p>
              <p className="text-sm text-white/80">points earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Water Footprint Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Water Footprint</CardTitle>
              <CardDescription>Daily water usage compared to target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Today: {stats.dailyUsage} gallons</span>
                  <span className="text-sm text-muted-foreground">Target: 90 gallons</span>
                </div>
                <Progress value={(stats.dailyUsage / 90) * 100} className="h-3" />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Weekly Overview</h4>
                {weeklyData.map((day) => (
                  <div key={day.day}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                      <span className="text-xs font-medium">{day.usage}g</span>
                    </div>
                    <Progress 
                      value={(day.usage / day.target) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Weekly Average</p>
                <p className="text-2xl font-bold text-primary">{stats.weeklyAverage} gallons/day</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're using 8% less than your target 🎉
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievements & Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <img 
                  src={badgeGold} 
                  alt="Current Badge" 
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <p className="font-semibold text-lg">Bronze Leader</p>
                  <p className="text-sm text-muted-foreground">Level 3 • {stats.totalPoints} points</p>
                  <Progress value={(stats.totalPoints / 500) * 100} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {500 - stats.totalPoints} points to Silver
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Quizzes Completed</span>
                    <span className="text-sm text-muted-foreground">{stats.quizzesTaken}/30</span>
                  </div>
                  <Progress value={(stats.quizzesTaken / 30) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Challenges Completed</span>
                    <span className="text-sm text-muted-foreground">{stats.challengesCompleted}/10</span>
                  </div>
                  <Progress value={(stats.challengesCompleted / 10) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Daily Streak</span>
                    <span className="text-sm text-muted-foreground">{stats.currentStreak}/30 days</span>
                  </div>
                  <Progress value={(stats.currentStreak / 30) * 100} className="h-2" />
                </div>
              </div>

              <div className="p-4 bg-accent/10 border-l-4 border-accent rounded">
                <p className="text-sm font-medium text-accent-foreground">
                  🌟 You've saved enough water to fill 4 bathtubs this month!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Summary */}
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Your Environmental Impact</CardTitle>
            <CardDescription>Real-world equivalents of your water savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <p className="text-4xl font-bold text-primary mb-2">{stats.savedThisMonth}</p>
                <p className="text-sm text-muted-foreground">Gallons saved this month</p>
              </div>
              <div className="text-center p-4">
                <p className="text-4xl font-bold text-secondary mb-2">112</p>
                <p className="text-sm text-muted-foreground">Bottles of water equivalent</p>
              </div>
              <div className="text-center p-4">
                <p className="text-4xl font-bold text-accent mb-2">18</p>
                <p className="text-sm text-muted-foreground">Trees worth of water</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
