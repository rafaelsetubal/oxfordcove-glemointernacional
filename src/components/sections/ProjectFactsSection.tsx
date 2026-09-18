import { PROJECT_FACTS, PROJECT_FAQ, PROJECT_SOURCES, PROJECT_UPDATED_AT } from '@/data/projectFacts';

export function ProjectFactsSection() {
  return (
    <section
      id="informacoes"
      aria-labelledby="project-facts-title"
      className="defer-render bg-[#FAF9F6] border-t border-[#24231F]/10 py-20 lg:py-28"
    >
      <div className="container-master">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-body text-xs font-semibold tracking-[0.22em] uppercase text-[#806B54] mb-3">
              Informações do empreendimento
            </p>
            <h2
              id="project-facts-title"
              className="font-body text-[38px] sm:text-[48px] lg:text-[56px] font-medium leading-[1.04] tracking-[-0.035em] text-[#171815]"
            >
              Oxford Cove em resumo.
            </h2>
            <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#5A544C] mt-5 max-w-xl">
              Dados essenciais organizados para facilitar sua análise. Preços, disponibilidade e condições
              comerciais devem ser confirmados na tabela oficial vigente.
            </p>
            <p className="font-body text-xs text-[#6B6358] mt-4">
              Atualizado em <time dateTime="2026-09-17">{PROJECT_UPDATED_AT}</time>.
            </p>
          </div>

          <dl className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-[#24231F]/10 border border-[#24231F]/10 rounded-[20px] overflow-hidden">
            {PROJECT_FACTS.map((fact) => (
              <div key={fact.label} className="bg-white p-5 sm:p-6">
                <dt className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-[#806B54]">
                  {fact.label}
                </dt>
                <dd className="font-body text-[22px] sm:text-[25px] font-medium leading-tight tracking-[-0.025em] text-[#171815] mt-2">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 lg:mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-body text-[32px] sm:text-[40px] font-medium leading-tight tracking-[-0.035em] text-[#171815]">
              Perguntas frequentes.
            </h2>
            <p className="font-body text-sm leading-relaxed text-[#5A544C] mt-4">
              Respostas objetivas sobre localização, valores, tipologias e condições do lançamento.
            </p>

            <div className="mt-7 pt-6 border-t border-[#24231F]/10">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#806B54] mb-3">
                Fontes consultadas
              </p>
              <ul className="space-y-2">
                {PROJECT_SOURCES.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-[#28372D] underline underline-offset-4 hover:text-[#806B54]"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-[#24231F]/15">
            {PROJECT_FAQ.map((item) => (
              <details key={item.question} className="group border-b border-[#24231F]/15 py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-body text-base sm:text-[17px] font-semibold text-[#171815] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#806B54] focus-visible:ring-offset-4 rounded-sm">
                  {item.question}
                  <span aria-hidden="true" className="text-[#806B54] text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#5A544C] mt-4 pr-8">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
