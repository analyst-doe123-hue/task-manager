"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setTasks(data || []);
    } catch (err: any) {
      console.error("FETCH ERROR:", err);
      setError("Failed to load tasks. Check Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ ADD TASK
  const addTask = async () => {
    if (!input.trim()) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ text: input.trim(), completed: false }])
        .select()
        .single();

      if (error) throw error;

      setTasks((prev) => [data, ...prev]);
      setInput("");
    } catch (err: any) {
      console.error("ADD ERROR:", err);
      setError("Failed to add task.");
    }
  };

  // ✅ TOGGLE TASK
  const toggleTask = async (task: Task) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", task.id);

      if (error) throw error;

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err: any) {
      console.error("UPDATE ERROR:", err);
      setError("Failed to update task.");
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id: number) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error("DELETE ERROR:", err);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
        Task Manager
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 mb-8 flex-col sm:flex-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="What needs to be done?"
        />
        <button
          onClick={addTask}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Add
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 py-10">
          <p>Loading tasks...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No tasks yet. Add one above 👆
        </div>
      )}

      {/* Tasks */}
      {!loading && tasks.length > 0 && (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-white/80 p-4 rounded-xl shadow-md border"
            >
              <span
                onClick={() => toggleTask(task)}
                className={`cursor-pointer flex-1 text-lg ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}