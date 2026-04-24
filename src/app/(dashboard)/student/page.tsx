"use client";

import { useState } from "react";
import { SKILLS, SKILL_COLORS, SKILL_NAMES, STUDENTS, SLWAI_DATA, FEEDBACKS } from "@/lib/data";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Radar, Line } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale);

const getLevel = (scores: number[]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg >= 4.5) return 'Mastery'; if (avg >= 3.5) return 'LangDev'; if (avg >= 2.5) return 'StructOK'; return 'Beginner';
};
const getLevelLabel = (lvl: string) => ({ Mastery: '⬡ Mastery', LangDev: '⬡ Language Dev', StructOK: '⬡ Structure OK', Beginner: '⬡ Beginner' }[lvl] || lvl);
const getLevelDesc = (lvl: string) => ({ Mastery: 'Academic Enrichment', LangDev: 'พัฒนา CC + GRA', StructOK: 'พัฒนา LR + GRA', Beginner: 'เน้น TR + ME พื้นฐาน' }[lvl] || '');
const slwaiLevel = (total: number) => total >= 67 ? { label: 'สูงมาก', cls: 'gauge-high' } : total >= 45 ? { label: 'ปานกลาง', cls: 'gauge-mid' } : { label: 'ต่ำ', cls: 'gauge-low' };

export default function StudentPage() {
    const [selectedRoom, setSelectedRoom] = useState("ม.3/1");
    const [selectedStudent, setSelectedStudent] = useState(1);

    const s = STUDENTS.find(x => x.no === selectedStudent) || STUDENTS[0];
    const drafts = s.drafts;
    const latest = drafts[drafts.length - 1];
    const first = drafts[0];
    const level = getLevel(latest);
    const growth = latest.reduce((a, b) => a + b, 0) - first.reduce((a, b) => a + b, 0);
    const fb = FEEDBACKS[selectedStudent] || FEEDBACKS[1];
    const slwai = SLWAI_DATA[selectedStudent] || { cog: [3, 3, 3, 3, 3, 3, 3], phy: [3, 3, 3, 3, 3, 3, 3], beh: [3, 3, 3, 3, 3, 3, 3, 3] };

    const cogScore = slwai.cog.reduce((a: number, b: number) => a + b, 0);
    const phyScore = slwai.phy.reduce((a: number, b: number) => a + b, 0);
    const behScore = slwai.beh.reduce((a: number, b: number) => a + b, 0);

    return (
        <div className="container animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="page-header">
                <div className="page-title">รายงานสมรรถนะรายบุคคล</div>
                <div className="page-subtitle">ระบบฐานข้อมูลสมรรถนะการเขียนภาษาอังกฤษ ตามกรอบ CbKST · ม.3</div>
            </div>

            <div className="student-select mb24">
                <div className="sel-group">
                    <label>ห้องเรียน</label>
                    <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}><option value="ม.3/1">ม.3/1</option></select>
                </div>
                <div className="sel-group">
                    <label>นักเรียน</label>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(Number(e.target.value))}>
                        {STUDENTS.map(st => <option key={st.no} value={st.no}>{st.no}. {st.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="section-title">พัฒนาการตามรอบการ Revise</div>
            <div className="draft-timeline mb24">
                {drafts.map((d, i) => {
                    const tot = d.reduce((a, b) => a + b, 0);
                    const prev = i > 0 ? drafts[i - 1].reduce((a, b) => a + b, 0) : null;
                    const diff = prev !== null ? tot - prev : null;
                    const isLatest = i === drafts.length - 1;
                    return (
                        <div key={i} className={`draft-node ${isLatest ? 'active-draft' : ''}`}>
                            <div className="draft-label">DRAFT {i + 1}{isLatest ? ' ★' : ''}</div>
                            <div className="draft-total">{tot}</div>
                            <div className={`draft-change ${diff === null ? 'change-same' : diff > 0 ? 'change-up' : diff < 0 ? 'change-down' : 'change-same'}`}>
                                {diff === null ? 'Baseline' : diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : '—'}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid-12 mb24">
                <div className="card">
                    <div className="card-label">สมรรถนะ 5 ด้าน (Draft ล่าสุด)</div>
                    <div className="chart-wrap" style={{ height: 240 }}>
                        <Radar data={{
                            labels: SKILLS,
                            datasets: drafts.map((d, i) => ({
                                label: `Draft ${i + 1}`, data: d,
                                borderColor: i === drafts.length - 1 ? '#4f8ef7' : i === 0 ? 'rgba(200,200,200,.4)' : 'rgba(247,193,79,.5)',
                                backgroundColor: i === drafts.length - 1 ? 'rgba(79,142,247,.1)' : 'transparent',
                                borderWidth: i === drafts.length - 1 ? 2 : 1,
                            }))
                        }} options={{ scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 } } }, maintainAspectRatio: false }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card" style={{ flex: 0 }}>
                        <div className="card-label">ระดับสมรรถนะ</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                            <div className={`level-badge level-${level}`}>{getLevelLabel(level)}</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{getLevelDesc(level)}</div>
                        </div>
                        <div style={{ marginTop: 14 }}>
                            {SKILLS.map((sk, i) => (
                                <div key={sk} className="skill-row">
                                    <div className="skill-name">{sk}</div>
                                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: `${(latest[i] / 5) * 100}%`, background: SKILL_COLORS[i] }}></div></div>
                                    <div className="skill-val" style={{ color: SKILL_COLORS[i] }}>{latest[i]}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ flex: 1 }}>
                        <div className="card-label">ความกังวล SLWAI</div>
                        <div style={{ marginTop: 8 }}>
                            <div className="gauge-row"><div className="gauge-label">Cognitive</div><div className="gauge-bg"><div className={`gauge-fill ${cogScore / 28 > .6 ? 'gauge-high' : cogScore / 28 > .4 ? 'gauge-mid' : 'gauge-low'}`} style={{ width: `${cogScore / 28 * 100}%` }}></div></div><div className="gauge-val">{cogScore}/28</div></div>
                            <div className="gauge-row"><div className="gauge-label">Physiological</div><div className="gauge-bg"><div className={`gauge-fill ${phyScore / 28 > .6 ? 'gauge-high' : phyScore / 28 > .4 ? 'gauge-mid' : 'gauge-low'}`} style={{ width: `${phyScore / 28 * 100}%` }}></div></div><div className="gauge-val">{phyScore}/28</div></div>
                            <div className="gauge-row"><div className="gauge-label">Behavioral</div><div className="gauge-bg"><div className={`gauge-fill ${behScore / 32 > .6 ? 'gauge-high' : behScore / 32 > .4 ? 'gauge-mid' : 'gauge-low'}`} style={{ width: `${behScore / 32 * 100}%` }}></div></div><div className="gauge-val">{behScore}/32</div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-title">Personalized Feedback รายทักษะ</div>
            <div className="mb24">
                {SKILLS.map(sk => (
                    <div key={sk} className="fb-item">
                        <div className="fb-skill">{sk} · {SKILL_NAMES[sk as keyof typeof SKILL_NAMES]}</div>
                        <div className="fb-text">{fb[sk as keyof typeof fb] || '—'}</div>
                    </div>
                ))}
            </div>
            <div className="card">
                <div className="card-label">แนวทางพัฒนาเฉพาะบุคคล (Intervention)</div>
                <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginTop: 8 }}>{fb.intervention}</div>
            </div>
        </div>
    );
}