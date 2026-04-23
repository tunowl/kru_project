"use client"; // Required for React State and Chart.js

import { useState } from "react";
import { SKILLS, SKILL_COLORS, STUDENTS } from "@/lib/data";
import { User, Presentation, Building2 } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "admin">("student");
  const [selectedStudentNo, setSelectedStudentNo] = useState(1);

  // Derived state for the currently selected student
  const currentStudent = STUDENTS.find((s) => s.no === selectedStudentNo) || STUDENTS[0];
  const drafts = currentStudent.drafts;
  const latestDraft = drafts[drafts.length - 1];

  // Radar Chart Configuration
  const radarData = {
    labels: SKILLS,
    datasets: drafts.map((d, i) => ({
      label: `Draft ${i + 1}`,
      data: d,
      borderColor: i === drafts.length - 1 ? "#4f8ef7" : i === 0 ? "rgba(200,200,200,.4)" : "rgba(247,193,79,.5)",
      backgroundColor: i === drafts.length - 1 ? "rgba(79,142,247,.1)" : "transparent",
      borderWidth: i === drafts.length - 1 ? 2 : 1,
    })),
  };

  const radarOptions = {
    scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 } } },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-10">
      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 w-full h-14 bg-white/90 backdrop-blur-md border-b z-50 flex items-center shadow-sm">
        <div className="px-5 font-bold text-blue-600 border-r h-full flex items-center">
          🎓 <span className="text-slate-500 font-normal text-xs ml-2">CbKST</span> Dashboard
        </div>

        <div className="flex h-full flex-1">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 h-full flex items-center gap-2 text-sm font-medium border-b-2 transition-all ${activeTab === "student" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-blue-600 hover:bg-blue-50"}`}
          >
            <User size={16} /> รายบุคคล
          </button>
          {/* Add Teacher and Admin tabs using the same pattern */}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 max-w-7xl mx-auto px-6">

        {/* STUDENT TAB */}
        {activeTab === "student" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="border-b pb-4 mb-6">
              <h1 className="text-2xl font-bold">รายงานสมรรถนะรายบุคคล</h1>
              <p className="text-sm text-slate-500 mt-1">ระบบฐานข้อมูลสมรรถนะการเขียนภาษาอังกฤษ ตามกรอบ CbKST · ม.3</p>
            </header>

            {/* SELECTORS */}
            <div className="flex gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">นักเรียน</label>
                <select
                  className="p-2 border rounded-md bg-white shadow-sm outline-none focus:border-blue-500"
                  value={selectedStudentNo}
                  onChange={(e) => setSelectedStudentNo(Number(e.target.value))}
                >
                  {STUDENTS.map(s => (
                    <option key={s.no} value={s.no}>{s.no}. {s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* RADAR CHART COMPONENT */}
            <div className="bg-white border rounded-xl p-5 shadow-sm max-w-md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">สมรรถนะ 5 ด้าน (Draft ล่าสุด)</h3>
              <div className="h-64 relative">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          </div>
        )}

        {/* TEACHER TAB (Placeholder) */}
        {activeTab === "teacher" && (
          <div>Teacher View...</div>
        )}

        {/* ADMIN TAB (Placeholder) */}
        {activeTab === "admin" && (
          <div>Admin View...</div>
        )}

      </main>
    </div>
  );
}