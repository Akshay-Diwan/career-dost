"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

// Mock quiz questions
// "quiz_title": "Scientific Career Aptitude & Interest Quiz (for 8th Std Students)",
// "description": "A 20-question quiz designed to assess your interests, strengths, and natural abilities to guide future career choices. Based on RIASEC + Aptitude models.",
interface Option{
  text: string,
  weights: Object
}
type Trait = "R"|"I"| "A" | "S"| "E"| "C"| "creativity"| "learning_speed"| "leadership"| "analytical_skill"| "communication" | "tech_interest" | "scientific_reasoning"

const quizQuestions = 
    
  // "quiz_title": "Career Interest and Aptitude Quiz (Balanced 30Q)",
  // "description": "A scientifically structured 30-question quiz based on RIASEC and aptitude factors to help students identify strengths and potential career paths.",
  // "questions":
  [
  {
    "id": 1,
    "question": "You are asked to join a new school project. Which role do you pick?",
    "options": [
      {"text": "Designing a cool logo or poster", "weights": {"A": 8, "creativity": 9}},
      {"text": "Experimenting and collecting data", "weights": {"I": 9, "scientific_reasoning": 9}},
      {"text": "Leading and motivating the group", "weights": {"E": 9, "leadership": 8}},
      {"text": "Building the model structure", "weights": {"R": 9, "mechanical_aptitude": 8}}
    ]
  },
  {
    "id": 2,
    "question": "Which subject do you look forward to most?",
    "options": [
      {"text": "Math or Science", "weights": {"I": 9, "analytical_skill": 10}},
      {"text": "Art or Music", "weights": {"A": 10, "creativity": 9}},
      {"text": "Business or Economics", "weights": {"E": 9, "finance_interest": 8}},
      {"text": "Computers or IT", "weights": {"C": 9, "tech_interest": 9}}
    ]
  },
  {
    "id": 3,
    "question": "You are most satisfied when you...",
    "options": [
      {"text": "Solve a hard logical puzzle", "weights": {"I": 10, "problem_solving": 9}},
      {"text": "Fix or improve a gadget", "weights": {"R": 9, "mechanical_aptitude": 9}},
      {"text": "Create something artistic", "weights": {"A": 10, "innovation": 8}},
      {"text": "Help a classmate understand something", "weights": {"S": 10, "communication": 9}}
    ]
  },
  {
    "id": 4,
    "question": "Which kind of task sounds most fun?",
    "options": [
      {"text": "Running a science experiment", "weights": {"I": 10, "scientific_reasoning": 9}},
      {"text": "Leading a group challenge", "weights": {"E": 10, "leadership": 9}},
      {"text": "Designing a creative poster", "weights": {"A": 10, "creativity": 10}},
      {"text": "Building a simple machine", "weights": {"R": 10, "engineering_interest": 9}}
    ]
  },
  {
    "id": 5,
    "question": "How do you feel about organizing events?",
    "options": [
      {"text": "Love planning and leading", "weights": {"E": 10, "organization": 9}},
      {"text": "Prefer designing the decorations", "weights": {"A": 9, "creativity": 9}},
      {"text": "Handle scheduling and details", "weights": {"C": 10, "discipline": 9}},
      {"text": "Help with setup and tools", "weights": {"R": 9, "mechanical_aptitude": 8}}
    ]
  },
  {
    "id": 6,
    "question": "What kind of activities do you enjoy online?",
    "options": [
      {"text": "Watching science/tech videos", "weights": {"I": 9, "tech_interest": 8}},
      {"text": "Creating art, edits, or content", "weights": {"A": 10, "creativity": 10}},
      {"text": "Learning new business ideas", "weights": {"E": 9, "finance_interest": 8}},
      {"text": "Helping friends with questions", "weights": {"S": 10, "communication": 9}}
    ]
  },
  {
    "id": 7,
    "question": "When you get a tough problem, what’s your reaction?",
    "options": [
      {"text": "Break it down logically", "weights": {"I": 10, "analytical_skill": 10}},
      {"text": "Find a new creative approach", "weights": {"A": 9, "innovation": 9}},
      {"text": "Ask others for input", "weights": {"S": 9, "teamwork": 8}},
      {"text": "Stick with it until I solve it", "weights": {"R": 9, "patience": 8}}
    ]
  },
  {
    "id": 8,
    "question": "What’s your favorite type of project?",
    "options": [
      {"text": "Building robots or circuits", "weights": {"R": 10, "engineering_interest": 9}},
      {"text": "Writing or researching topics", "weights": {"I": 10, "learning_speed": 8}},
      {"text": "Creating art, music, or media", "weights": {"A": 10, "creativity": 10}},
      {"text": "Organizing data or systems", "weights": {"C": 10, "discipline": 8}}
    ]
  },
  {
    "id": 9,
    "question": "How do you study before exams?",
    "options": [
      {"text": "Plan and follow a schedule", "weights": {"C": 10, "organization": 9}},
      {"text": "Make visual diagrams or notes", "weights": {"A": 9, "innovation": 8}},
      {"text": "Explain concepts to others", "weights": {"S": 10, "communication": 8}},
      {"text": "Focus on understanding logic", "weights": {"I": 10, "analytical_skill": 9}}
    ]
  },
  {
    "id": 10,
    "question": "Which club would you most like to join?",
    "options": [
      {"text": "Science or Coding Club", "weights": {"I": 10, "tech_interest": 9}},
      {"text": "Drama or Art Club", "weights": {"A": 10, "creativity": 9}},
      {"text": "Social Service or Debate Club", "weights": {"S": 10, "communication": 9}},
      {"text": "Business or Entrepreneurship Club", "weights": {"E": 10, "finance_interest": 9}}
    ]
  }
]

  // "traits": [
//     "R", "I", "A", "S", "E", "C",
//     "creativity", "scientific_reasoning", "mechanical_aptitude", "analytical_skill",
//     "learning_speed", "organization", "discipline", "finance_interest",
//     "tech_interest", "leadership", "communication", "problem_solving",
//     "innovation", "emotional_intelligence", "engineering_interest", "teamwork"
//   ],
//   "output_format": "Sum all weights for each trait. Identify top 3 scoring RIASEC codes and highest aptitude traits to suggest relevant career domains (e.g., I-A-R → Research & Engineering, S-E → Management & Teaching, A-I → Design & Innovation)."



export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Option | null>(null);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [showResults, setShowResults] = useState(false);
  // ✅ All trait states
  const [R, setR] = useState<number>(0);
  const [I, setI] = useState<number>(0);
  const [A, setA] = useState<number>(0);
  const [S, setS] = useState<number>(0);
  const [E, setE] = useState<number>(0);
  const [C, setC] = useState<number>(0);
  const [creativity, setCreativity] = useState<number>(0);
  const [scientific_reasoning, setScientific_reasoning] = useState<number>(0);
  const [mechanical_aptitude, setMechanical_aptitude] = useState<number>(0);
  const [analytical_skill, setAnalytical_skill] = useState<number>(0);
  const [learning_speed, setLearning_speed] = useState<number>(0);
  const [organization, setOrganization] = useState<number>(0);
  const [discipline, setDiscipline] = useState<number>(0);
  const [finance_interest, setFinance_interest] = useState<number>(0);
  const [tech_interest, setTech_interest] = useState<number>(0);
  const [leadership, setLeadership] = useState<number>(0);
  const [communication, setCommunication] = useState<number>(0);
  const [problem_solving, setProblem_solving] = useState<number>(0);
  const [innovation, setInnovation] = useState<number>(0);
  const [emotional_intelligence, setEmotional_intelligence] = useState<number>(0);
  const [engineering_interest, setEngineering_interest] = useState<number>(0);
  const [teamwork, setTeamwork] = useState<number>(0);
  const {user, isLoaded, isSignedIn} = useUser();
  // ✅ Dynamic traits map (type-safe)
  const traits: Record<string, (val: number) => void> = {
    R: (val) => setR((prev) => prev + val),
    I: (val) => setI((prev) => prev + val),
    A: (val) => setA((prev) => prev + val),
    S: (val) => setS((prev) => prev + val),
    E: (val) => setE((prev) => prev + val),
    C: (val) => setC((prev) => prev + val),
    creativity: (val) => setCreativity((prev) => prev + val),
    scientific_reasoning: (val) => setScientific_reasoning((prev) => prev + val),
    mechanical_aptitude: (val) => setMechanical_aptitude((prev) => prev + val),
    analytical_skill: (val) => setAnalytical_skill((prev) => prev + val),
    learning_speed: (val) => setLearning_speed((prev) => prev + val),
    organization: (val) => setOrganization((prev) => prev + val),
    discipline: (val) => setDiscipline((prev) => prev + val),
    finance_interest: (val) => setFinance_interest((prev) => prev + val),
    tech_interest: (val) => setTech_interest((prev) => prev + val),
    leadership: (val) => setLeadership((prev) => prev + val),
    communication: (val) => setCommunication((prev) => prev + val),
    problem_solving: (val) => setProblem_solving((prev) => prev + val),
    innovation: (val) => setInnovation((prev) => prev + val),
    emotional_intelligence: (val) => setEmotional_intelligence((prev) => prev + val),
    engineering_interest: (val) => setEngineering_interest((prev) => prev + val),
    teamwork: (val) => setTeamwork((prev) => prev + val),
  };
  let scores = {
  R: R,
  I: I,
  A: A,
  S: S,
  E: E,
  C: C,
  creativity: creativity,
  scientific_reasoning: scientific_reasoning,
  mechanical_aptitude: mechanical_aptitude,
  analytical_skill: analytical_skill,
  learning_speed: learning_speed,
  organization: organization,
  discipline: discipline,
  finance_interest: finance_interest,
  tech_interest: tech_interest,
  leadership: leadership,
  communication: communication,
  problem_solving: problem_solving,
  innovation: innovation,
  emotional_intelligence: emotional_intelligence,
  engineering_interest: engineering_interest,
  teamwork: teamwork,
};


  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswerSelect = (option: Option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Save the answer
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      let method = "POST";
      if (isLastQuestion) {
        answers.map(answer => Object.keys(answer.weights).map(weight => {
          console.log("Weight : " + weight);
          traits[weight](answer.weights[weight])
      }))
        fetch(`/api/v1/${user?.primaryEmailAddress?.emailAddress}/quizResults`)
        .then(res => {
          if(res.ok){
            method = "PUT"
          }
            fetch(`/api/v1/${user?.primaryEmailAddress?.emailAddress}/quizResults`, {
              method: method,
              body: JSON.stringify(scores),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => res.json())
            .then(json => console.log(json.message))
            .catch((err) => console.error(err))
      })
      .catch(err => console.log(err))
        
        // Show results
        setShowResults(true);
      } else {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
  };
  if (!isLoaded){
    return 
  }
  if (showResults) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
        <div className="max-w-2xl w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              Quiz Complete! 🎉
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You've answered all {quizQuestions.length} questions!
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Analysis About You:
            </h2>
            {Object.keys(scores).map((triat) => (
              <div
                key={triat}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  {triat}
                </p>
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  {scores[triat]}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href='/dashboard2'
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Best Career Options
            </Link>
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .manga-dialog-box::after {
          content: '';
          position: absolute;
          bottom: -1.25rem;
          /* Position the tail on the left side */
          left: 2rem;
          width: 0; 
          height: 0; 
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-top: 20px solid;
          border-top-color: var(--dialog-tail-color);
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
        }

        /* Light Mode Tail */
        .manga-dialog-box {
          --dialog-tail-color: #6B21A8; /* purple-700 */
        }

        /* Dark Mode Tail */
        :global(.dark) .manga-dialog-box {
          --dialog-tail-color: #C084FC; /* purple-400 */
        }

        /* Comic book style emphasis lines */
        .manga-dialog-box::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 2px solid currentColor;
          border-radius: 12px;
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
        <div className="w-full max-w-2xl space-y-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Manga-Style Question Box with tail on bottom-left */}
          <div className="flex justify-center mb-16">
            <div className="manga-dialog-box relative bg-purple-100 dark:bg-purple-800 border-2 border-purple-500 dark:border-purple-300 rounded-lg p-6 md:p-8 shadow-md w-full max-w-lg">
              <p className="text-lg md:text-xl font-semibold text-purple-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Answer MCQs Section */}
          <div className="space-y-3 max-w-lg mx-auto mt-12">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition-all justify-start ${
                  selectedAnswer?.text === option.text
                    ? "bg-purple-600 dark:bg-purple-500 border-purple-600 dark:border-purple-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-purple-500 dark:hover:border-purple-400"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                      selectedAnswer?.text === option.text
                        ? "border-white bg-white text-purple-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option.text}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center max-w-lg mx-auto pt-4">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
                }
              }}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLastQuestion ? "Finish Quiz" : "Next →"}
            </button>
          </div>

          {/* Helper Text */}
          {!selectedAnswer && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              💡 Select an answer to continue
            </p>
          )}
        </div>
      </div>
    </>
  );
}