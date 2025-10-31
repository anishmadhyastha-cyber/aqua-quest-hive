import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Droplets } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  waterSavingTip: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How much water does a typical 5-minute shower use?",
    options: ["10-15 gallons", "25-35 gallons", "50-60 gallons", "80-100 gallons"],
    correctAnswer: 1,
    explanation: "A typical shower uses about 2.5 gallons per minute, totaling 25-35 gallons for a 5-minute shower.",
    waterSavingTip: "Install a low-flow showerhead to reduce water usage by up to 50%!"
  },
  {
    id: 2,
    question: "What percentage of Earth's water is freshwater available for human use?",
    options: ["Less than 1%", "About 5%", "Around 15%", "Nearly 30%"],
    correctAnswer: 0,
    explanation: "Less than 1% of Earth's water is accessible freshwater. Most water is in oceans or frozen in glaciers.",
    waterSavingTip: "Every drop counts! Even small conservation efforts make a big difference."
  },
  {
    id: 3,
    question: "How much water can a dripping faucet waste per day?",
    options: ["1 gallon", "5 gallons", "15 gallons", "50+ gallons"],
    correctAnswer: 3,
    explanation: "A faucet dripping at one drop per second can waste more than 3,000 gallons per year!",
    waterSavingTip: "Fix leaky faucets immediately - it's one of the easiest ways to save water."
  },
  {
    id: 4,
    question: "What uses more water: washing dishes by hand or using a dishwasher?",
    options: ["Hand washing", "Dishwasher", "They use the same", "Depends on the dish type"],
    correctAnswer: 1,
    explanation: "Modern dishwashers use 3-5 gallons per load, while hand washing can use up to 27 gallons!",
    waterSavingTip: "Run your dishwasher only when full to maximize water efficiency."
  },
  {
    id: 5,
    question: "How many gallons of water does it take to produce one pound of beef?",
    options: ["100 gallons", "500 gallons", "1,800 gallons", "Over 2,000 gallons"],
    correctAnswer: 2,
    explanation: "It takes approximately 1,800 gallons of water to produce one pound of beef, including water for crops and the animal.",
    waterSavingTip: "Consider incorporating more plant-based meals to reduce your water footprint."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! 🎉", {
        description: "You earned 10 points!"
      });
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100;

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Droplets className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete! 🎉</CardTitle>
              <CardDescription className="text-lg">
                You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted rounded-lg">
                <p className="text-lg font-semibold mb-2">Your Water Conservation Score</p>
                <p className="text-4xl font-bold text-primary">{score * 10} points</p>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {percentage >= 80 ? "Excellent work! You're a water conservation expert! 🌊" :
                   percentage >= 60 ? "Great job! Keep learning about water conservation! 💧" :
                   "Good effort! There's always more to learn about saving water! 🌍"}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button onClick={resetQuiz} variant="default">
                    Retake Quiz
                  </Button>
                  <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
                    View Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Daily Water Quiz</h1>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = showExplanation;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showResult && isCorrect
                        ? "border-accent bg-accent/10"
                        : showResult && isSelected && !isCorrect
                        ? "border-destructive bg-destructive/10"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="space-y-4 p-4 bg-muted rounded-lg animate-in fade-in duration-300">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    Explanation
                  </h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
                <div className="p-3 bg-accent/10 border-l-4 border-accent rounded">
                  <p className="text-sm font-medium text-accent-foreground">💡 {question.waterSavingTip}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full"
                  size="lg"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full"
                  size="lg"
                  variant="hero"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
