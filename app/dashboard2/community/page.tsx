"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

// Types
interface Community {
  id: string;
  name: string;
  description: string;
}

interface Message {
  id: string;
  community_id: string;
  user_id: string;
  text: string;
  created_at: string;
}

interface UserProfile {
  user_id: string;
  joined_communities: string[];
}

export default function ChatPage() {
  // Supabase client state
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Community state
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Community[]>([]);
  
  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Supabase client
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (supabaseUrl && supabaseAnonKey) {
      const client = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(client);
    }
  }, []);

  // Auth listener - Handle user authentication
  useEffect(() => {
    if (!supabase) return;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        // Sign in anonymously if no user
        supabase.auth.signInAnonymously().then(({ data }) => {
          if (data.user) {
            setUser(data.user);
          }
        });
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Fetch user profile and joined communities
  useEffect(() => {
    if (!supabase || !user) return;

    const fetchUserProfile = async () => {
      // Step 1: Fetch user profile with joined communities
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("joined_communities")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError);
        return;
      }

      // If profile doesn't exist, create one
      if (!profile) {
        await supabase.from("profiles").insert({
          user_id: user.id,
          joined_communities: [],
        });
        setUserProfile({ user_id: user.id, joined_communities: [] });
        setJoinedCommunities([]);
        return;
      }

      setUserProfile(profile);

      // Step 2: If user has joined communities, fetch their details
      if (profile.joined_communities && profile.joined_communities.length > 0) {
        const { data: communities, error: communitiesError } = await supabase
          .from("communities")
          .select("*")
          .in("id", profile.joined_communities);

        if (communitiesError) {
          console.error("Error fetching communities:", communitiesError);
          return;
        }

        setJoinedCommunities(communities || []);
      } else {
        setJoinedCommunities([]);
      }
    };

    fetchUserProfile();
  }, [supabase, user]);

  // Search communities
  const handleSearch = useCallback(async () => {
    if (!supabase || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .ilike("name", `%${searchQuery}%`);

    if (error) {
      console.error("Error searching communities:", error);
      return;
    }

    setSearchResults(data || []);
  }, [supabase, searchQuery]);

  // Join a community
  const handleJoin = useCallback(
    async (communityId: string) => {
      if (!supabase || !user || !userProfile) return;

      // Check if already joined
      if (userProfile.joined_communities.includes(communityId)) {
        return;
      }

      const updatedCommunities = [...userProfile.joined_communities, communityId];

      // Update profile with new community
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            joined_communities: updatedCommunities,
          },
          { onConflict: "user_id" }
        );

      if (error) {
        console.error("Error joining community:", error);
        return;
      }

      // Update local state
      setUserProfile({
        ...userProfile,
        joined_communities: updatedCommunities,
      });

      // Fetch the newly joined community details
      const { data: community } = await supabase
        .from("communities")
        .select("*")
        .eq("id", communityId)
        .single();

      if (community) {
        setJoinedCommunities([...joinedCommunities, community]);
      }

      // Clear search
      setSearchQuery("");
      setSearchResults([]);
    },
    [supabase, user, userProfile, joinedCommunities]
  );

  // Fetch messages and set up real-time subscription
  useEffect(() => {
    if (!supabase || !selectedCommunity) return;

    const fetchMessages = async () => {
      // Step 1: Fetch initial messages
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("community_id", selectedCommunity.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // Step 2: Subscribe to real-time updates
    const channel = supabase
      .channel(`messages:${selectedCommunity.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `community_id=eq.${selectedCommunity.id}`,
        },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new as Message]);
        }
      )
      .subscribe();

    // Step 3: Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, selectedCommunity]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message
  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!supabase || !user || !selectedCommunity || !newMessage.trim()) return;

      const { error } = await supabase.from("messages").insert({
        text: newMessage,
        user_id: user.id,
        community_id: selectedCommunity.id,
      });

      if (error) {
        console.error("Error sending message:", error);
        return;
      }

      setNewMessage("");
    },
    [supabase, user, selectedCommunity, newMessage]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop: 2-column layout, Mobile: conditional single view */}
      <div className="h-screen grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar - Community List */}
        {/* Show on desktop always, on mobile only when no community selected */}
        <div
          className={`${
            selectedCommunity ? "hidden md:block" : "block"
          } md:col-span-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Communities
            </h2>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Search Results
              </h3>
              <div className="space-y-2">
                {searchResults.map((community) => {
                  const isJoined = userProfile?.joined_communities.includes(
                    community.id
                  );
                  return (
                    <div
                      key={community.id}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {community.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {community.description}
                        </p>
                      </div>
                      {!isJoined && (
                        <button
                          onClick={() => handleJoin(community.id)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
                        >
                          Join
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Joined Communities List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Your Communities
            </h3>
            {joinedCommunities.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No communities joined yet. Search and join communities above!
              </p>
            ) : (
              <div className="space-y-2">
                {joinedCommunities.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => setSelectedCommunity(community)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCommunity?.id === community.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <p className="font-semibold">{community.name}</p>
                    <p
                      className={`text-xs ${
                        selectedCommunity?.id === community.id
                          ? "text-purple-100"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {community.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {/* Show only when community is selected */}
        <div
          className={`${
            selectedCommunity ? "block" : "hidden md:block"
          } md:col-span-3 flex flex-col ${
            selectedCommunity ? "absolute inset-0 md:relative" : ""
          }`}
        >
          {selectedCommunity ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
                {/* Back button for mobile */}
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCommunity.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedCommunity.description}
                  </p>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No messages yet. Be the first to say hello! 👋
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.user_id === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          isOwnMessage ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            isOwnMessage
                              ? "bg-purple-600 text-white rounded-br-none"
                              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm break-words">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwnMessage
                                ? "text-purple-200"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSend}
                className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-lg font-semibold">Select a community to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}