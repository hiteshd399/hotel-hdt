import Reveal from './Reveal'

/**
 * Standard section header with eyebrow + title + optional description.
 */
export default function SectionHeader({ eyebrow, title, description, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-3xl ${alignClass} mb-14`}>
      {eyebrow && (
        <Reveal>
          <div className={`section-eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className={`section-title ${light ? '!text-ink' : ''}`}>{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-white/60 text-base md:text-lg leading-relaxed text-pretty">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
