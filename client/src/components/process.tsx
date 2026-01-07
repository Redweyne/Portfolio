import { Compass, Hammer, Rocket, ShieldCheck, Timer, Workflow } from "lucide-react";

const phases = [
  {
    title: "Discovery Pulse",
    code: "PHASE_01",
    description:
      "Rapid alignment on the problem space with focused interviews, technical spikes, and a clear definition of done.",
    icon: Compass,
    highlights: ["48h kickoff window", "Risk + constraints map", "North-star success metric"],
  },
  {
    title: "Build & Iterate",
    code: "PHASE_02",
    description:
      "Short, observable cycles that ship visible progress—pairing DX polish with resilient architecture choices.",
    icon: Hammer,
    highlights: ["Weekly demo builds", "Automated quality gates", "Real user telemetry hooks"],
  },
  {
    title: "Deploy & Scale",
    code: "PHASE_03",
    description:
      "Production-ready hardening, zero-downtime releases, and dashboards that keep every signal in view.",
    icon: Rocket,
    highlights: ["Blue/green ready", "Latency & error budgets", "Ownership docs + runbooks"],
  },
];

const guarantees = [
  {
    label: "Response SLA",
    value: "< 24h",
    description: "Questions answered quickly so momentum never stalls.",
    icon: Timer,
  },
  {
    label: "Quality Gates",
    value: "CI verified",
    description: "Ship with linted, typed, and accessibility-aware changes.",
    icon: ShieldCheck,
  },
  {
    label: "Delivery Rhythm",
    value: "Weekly proof",
    description: "Every sprint ends with something you can click, test, and feel.",
    icon: Workflow,
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-16 sm:py-24 md:py-32 bg-[#050508] relative overflow-hidden"
    >
      <div className="absolute inset-0 hex-grid opacity-5 hidden sm:block" />
      <div className="absolute top-16 left-0 w-64 h-64 bg-[#00ffff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-8 right-0 w-72 h-72 bg-[#ff00ff]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-10 sm:space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="cyber-card px-6 py-2">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                [ SECTION_03a ]
              </span>
            </div>
          </div>

          <h2 className="cyber-text text-3xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-glow-cyan">OPERATING</span>{" "}
            <span className="text-[#ff00ff] text-glow-magenta">SYSTEM</span>
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
            <span className="text-[#00ffff]">&lt;</span>
            A reliable delivery loop—discovery, build, deploy—designed for founders and teams who need to see progress every single week.
            <span className="text-[#00ffff]">/&gt;</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {phases.map((phase) => (
            <div
              key={phase.code}
              className="cyber-card p-6 space-y-4 border border-[#00ffff]/20 hover:border-[#00ffff] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <phase.icon className="w-6 h-6 text-[#00ffff]" />
                  <span className="font-mono text-xs text-[#ff00ff] tracking-widest">
                    {phase.code}
                  </span>
                </div>
                <div className="px-3 py-1 border border-[#00ffff]/30 rounded-full font-mono text-xs text-[#00ffff]">
                  ACTIVE
                </div>
              </div>

              <h3 className="text-white text-xl sm:text-2xl font-bold cyber-text">
                {phase.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{phase.description}</p>

              <div className="space-y-2">
                {phase.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2 font-mono text-xs text-gray-300"
                  >
                    <span className="text-[#00ffff]">▹</span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:snap-none md:pb-0">
          {guarantees.map((item) => (
            <div key={item.label} className="min-w-[240px] snap-start md:min-w-0">
              <div className="cyber-card p-5 flex flex-col gap-3 border border-[#00ffff]/10 hover:border-[#00ffff]/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#00ffff]" />
                  <span className="font-mono text-xs text-gray-500 tracking-widest">
                    {item.label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white">
                  <span className="text-[#00ffff]">{item.value}</span>
                </div>
                <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
