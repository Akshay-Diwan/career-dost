"use client";

import { joinCommunity } from "@/libs/communities.actions";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation"
import React, { useState } from "react";

export default function CACoursePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const [fieldData, setFieldData] = useState({
    id: 2
  })
  const keySkills = [
    "MathematicalThinking",
    "ProblemSolving", 
    "AttentionToDetail",  
    "ComputerSkills" ,
    "BusinessAwareness"
  ]
  type ButtonVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  const colors: ButtonVariant[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm your CA course assistant. Ask me anything about Chartered Accountancy!", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: inputMessage, isUser: true }]);
    let answer = "";
    try{
    const response = await fetch("http://localhost:8000/chat", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
          {
  "field": "Charted Accountant",
  "message": inputMessage,
  "role": "user",
  "conversation_id": "string"
    }    
      )
    })
    const data = await response.json();
    answer = data.response;
    console.log(answer)
  }catch(err){
      answer = "Sorry we are facing a issue"
  }
    // Simulate AI response after a delay

      setMessages(prev => [...prev, { text: answer, isUser: false }]);

    setInputMessage("");
  };
  const handleJoinCommmunity = async ()=> {
    const res = await joinCommunity(fieldData.id);
    if(res){
      router.push('/dashboard2/community');
      console.log(res);
    }
    else {
      console.error("could not join community");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className={`flex ${isChatOpen ? 'flex-col lg:flex-row' : 'flex-col'} h-screen transition-all duration-500`}>
        {/* Main Content Section */}
        <div className={`${isChatOpen ? 'lg:w-1/2 h-1/2 lg:h-full' : 'w-full'} overflow-y-auto transition-all duration-500`}>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Page Title */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                Chartered Accountant (CA)
              </h1>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {isChatOpen ? "Close AI Chat" : "Launch AI Chat Session"}
                </button>
                
                <button onClick = {handleJoinCommmunity} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Join Community
                </button>
              </div>
            </div>

            {/* Simple Description Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Who is a Chartered Accountant?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Chartered Accountant is like a financial doctor for businesses and individuals. 
                They help manage money, prepare financial reports, ensure taxes are paid correctly, 
                and give advice on how to save and invest wisely. Think of them as experts who make 
                sure every rupee is counted properly and businesses follow all financial rules. 
                They audit accounts (check if everything is correct), help with tax planning, and 
                guide companies in making smart financial decisions.
              </p>
            </div>

            {/* Main Info Grid - KSAOs and Infographics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* KSAOs Card - Takes 2/3 width on desktop */}
              <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                  KSAOs (Knowledge, Skills, Abilities, Others)
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Knowledge
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Deep understanding of accounting principles and standards</li>
                      <li>Taxation laws (Income Tax, GST, Corporate Tax)</li>
                      <li>Financial reporting and auditing standards</li>
                      <li>Corporate and commercial laws</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Skills
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Advanced mathematical and analytical abilities</li>
                      <li>Attention to detail and accuracy</li>
                      <li>Problem-solving and critical thinking</li>
                      <li>Communication and presentation skills</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Abilities & Others
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Time management and ability to work under pressure</li>
                      <li>Ethical judgment and professional integrity</li>
                      <li>Continuous learning mindset</li>
                      <li>Client relationship management</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Infographics Card - Takes 1/3 width on desktop */}
              <div className="md:col-span-1 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                  Quick Facts
                </h2>
                <div className="space-y-4">
                  {/* Average Salary */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Average Salary
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹8-12 LPA
                    </p>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Key Skills & interests
                    </h3>
                    <div className="flex gap-2 flex-wrap w-full">
                    {
                      keySkills.map((skill, idx) => <Button color={colors[idx] || 'primary'} className="w-fit text-xs" variant="flat">{skill} </Button>)
                    }
                    </div>
                    
                  </div>

                  {/* Difficulty Rating */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Difficulty Level
                    </h3>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                      Hard
                    </p>
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  {/* Acheivable posts */}
                      <h3 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Top Posts
                    </h3>
                      <ul className="text-md list-disc list-inside text-gray-700 dark:text-gray-100 space-y-1">
                      <li>CFO</li>
                      <li>Secratary</li>
                      <li>Problem-solving</li>
                      <li>Communication</li>
                    </ul>
                </div>
              </div>
            </div>

            {/* Personality Fit Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
                How much does your personality fit this role?
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Score Display */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                      85%
                    </div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-2">
                      Personality Fit
                    </p>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Reason:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Your analytical mindset, attention to detail, and strong mathematical skills 
                    align well with the core requirements of a Chartered Accountant. Your ability 
                    to work under pressure and maintain accuracy makes you a strong candidate for 
                    this profession. However, consider developing stronger communication skills to 
                    reach your full potential in client-facing roles.
                  </p>
                </div>
              </div>
            </div>

            {/* Cons / Challenges Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">
                Potential Challenges (Cons)
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">⚠️</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Long Study Duration:</span> Requires 4-5 years 
                    of dedicated study with 8+ hours daily commitment.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">⚠️</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">High-Stress Environment:</span> Working with 
                    strict deadlines, especially during tax season and audit periods.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">⚠️</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Tough Examinations:</span> CA exams have a low 
                    pass rate and require multiple attempts for many students.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">⚠️</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Initial Low Income:</span> During articleship 
                    (practical training), stipends are relatively low despite long working hours.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">⚠️</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Continuous Learning:</span> Tax laws and 
                    accounting standards change frequently, requiring lifelong learning.
                  </p>
                </li>
              </ul>
            </div>

            {/* Roadmap Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
                Roadmap to Becoming a CA
              </h2>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      CA Foundation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Complete 10+2 and register for CA Foundation. Study subjects like Accounting, 
                      Business Laws, Mathematics, and Economics. Duration: 4-6 months.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      CA Intermediate
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      After clearing Foundation, register for CA Intermediate. Study advanced 
                      accounting, taxation, and auditing. Duration: 8-12 months.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Articleship (Practical Training)
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Complete 3 years of mandatory practical training under a practicing CA. 
                      Gain real-world experience in auditing, taxation, and accounting.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      CA Final
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      After completing articleship, appear for CA Final exams. This is the toughest 
                      level covering advanced auditing, financial management, and tax laws.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Membership & Career Start
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      After clearing CA Final, become a member of ICAI (Institute of Chartered 
                      Accountants of India). Start your career in practice, industry, or consulting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-4">
                Resources to Learn More
              </h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    ICAI Official Website
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Complete information about CA course, registration, and exam details
                  </p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    CA Study Materials
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Free study resources, notes, and practice questions for all CA levels
                  </p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    CA Career Guidance Videos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    YouTube channels and webinars by experienced CAs sharing career insights
                  </p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    CA Community Forums
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Connect with CA students and professionals to discuss queries and experiences
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface Section */}
        {isChatOpen && (
          <div className={`${isChatOpen ? 'lg:w-1/2 h-1/2 lg:h-full' : 'w-0'} bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-500 overflow-hidden`}>
            {/* Chat Header */}
            <div className="bg-purple-600 dark:bg-purple-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">CA Course Assistant</h3>
                  <p className="text-xs text-purple-200">Ask anything about CA</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-purple-700 dark:hover:bg-purple-600 p-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Press Enter to send your message
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}