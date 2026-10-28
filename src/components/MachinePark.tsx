import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { bendingMachine, coatingSpecs, laserMachines } from "../data/site";

function Param({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-graphite-2 p-4 sm:p-5">
      <p className="num text-[1.5rem] leading-none text-white sm:text-[1.85rem]">{value}</p>
      <p className="mt-2 text-[0.5625rem] uppercase leading-snug tracking-[0.16em] text-steel sm:text-[0.625rem]">
        {label}
      </p>
    </div>
  );
}

function MachineRow({
  no,
  title,
  note,
  params,
  children,
}: {
  no: string;
  title: string;
  note: string;
  params: { value: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      as="article"
      className="grid gap-8 border-b border-white/10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
    >
      <div className="lg:col-span-4">
        <span className="num text-[0.625rem] text-brand-soft">{no}</span>
        <h3 className="display-md mt-4 text-white">{title}</h3>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel">{note}</p>
        {children}
      </div>
      <div className="lg:col-span-8">
        <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {params.map((p) => (
            <Param key={p.label} value={p.value} label={p.label} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function MachinePark() {
  return (
    <section className="border-y border-white/10 bg-graphite-2" aria-labelledby="park-heading">
      <div className="wrap py-20 lg:py-28">
        <SectionHead
            dark
            no="03"
            titleId="park-heading"
            label="Park maszynowy"
            title={
              <>
                TECHNOLOGIA, NA KTÓREJ
                <br className="hidden sm:block" /> MOŻESZ POLEGAĆ
              </>
            }
            intro="Parametry pracy maszyn w jednym miejscu — bez marketingowych skrótów. Zakres grubości i gabarytów wynika bezpośrednio z wyposażenia zakładu."
          />

        <div className="mt-14 border-t border-white/10">
          <MachineRow
            no="01"
            title="Cięcie laserowe"
            note="Dwie wycinarki laserowe o różnych polach roboczych. Cięcie z materiału powierzonego lub z magazynu własnego."
            params={[
              { value: "25 mm", label: "Stal czarna" },
              { value: "30 mm", label: "Stal nierdzewna" },
              { value: "25 mm", label: "Aluminium" },
              { value: "6000 W", label: "Maks. moc źródła" },
            ]}
          >
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
              {laserMachines.map((m) => (
                <li
                  key={m.name}
                  className="flex items-baseline justify-between gap-3 text-[0.6875rem] uppercase tracking-[0.12em]"
                >
                  <span className="text-white/80">{m.name}</span>
                  <span className="num shrink-0 text-steel">{m.power}</span>
                </li>
              ))}
            </ul>
            <Link to="/ciecie-laserowe" className="link-arrow mt-6 inline-flex">
              Parametry cięcia
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </MachineRow>

          <MachineRow
            no="02"
            title="Gięcie blach CNC"
            note="Prasa krawędziowa AM MACHINERY 3100 z sterowaniem CNC i symulacją procesu przed wykonaniem."
            params={[
              { value: "3100 mm", label: "Długość gięcia" },
              { value: "160 t", label: "Nacisk" },
              { value: "10 mm", label: "Grubość blachy" },
              { value: "CNC", label: "Sterowanie" },
            ]}
          >
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
              {bendingMachine.specs.map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 text-[0.6875rem] uppercase tracking-[0.12em]"
                >
                  <span className="text-white/80">{s.label}</span>
                  <span className="num shrink-0 text-steel">{s.value}</span>
                </li>
              ))}
            </ul>
            <Link to="/giecie-blach-cnc" className="link-arrow mt-6 inline-flex">
              Szczegóły gięcia
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </MachineRow>

          <MachineRow
            no="03"
            title="Lakierowanie proszkowe"
            note="Lakiernia ALCOLOR z pełnym przygotowaniem chemicznym i mechanicznym powierzchni, z możliwością szybkiej zmiany koloru."
            params={[
              { value: "7300 mm", label: "Maks. długość" },
              { value: "2000 mm", label: "Maks. szerokość" },
              { value: "2500 mm", label: "Maks. wysokość" },
              { value: "60–120 µm", label: "Grubość powłoki" },
            ]}
          >
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
              {coatingSpecs.slice(3, 5).map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 text-[0.6875rem] uppercase tracking-[0.12em]"
                >
                  <span className="text-white/80">{s.label}</span>
                  <span className="num shrink-0 text-steel">{s.value}</span>
                </li>
              ))}
            </ul>
            <Link to="/lakierowanie-proszkowe" className="link-arrow mt-6 inline-flex">
              Lakiernia ALCOLOR
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </MachineRow>
        </div>
      </div>
    </section>
  );
}
