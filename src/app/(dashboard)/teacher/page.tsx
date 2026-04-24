"use client";

import { useState } from "react";
import { SKILLS, SKILL_COLORS, STUDENTS, FEEDBACKS } from "@/lib/data";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const getLevel = (scores: number[]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg >= 4.5) return 'Mastery'; if (avg >= 3.5) return 'LangDev'; if (avg >= 2.5) return 'StructOK'; return 'Beginner';
};
const getLevelLabel = (lvl: string) => ({ Mastery: '⬡ Mastery', LangDev: '⬡ Language Dev', StructOK: '⬡ Structure OK', Beginner: '⬡ Beginner' }[lvl] || lvl);

const heatColors = (v: number) => {
    if (v >= 5) return { bg: 'rgba(52,212,160,.4)', c: '#34d4a0' };
    if (v >= 4) return { bg: 'rgba(79,142,247,.35)', c: '#4f8ef7' };
    if (v >= 3) return { bg: 'rgba(247,193,79,.3)', c: '#f7c14f' };
    if (v >= 2) return { bg: 'rgba(247,111,111,.35)', c: '#f76f6f' };
    return { bg: 'rgba(180,127,255,.3)', c: '#b47fff' };
};

export default function TeacherPage() {
    const [teacherRoom, setTeacherRoom] = useState("ม.3/1");

    const teacherStudents = teacherRoom === 'all' ? STUDENTS : STUDENTS;
    const teacherLevels = teacherStudents.map(st => getLevel(st.drafts[st.drafts.length - 1]));
    const cnt = { Mastery: 0, LangDev: 0, StructOK: 0, Beginner: 0 };
    teacherLevels.forEach(l => cnt[l as keyof typeof cnt]++);
    const avgSkills = SKILLS.map((_, i) => (teacherStudents.reduce((a, st) => a + st.drafts[st.drafts.length - 1][i], 0) / teacherStudents.length).toFixed(2));
    const needsAttention = teacherStudents.filter(st => st.flag !== 'OK' || st.slwai >= 67 || getLevel(st.drafts[st.drafts.length - 1]) === 'Beginner');

    return (
        <div className="container animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="page-header">
                <div className="page-title">รายงานสำหรับครู</div>
                <div className="page-subtitle">ภาพรวมห้องเรียน · ตรวจสอบพัฒนาการรายบุคคล · จัดกลุ่มการสอนซ่อมเสริม</div>
            </div>

            <div className="filter-bar">
                <label>เลือกห้อง :</label>
                <div className="selector">
                    <button className={`sel-btn ${teacherRoom === 'ม.3/1' ? 'active' : ''}`} onClick={() => setTeacherRoom('ม.3/1')}>ม.3/1</button>
                    <button className={`sel-btn ${teacherRoom === 'all' ? 'active' : ''}`} onClick={() => setTeacherRoom('all')}>ทั้งหมด</button>
                </div>
            </div>

            <div className="grid-4 mb24">
                <div className="card"><div className="card-label">นักเรียนทั้งหมด</div><div className="card-value kpi-info">{teacherStudents.length}</div><div className="card-sub">{teacherRoom}</div></div>
                <div className="card"><div className="card-label">Mastery</div><div className="card-value kpi-accent">{cnt.Mastery}</div><div className="card-sub">{(cnt.Mastery / teacherStudents.length * 100).toFixed(0)}% ของห้อง</div></div>
                <div className="card"><div className="card-label">ต้องสอนซ่อมเสริม</div><div className="card-value kpi-danger">{cnt.Beginner + cnt.StructOK}</div><div className="card-sub">Beginner + Structure OK</div></div>
                <div className="card"><div className="card-label">มีความกังวลสูง</div><div className="card-value kpi-warn">{teacherStudents.filter(st => st.slwai >= 67).length}</div><div className="card-sub">SLWAI ≥ 67</div></div>
            </div>

            <div className="grid-2 mb24">
                <div className="card">
                    <div className="card-label" style={{ marginBottom: 14 }}>สัดส่วนระดับสมรรถนะ</div>
                    <div className="stacked-bar">
                        {['Mastery', 'LangDev', 'StructOK', 'Beginner'].map(l => {
                            const val = cnt[l as keyof typeof cnt];
                            const colors: Record<string, string> = { Mastery: '#34d4a0', LangDev: '#4f8ef7', StructOK: '#f7c14f', Beginner: '#f76f6f' };
                            return val > 0 ? <div key={l} className="stacked-seg" style={{ width: `${val / teacherStudents.length * 100}%`, background: colors[l] }}>{val}</div> : null;
                        })}
                    </div>
                </div>
                <div className="card">
                    <div className="card-label" style={{ marginBottom: 4 }}>สมรรถนะเฉลี่ยรายทักษะ</div>
                    <div className="chart-wrap" style={{ height: 190 }}>
                        <Bar data={{
                            labels: SKILLS,
                            datasets: [{ label: 'คะแนนเฉลี่ย', data: avgSkills.map(Number), backgroundColor: SKILL_COLORS, borderRadius: 5 }]
                        }} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 5 } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
            </div>

            <div className="section-title">ตารางนักเรียนทั้งหมด</div>
            <div className="card" style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead><tr><th>#</th><th>ชื่อ</th><th>TR</th><th>ME</th><th>LR</th><th>GRA</th><th>CC</th><th>ระดับ</th><th>Flag</th><th>SLWAI</th></tr></thead>
                    <tbody>
                        {teacherStudents.map(st => {
                            const last = st.drafts[st.drafts.length - 1];
                            const lv = getLevel(last);
                            return (
                                <tr key={st.no}>
                                    <td style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11 }}>{st.no}</td>
                                    <td>{st.name}</td>
                                    {last.map((v, i) => <td key={i}><span className={`score-pill s${v}`}>{v}</span></td>)}
                                    <td><span className={`level-badge level-${lv}`} style={{ fontSize: 10, padding: '3px 8px' }}>{lv}</span></td>
                                    <td>{st.flag === 'Lucky' ? <span className="flag-lucky">Lucky</span> : st.flag === 'Careless' ? <span className="flag-careless">Careless</span> : <span style={{ color: 'var(--muted)', fontSize: 10 }}>—</span>}</td>
                                    <td style={{ color: st.slwai >= 67 ? 'var(--accent4)' : st.slwai >= 45 ? 'var(--accent3)' : 'var(--accent2)' }}>{st.slwai}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}