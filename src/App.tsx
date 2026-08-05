import { useState } from 'react';
import ScrollCounter from './ScrollCounter.tsx';
import ScrollHeadline from './ScrollHeadline.tsx';
import SubscribeForm from './SubscribeForm.tsx';


const DARK = '#130f40';
const CORAL = '#ff7f50';

const FEATURES = [
  {
    number: '01',
    title: 'Ruthless Prioritization',
    body: 'Flag what actually matters today. Everything else waits in line. No guilt, no noise.',
  },
  {
    number: '02',
    title: 'Capture in Seconds',
    body: "Type a thought and it's logged. No categories to pick, no project to assign. Just done.",
  },
  {
    number: '03',
    title: 'Daily Focus View',
    body: "Every morning, a blank slate of only your top 3. The rest exists — you just don't see it.",
  },
  {
    number: '04',
    title: 'Recurring Tasks',
    body: 'Set it once. It comes back. Walk the dog, send the report, call your mom — automated.',
  },
  {
    number: '05',
    title: 'Offline First',
    body: 'Your list works on a plane, in the subway, in a dead zone. Sync happens when you reconnect.',
  },
  {
    number: '06',
    title: 'Zero Bloat',
    body: 'No integrations page. No AI summaries. No plugin marketplace. Just the list.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I've tried Notion, Things, Todoist, Linear — all of them. This is the first one I've kept open for more than a month.",
    name: 'Mara Osei',
    role: 'Product Designer at Vercel',
  },
  {
    quote: 'The brutally simple interface made me realize I was hiding behind complexity. Now I just do the work.',
    name: 'James Caldwell',
    role: 'Founder, Fieldwork Studio',
  },
  {
    quote: 'My therapist said I needed less decision fatigue. My todo app agreed and deleted half its features.',
    name: 'Priya Menon',
    role: 'Staff Engineer at Stripe',
  },
]

const TASKS_DEMO = [
  { id: 1, text: 'Review Q3 performance report', done: true, tag: 'WORK' },
  { id: 2, text: 'Buy groceries — oat milk, sourdough, eggs', done: false, tag: 'LIFE' },
  { id: 3, text: 'Finish chapter 4 of The Power Broker', done: false, tag: 'READ' },
  { id: 4, text: 'Reply to Lars about the Berlin trip', done: false, tag: 'COMMS' },
  { id: 5, text: 'Schedule dentist appointment', done: true, tag: 'LIFE' },
]

function TodoDemo() {
  const [tasks, setTasks] = useState(TASKS_DEMO)
  const [input, setInput] = useState('')

  const toggle = (id: number) =>
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))

  const add = () => {
    if (!input.trim()) return
    setTasks((t) => [...t, { id: Date.now(), text: input.trim(), done: false, tag: 'NEW' }])
    setInput('')
  }

  return (
    <div className="border-2 rounded-xl overflow-hidden bg-white" style={{ borderColor: DARK }}>
      <div className="flex items-center justify-between border-b-2 px-5 py-3" style={{ borderColor: DARK }}>
        <span className="font-roboto text-xs font-700 tracking-widest uppercase" style={{ color: DARK }}>Today — Aug 2</span>
        <span className="font-roboto text-xs text-neutral-400">{tasks.filter((t) => !t.done).length} remaining</span>
      </div>
      <div className="divide-y-2" style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-4 px-5 py-4 cursor-pointer group hover:!bg-[#3B5BFF] hover:!text-white transition-colors duration-100"
            style={{ borderColor: DARK }}
            onClick={() => toggle(task.id)}
          >
            <div
              className="mt-0.5 w-4 h-4 shrink-0 border-2 flex items-center justify-center transition-colors"
              style={{ borderColor: DARK, backgroundColor: task.done ? DARK : 'white' }}
            >
              {task.done && (
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="1.5,5 4,7.5 8.5,2" />
                </svg>
              )}
            </div>
            <span
              className={`flex-1 text-sm font-500 leading-snug transition-colors ${
                task.done ? 'line-through text-neutral-400' : 'text-ink'
              }`}
            >
              {task.text}
            </span>
            <span className="font-roboto text-[10px] font-700 tracking-widest border px-1.5 py-0.5 shrink-0 opacity-60" style={{ borderColor: DARK, color: DARK }}>
              {task.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t-2 flex" style={{ borderColor: DARK }}>
        <input
          className="flex-1 px-5 py-3 text-sm font-500 outline-none placeholder-neutral-400 bg-white"
          placeholder="Add a task and press Enter…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button
          onClick={add}
          className="border-l-2 px-5 py-3 font-roboto text-xs font-700 tracking-widest uppercase hover:bg-[#3B5BFF] hover:!text-white transition-colors rounded-none"
          style={{ borderColor: DARK, color: DARK }}
        >
          Add
        </button>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="border-b-2 sticky top-0 bg-white z-50" style={{ borderColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#3B5BFF] border-2 rounded flex items-center justify-center" style={{ borderColor: DARK }}>
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2">
              <polyline points="1,6 4,9 11,2" />
            </svg>
          </div>
          <span className="font-700 text-sm tracking-tight">DONE.</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-roboto text-xs font-500 tracking-widest uppercase hover:text-neutral-500 transition-colors">Features</a>
          <a href="#pricing" className="font-roboto text-xs font-500 tracking-widest uppercase hover:text-neutral-500 transition-colors">Pricing</a>
          <a href="#testimonials" className="font-roboto text-xs font-500 tracking-widest uppercase hover:text-neutral-500 transition-colors">Reviews</a>
        </div>
        <button
          className="text-white font-roboto text-xs font-700 tracking-widest uppercase px-4 py-2 rounded-lg border-2 hover:!bg-[#ff9867] transition-colors"
          style={{ backgroundColor: CORAL, borderColor: CORAL }}
        >
          Get Started Free
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="text-white max-w-6xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start hero-background">
      <div>
        <div className="inline-flex items-center gap-2 border-2 rounded-full px-3 py-1.5 mb-8" style={{ borderColor: 'white' }}>
          <div className="w-2 h-2 bg-[#3B5BFF] border border-[#FFFFFF] rounded-full" />
          <span className="font-roboto text-[11px] font-700 tracking-widest uppercase">Now in Public Beta</span>
        </div>
        <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-700 leading-[0.92] tracking-tight mb-8">
          The only<br />
          todo app<br />
          that says<br />
          <span className="relative inline-block">
            <span className="relative z-10">no.</span>
            <span className="absolute inset-0 bg-[#3B5BFF] -skew-x-2 translate-y-1" />
          </span>
        </h1>
        <p className="text-white text-lg font-400 leading-relaxed text-neutral-600 max-w-md mb-10">
          Most productivity apps let you add infinite tasks and feel busy. DONE. limits your day to what you can actually finish. It&apos;s uncomfortable at first. Then it changes everything.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="text-white font-roboto text-xs font-700 tracking-widest uppercase px-8 py-4 rounded-lg border-2 hover:!bg-[#ff9867] transition-colors"
            style={{ backgroundColor: CORAL, borderColor: CORAL }}
          >
            Start for Free →
          </button>
          <button
            className="border-2 font-roboto text-xs font-700 tracking-widest uppercase px-8 py-4 rounded-lg hover:!text-white transition-colors"
            style={{ borderColor: 'white', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = CORAL }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
          >
            Watch Demo
          </button>
        </div>
        <p className="text-gray-600 font-mono text-[11px] mt-4 tracking-wide">No credit card. No dark patterns. Cancel by closing the tab.</p>
        <SubscribeForm />
      </div>
      <div className="lg:pt-8">
        <TodoDemo />
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-gray-600 tracking-wide">← Live demo. Click to check off.</span>
          <span className="font-mono text-[11px] text-gray-600 tracking-wide">v2.4.1</span>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y-2 text-white" style={{ borderColor: DARK, backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x-0 md:divide-x-2 divide-white/20">
          <div className="px-8 py-4">
            <div className="flex font-700 text-4xl tracking-tight text-[#3B5BFF]"><ScrollCounter label="" targetNumber={140} duration={3500} />K</div>
            <div className="font-mono text-xs tracking-widest uppercase text-white/60 mt-1">Active Users</div>
          </div>
          <div className="px-8 py-4">
            <div className="flex font-700 text-4xl tracking-tight text-[#3B5BFF]"><ScrollCounter label="" targetNumber={18} duration={3500} />M</div>
            <div className="font-mono text-xs tracking-widest uppercase text-white/60 mt-1">Task Completed</div>
          </div>
          <div className="px-8 py-4">
            <div className="font-700 text-4xl tracking-tight text-[#3B5BFF]">4.8<span className="inline-block text-2xl">&nbsp;★</span></div>
            <div className="font-mono text-xs tracking-widest uppercase text-white/60 mt-1">App Store Rating</div>
          </div>
          <div className="px-8 py-4">
            <div className="font-700 text-4xl tracking-tight text-[#3B5BFF]">&lt; 2s</div>
            <div className="font-mono text-xs tracking-widest uppercase text-white/60 mt-1">Load Time, Always</div>
          </div>

      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-16 border-b-2 pb-8" style={{ borderColor: DARK }}>
        <h2 className="text-5xl md:text-6xl font-700 tracking-tight leading-none mb-6">
          <ScrollHeadline text={'What it does.'} /><br />
          <span className="text-neutral-400"><ScrollHeadline text={'What it doesn&apos;t.'} /></span>
        </h2>
        <span className="font-roboto text-xs tracking-widest uppercase text-neutral-400 hidden md:block">06 Features</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l-2 border-t-2" style={{ borderColor: DARK }}>
        {FEATURES.map((f) => (
          <div
            key={f.number}
            className="border-r-2 border-b-2 p-8 group hover:bg-[#3B5BFF] hover:text-white transition-colors duration-150"
            style={{ borderColor: DARK }}
          >
            <div className="font-roboto text-xs font-700 text-neutral-300 group-hover:text-white/40 mb-6 transition-colors">{f.number}</div>
            <h3 className="font-700 text-xl tracking-tight mb-3">{f.title}</h3>
            <p className="text-sm font-400 leading-relaxed text-neutral-600 group-hover:text-white/80 transition-colors">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="border-y-2 bg-[#3B5BFF]" style={{ borderColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="font-mono text-xs font-700 tracking-widest uppercase mb-12 text-white">/// What people say</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2" style={{ borderColor: DARK }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="border-r-2 border-b-2 p-8 bg-white hover:bg-[#3B5BFF] hover:text-white transition-colors group" style={{ borderColor: DARK }}>
              <p className="font-400 text-base leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t-2 pt-4" style={{ borderColor: DARK }}>
                <div className="font-700 text-sm">{t.name}</div>
                <div className="font-mono text-[11px] text-neutral-500 tracking-wide mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 border-b-2 pb-8 gap-4" style={{ borderColor: DARK }}>
        <h2 className="text-5xl md:text-6xl font-700 tracking-tight leading-none mb-6"><ScrollHeadline text={'Pricing.'} /></h2>
        <div className="flex items-center gap-3">
          <span className={`font-roboto text-xs font-700 tracking-widest uppercase ${!annual ? 'text-ink' : 'text-neutral-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 border-2 relative transition-colors rounded-full"
            style={{ borderColor: DARK, backgroundColor: annual ? DARK : 'white' }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 bg-[#3B5BFF] border border-[#3B5BFF] rounded-full transition-all"
              style={{ left: annual ? '1.4rem' : '0.1rem' }}
            />
          </button>
          <span className={`font-roboto text-xs font-700 tracking-widest uppercase ${annual ? 'text-ink' : 'text-neutral-400'}`}>Annual <span className="text-[#333]">−20%</span></span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2" style={{ borderColor: DARK }}>
        {[
          { id: '1', name: 'FREE', price: '$0', period: 'forever', features: ['Up to 10 active tasks', 'Daily focus view', 'Mobile app', 'Offline mode'], cta: 'Start Free', highlight: false },
          { id: '2', name: 'PRO', price: annual ? '$7' : '$9', period: 'per month', features: ['Unlimited tasks', 'Recurring tasks', 'Tags & filters', 'Priority support', 'Calendar sync'], cta: 'Get Pro', highlight: true },
          { id: '3', name: 'TEAM', price: annual ? '$12' : '$15', period: 'per user / month', features: ['Everything in Pro', 'Shared workspaces', 'Admin controls', 'Audit logs', 'SSO / SAML'], cta: 'Contact Sales', highlight: false },
        ].map((plan) => (
          <div
            key={plan.name}
            className="border-r-2 border-b-2 p-8 flex flex-col"
            style={{ borderColor: DARK, backgroundColor: plan.highlight ? DARK : 'white', color: plan.highlight ? 'white' : undefined }}
          >
            <div className={`font-roboto text-xs font-700 tracking-widest uppercase mb-6 ${plan.highlight ? 'text-[#3B5BFF]' : 'text-neutral-400'}`}>{plan.name}</div>
            <div className="mb-6">
              <span className="text-5xl font-700 tracking-tight">{plan.price}</span>
              <span className={`font-mono text-xs ml-2 ${plan.highlight ? 'text-white/60' : 'text-neutral-400'}`}>{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-500">
                  <div className="w-4 h-4 shrink-0 border-2 border-[#3B5BFF] bg-[#3B5BFF] rounded flex items-center justify-center">
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2.5">
                      <polyline points="1.5,5 4,7.5 8.5,2" />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`${plan.id === '2' ? 'plan-center-highlight' : 'plan-side-highlight'} border-2 font-roboto text-xs font-700 tracking-widest uppercase px-6 py-3 rounded-lg transition-colors hover:!bg-[#3B5BFF] hover:!border-[#3B5BFF] hover:!text-white`}
              style={plan.highlight
                ? { borderColor: '#3B5BFF', backgroundColor: '#3B5BFF', color: 'white' }
                : { borderColor: DARK, backgroundColor: 'transparent', color: DARK }}
            >
              {plan.cta} →
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="border-t-2 bg-[#3B5BFF]" style={{ borderColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-700 tracking-tight leading-[0.95] mb-12 text-white">
            <ScrollHeadline text={'Stop planning.'} /><br /><ScrollHeadline text={'Start doing.'} />
          </h2>
          <p className="text-base font-400 leading-relaxed text-white/70 max-w-sm">
            Your list is waiting. No setup wizard, no onboarding email sequence, no getting-started tutorial. Just open it and write a task.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <button
            className="text-white font-roboto text-xs font-700 tracking-widest uppercase px-10 py-5 rounded-lg border-2 hover:!bg-[CORAL] hover:!text-white transition-colors w-full lg:w-auto"
            style={{ borderColor: 'white', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = CORAL }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
            >
            Open DONE. — It&apos;s Free →
          </button>
          <span className="font-mono text-[11px] text-white/50 tracking-wide">Web · iOS · Android · Desktop</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t-2 bg-white" style={{ borderColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#3B5BFF] border-2 border-[#3B5BFF] rounded flex items-center justify-center">
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2">
              <polyline points="1,6 4,9 11,2" />
            </svg>
          </div>
          <span className="font-700 text-sm tracking-tight">DONE.</span>
          <span className="font-mono text-xs text-neutral-400 ml-2">© 2026</span>
        </div>
        <div className="flex flex-wrap gap-6">
          {['Privacy', 'Terms', 'Status', 'Blog', 'GitHub'].map((link) => (
            <a key={link} href="#" className="font-roboto text-[11px] tracking-widest uppercase text-neutral-500 hover:text-ink transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-white text-ink">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
