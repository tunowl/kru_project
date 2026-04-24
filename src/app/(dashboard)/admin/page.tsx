"use client";

import { useMemo } from "react";
import { SKILLS, SKILL_COLORS, SKILL_NAMES } from "@/lib/data";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function generateClassData() {
    const classes = ['ม.3/1', 'ม.3/2', 'ม.3/3', 'ม.3/4', 'ม.3/5', 'ม.3/6'];
    const baseAvgs: Record<string, number[]> = {
        'ม.3/1': [3.8, 3.7, 3.5, 3.4, 3.7], 'ม.3/2': [3.5, 3.4, 3.2, 3.1, 3.3], 'ม.3/3': [4.1, 3.9, 3.8, 3.6, 4.0],
        'ม.3/4': [2.8, 3.0, 2.7, 2.6, 2.9], 'ม.3/5': [3.6, 3.5, 3.4, 3.3, 3.5], 'ม.3/6': [3.2, 3.1, 3.0, 2.9, 3.1],
    };
    return classes.map(cls => {
        const avgs = baseAvgs[cls] || [3, 3, 3, 3, 3];
        const overallAvg = avgs.reduce((a, b) => a + b, 0) / 5;
        const mastery = Math.round(overallAvg >= 4.2 ? 40 : overallAvg >= 3.7 ? 25 : overallAvg >= 3.2 ? 12 : 5);
        const langdev = Math.round(overallAvg >= 4.0 ? 35 : overallAvg >= 3.5 ? 40 : overallAvg >= 3.0 ? 30 : 15);
        const structok = Math.round(100 - mastery - langdev - 10 > 0 ? 100 - mastery - langdev - 10 : 25);
        const beginner = Math.max(100 - mastery - langdev - structok, 5);
        return { cls, avgs, mastery, langdev, structok, beginner };
    });
}

export default function AdminPage() {
    const classData = useMemo(() => generateClassData(), []);
    const allStudentCount = classData.length * 40;
    const totalMastery = Math.round(classData.reduce((a, c) => a + c.mastery, 0) / classData.length);
    const totalBeginner = Math.round(classData.reduce((a, c) => a + c.beginner, 0) / classData.length);
    const overallSkillAvg = SKILLS.map((_, i) => (classData.reduce((a, c) => a + c.avgs[i], 0) / classData.length).toFixed(2));

    return (
        <div className="container animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="page-header">
                <div className="page-title">รายงานสำหรับผู้บริหาร</div>
                <div className="page-subtitle">ภาพรวมสถานศึกษา · เปรียบเทียบรายห้อง · วิเคราะห์ผลการเรียนรู้เชิงนโยบาย</div>
            </div>

            <div className="admin-kpi mb24">
                <div className="kpi-card"><div className="kpi-icon">👥</div><div className="kpi-num kpi-info">{allStudentCount}</div><div className="kpi-label">นักเรียนทั้งหมด</div></div>
                <div className="kpi-card"><div className="kpi-icon">⭐</div><div className="kpi-num kpi-accent">{totalMastery}%</div><div className="kpi-label">เฉลี่ย Mastery</div></div>
                <div className="kpi-card"><div className="kpi-icon">⚠️</div><div className="kpi-num kpi-danger">{totalBeginner}%</div><div className="kpi-label">เฉลี่ย Beginner</div></div>
            </div>

            <div className="grid-2 mb24">
                <div className="card">
                    <div className="card-label" style={{ marginBottom: 12 }}>การกระจายตัวสมรรถนะ (ทุกห้อง)</div>
                    <div className="chart-wrap" style={{ height: 220 }}>
                        <Doughnut data={{
                            labels: ['Mastery', 'Language Dev', 'Structure OK', 'Beginner'],
                            datasets: [{
                                data: [totalMastery, 35, 25, totalBeginner],
                                backgroundColor: ['#34d4a0', '#4f8ef7', '#f7c14f', '#f76f6f'], borderWidth: 0
                            }]
                        }} options={{ maintainAspectRatio: false, cutout: '65%' }} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-label" style={{ marginBottom: 12 }}>คะแนนเฉลี่ยรายทักษะ (ทุกห้อง)</div>
                    <div className="chart-wrap" style={{ height: 220 }}>
                        <Bar data={{
                            labels: SKILLS.map(s => s + '\n' + SKILL_NAMES[s as keyof typeof SKILL_NAMES]),
                            datasets: [{ label: 'เฉลี่ย', data: overallSkillAvg.map(Number), backgroundColor: SKILL_COLORS, borderRadius: 6 }]
                        }} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 5 } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
            </div>
        </div>
    );
}