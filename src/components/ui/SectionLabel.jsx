export default function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="h-px w-8 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
      />
      <span
        className="text-xs font-body font-semibold tracking-widest uppercase"
        style={{ color: 'var(--color-faint)' }}
      >
        {text}
      </span>
    </div>
  )
}
