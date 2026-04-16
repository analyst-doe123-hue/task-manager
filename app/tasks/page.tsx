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

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from("tasks").select("*");
            if (error) throw error;
            setTasks(data || []);
        } catch (err: any) {
            setError(err.message || "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!input.trim()) return;

        // Optimistic add
        const tempId = Date.now();
        const newTask: Task = { id: tempId, text: input.trim(), completed: false };
        setTasks(prev => [newTask, ...prev]);
        setInput("");

        try {
            const { data, error } = await supabase
                .from("tasks")
                .insert([{ text: newTask.text, completed: false }])
                .select()
                .single();

            if (error) throw error;

            // Replace temp task with real one
            setTasks(prev => prev.map(t => t.id === tempId ? data : t));
        } catch (err: any) {
            // Rollback on error
            setTasks(prev => prev.filter(t => t.id !== tempId));
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
    };

    const toggleTask = async (id: number, completed: boolean) => {
        // Optimistic update
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !completed } : task
            )
        );

        try {
            const { error } = await supabase
                .from("tasks")
                .update({ completed: !completed })
                .eq("id", id);
            if (error) throw error;
        } catch (err: any) {
            // Rollback
            setTasks(prev =>
                prev.map(task =>
                    task.id === id ? { ...task, completed } : task
                )
            );
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
    };

    const deleteTask = async (id: number) => {
        // Optimistic delete
        const deletedTask = tasks.find(t => t.id === id);
        setTasks(prev => prev.filter(task => task.id !== id));

        try {
            const { error } = await supabase.from("tasks").delete().eq("id", id);
            if (error) throw error;
        } catch (err: any) {
            // Rollback
            if (deletedTask) setTasks(prev => [deletedTask, ...prev]);
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Task Manager
            </h1>

            {/* Error toast */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    {error}
                </div>
            )}

            {/* Input section */}
            <div className="flex gap-3 mb-8">
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

            {/* Loading state */}
            {loading && (
                <div className="text-center text-gray-500 py-10">
                    <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2">Loading tasks...</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && tasks.length === 0 && (
                <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-4 text-gray-500">No tasks yet. Add one above!</p>
                </div>
            )}

            {/* Task list */}
            {!loading && tasks.length > 0 && (
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className="group flex justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
                        >
                            <span
                                onClick={() => toggleTask(task.id, task.completed)}
                                className={`cursor-pointer flex-1 text-lg transition-all ${task.completed
                                        ? "line-through text-gray-400"
                                        : "text-gray-800 hover:text-gray-600"
                                    }`}
                            >
                                {task.text}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-400 hover:text-red-600 transition-colors opacity-70 group-hover:opacity-100"
                                aria-label="Delete task"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}