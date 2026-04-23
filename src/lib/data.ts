export const SKILLS = ['TR', 'ME', 'LR', 'GRA', 'CC'];
export const SKILL_COLORS = ['#4f8ef7', '#34d4a0', '#f7c14f', '#f76f6f', '#b47fff'];
export const SKILL_NAMES = { TR: 'Task Response', ME: 'Mechanics', LR: 'Lexical Range', GRA: 'Grammar', CC: 'Coherence' };

export const STUDENTS = [
    { no: 1, name: 'ด.ช.กฤตภาส ใจใหญ่', drafts: [[3, 3, 2, 2, 3], [4, 3, 3, 2, 3], [4, 3, 3, 3, 4]], slwai: 38, flag: 'Lucky' },
    { no: 2, name: 'ด.ช.กฤติน ซึงรุ่งโชติ', drafts: [[5, 3, 4, 3, 5], [5, 4, 4, 3, 5], [5, 4, 5, 4, 5]], slwai: 66, flag: 'Careless' },
    { no: 3, name: 'ด.ช.กวินทัต สุราฤทธิ์', drafts: [[3, 4, 4, 4, 3], [4, 4, 4, 4, 4], [4, 4, 5, 4, 4]], slwai: 45, flag: 'OK' },
    { no: 4, name: 'ด.ช.กิตติศักดิ์ วงษา', drafts: [[5, 5, 5, 5, 5], [5, 5, 5, 5, 5], [5, 5, 5, 5, 5]], slwai: 66, flag: 'OK' },
    { no: 5, name: 'ด.ช.ฉัตตพัทธ์ ก๊กมาศ', drafts: [[4, 4, 4, 3, 3], [4, 4, 4, 3, 4], [4, 4, 4, 4, 4]], slwai: 57, flag: 'OK' },
    { no: 6, name: 'ด.ญ.ชลิสา รักษาสุข', drafts: [[3, 3, 3, 2, 3], [3, 3, 3, 3, 3], [4, 3, 3, 3, 3]], slwai: 72, flag: 'OK' },
    { no: 7, name: 'ด.ช.ณภัทร วิชิตพงศ์', drafts: [[3, 2, 3, 2, 3], [3, 3, 3, 2, 3], [3, 3, 3, 3, 3]], slwai: 48, flag: 'Lucky' },
    { no: 8, name: 'ด.ญ.ณัฐณิชา พงษ์ไพร', drafts: [[4, 4, 4, 4, 4], [4, 4, 4, 4, 4], [5, 4, 5, 4, 4]], slwai: 41, flag: 'OK' },
    { no: 9, name: 'ด.ช.ธนกฤต แสนคำ', drafts: [[3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [4, 3, 3, 3, 3]], slwai: 55, flag: 'OK' },
    { no: 10, name: 'ด.ญ.ธนัชพร เพ็งศรี', drafts: [[2, 3, 2, 2, 2], [2, 3, 2, 2, 3], [3, 3, 3, 2, 3]], slwai: 80, flag: 'Lucky' },
    { no: 11, name: 'ด.ช.ธีรภัทร โรจน์สกุล', drafts: [[3, 4, 2, 3, 3], [3, 4, 3, 3, 3], [4, 4, 3, 3, 4]], slwai: 44, flag: 'OK' },
    { no: 12, name: 'ด.ญ.นภัสสร อินทร์แก้ว', drafts: [[4, 4, 4, 4, 4], [4, 4, 4, 4, 4], [4, 5, 4, 4, 4]], slwai: 38, flag: 'Careless' },

];

export const SLWAI_DATA: Record<number, any> = {
    1: { cog: [4, 2, 2, 3, 2, 1, 2], phy: [2, 2, 1, 1, 1, 2, 3], beh: [1, 1, 1, 1, 1, 3, 1, 1] },
    2: { cog: [3, 3, 3, 3, 3, 3, 3], phy: [3, 3, 3, 3, 3, 3, 3], beh: [3, 3, 3, 3, 3, 3, 3, 3] },
    3: { cog: [3, 2, 2, 2, 3, 1, 1], phy: [2, 2, 2, 1, 2, 2, 1], beh: [2, 2, 3, 2, 3, 3, 3, 1] },
};

export const FEEDBACKS: Record<number, any> = {
    1: { TR: 'ตีโจทย์และวางโครงสร้างย่อหน้าได้ดี', ME: 'กลไกภาษาพื้นฐานได้ตามเกณฑ์', LR: 'ใช้คำกว้างๆ ควรเจาะจงแทน "something"', GRA: 'ต้องเน้นสอนการรวมประโยคและโครงสร้างความซ้อน', CC: 'พบ Lucky Guess สูง น่าจะท่องจำเทมเพลต', intervention: 'เน้นสอนคำศัพท์ (Vocabulary Expansion) และไวยากรณ์ (GRA): การรวมประโยคและโครงสร้างความซ้อน' },
    2: { TR: 'จัดวางโครงสร้างการเขียนและตอบโจทย์ได้ดีมาก', ME: 'อาจมี Careless Error ในการแบ่งประโยค Full stop', LR: 'มีคลังคำศัพท์ที่ดีมาก', GRA: 'พบ Sentence Fragment ต้องสอนขอบเขตประโยค', CC: 'ใช้คำเชื่อมได้เป็นธรรมชาติ', intervention: 'เน้นสอน Sentence Boundaries: ความแตกต่าง Phrase/Clause และการนำ V-ing ไปเชื่อมด้วย comma' },
    3: { TR: 'ทักษะพื้นฐานสอดคล้องกับผลลัพธ์ทั้งหมด', ME: 'ไม่มี Careless Error ในการจัดรูปแบบ', LR: 'มีคลังคำศัพท์ที่ดี สอดคล้องกับระดับ', GRA: 'โครงสร้างภาษาแข็งแรง ไม่มีข้อผิดพลาด', CC: 'ไม่มี Lucky Guess หรือพฤติกรรมท่องจำเทมเพลต', intervention: 'Enrichment: ท้าทายให้เพิ่ม Supporting Details หรือสอน Refutation เพื่อยกระดับเป็นวิชาการ' },
};