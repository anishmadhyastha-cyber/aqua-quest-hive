import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Trophy, Users, BarChart3, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import Navbar from "@/components/Navbar";

const Home = () => {
  const features = [
    {
      icon: Droplets,
      title: "Daily Quiz",
      description: "Learn about water conservation through engaging daily questions that track your water footprint.",
      link: "/quiz",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Trophy,
      title: "Challenges",
      description: "Complete fun challenges to earn points and unlock exclusive leader badges.",
      link: "/games",
      gradient: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Community",
      description: "Share innovative ideas and connect with others passionate about water conservation.",
      link: "/community",
      gradient: "from-accent to-secondary"
    },
    {
      icon: BarChart3,
      title: "Track Impact",
      description: "Visualize your water footprint and see your conservation progress over time.",
      link: "/dashboard",
      gradient: "from-primary to-accent"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Join the Water Conservation Movement
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Every Drop <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">Counts</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Track your water footprint, take on challenges, and join a community dedicated to making a real impact on water conservation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/quiz">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Droplets className="h-5 w-5" />
                    Start Daily Quiz
                  </Button>
                </Link>
                <Link to="/community">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Users className="h-5 w-5" />
                    Explore Community
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Water conservation - drops on fresh green leaves"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Water Conservation Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Engage with our platform's features to make a lasting impact on water conservation
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-primary via-primary-glow to-secondary text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaDMwdjJIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <CardContent className="p-12 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of users who are actively reducing their water footprint and inspiring others to do the same.
            </p>
            <Link to="/quiz">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300">
                Get Started Today
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
