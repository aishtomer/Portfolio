import { prisma } from '@/lib/prisma';

export default async function Home() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const education = await prisma.education.findMany({ orderBy: { order: 'asc' } });
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  const skills = await prisma.skillCategory.findMany({ orderBy: { order: 'asc' } });

  // For LeetCode stats, we fetch from the public API
  let leetcodeStats = null;
  if (profile?.leetcodeUsername) {
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${profile.leetcodeUsername}/solved`, { next: { revalidate: 3600 } });
      if (res.ok) {
        leetcodeStats = await res.json();
      }
    } catch (e) {
      console.error('Failed to fetch leetcode stats:', e);
    }
  }

  return (
    <main className="container animate-fade-in">
      <header className="section" style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <h1 className="section-title text-gradient" style={{ fontSize: '4rem', marginBottom: '10px' }}>
          {profile?.name}
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>{profile?.tagline}</p>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {profile?.githubUrl && <a href={profile.githubUrl} className="btn glass" target="_blank" rel="noreferrer">GitHub</a>}
          {profile?.linkedinUrl && <a href={profile.linkedinUrl} className="btn glass" target="_blank" rel="noreferrer">LinkedIn</a>}
          {profile?.email && <a href={`mailto:${profile.email}`} className="btn glass">Email</a>}
        </div>
      </header>

      {/* LeetCode Stats */}
      {leetcodeStats && leetcodeStats.solvedProblem && (
        <section className="section glass" style={{ padding: '40px', marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontWeight: '600' }}>Competitive Programming: LeetCode</h2>
          <div className="grid grid-3">
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>{leetcodeStats.easySolved}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Easy</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{leetcodeStats.mediumSolved}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Medium</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>{leetcodeStats.hardSolved}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Hard</div>
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      <section className="section">
        <h2 className="section-title">Experience</h2>
        <div className="grid">
          {experiences.map(exp => (
            <div key={exp.id} className="glass" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>{exp.role} <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>at</span> <span className="text-gradient">{exp.company}</span></h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <ul style={{ marginLeft: '20px', color: 'var(--text-secondary)' }}>
                {JSON.parse(exp.highlights).map((h: string, i: number) => <li key={i} style={{ marginBottom: '8px' }}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h2 className="section-title">Education</h2>
        <div className="grid">
          {education.map(ed => (
            <div key={ed.id} className="glass" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>{ed.degree}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>{ed.startDate} - {ed.endDate}</span>
              </div>
              <div style={{ color: 'var(--accent-color)', marginBottom: '15px', fontWeight: '500' }}>{ed.institution}</div>
              <ul style={{ marginLeft: '20px', color: 'var(--text-secondary)' }}>
                {JSON.parse(ed.highlights).map((h: string, i: number) => <li key={i} style={{ marginBottom: '8px' }}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-2">
          {projects.map(proj => (
            <div key={proj.id} className="glass" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{proj.title}</h3>
              <div style={{ fontSize: '0.85rem', color: '#ec4899', marginBottom: '20px', fontFamily: 'monospace', background: 'rgba(236, 72, 153, 0.1)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', alignSelf: 'flex-start' }}>{proj.techStack}</div>
              <ul style={{ marginLeft: '20px', color: 'var(--text-secondary)', flex: 1 }}>
                {JSON.parse(proj.highlights).map((h: string, i: number) => <li key={i} style={{ marginBottom: '8px' }}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section" style={{ paddingBottom: '120px' }}>
        <h2 className="section-title">Skills</h2>
        <div className="grid grid-3">
          {skills.map(skill => (
            <div key={skill.id} className="glass" style={{ padding: '24px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>{skill.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>{skill.skills}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
