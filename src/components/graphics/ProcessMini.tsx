import ProcessIcon from "@/components/graphics/process/ProcessIcon";
import Brackets from "@/components/ui/Brackets";
import { homeV3 } from "@/content/home";
import { processStages } from "@/content/process";

/**
 * /process hero art: the five stages as a chain of bracketed icon tiles joined
 * by dotted connectors, the last one wearing the green result eye.
 * Decorative (the stage panels below carry the words).
 */
export default function ProcessMini() {
  const last = processStages.length - 1;
  return (
    <ol className="grid grid-cols-5 items-center">
      {processStages.map((stage, index) => (
        <li key={stage.number} className="relative flex flex-col items-center gap-3">
          {index < last && (
            <span className="flow-dash absolute left-[calc(50%+30px)] right-[calc(-50%+30px)] top-[30px] h-px border-t border-dashed border-ink/30" />
          )}
          <span className="relative grid h-[60px] w-[60px] place-items-center border border-dashed border-ink/25 bg-card/70 text-ink">
            {index === last && <Brackets inset={-5} />}
            <ProcessIcon stage={homeV3.process.icons[index]} active={index === last} className="h-9 w-9" />
          </span>
          <span className="type-mono-s text-ink-2">{`.${stage.number}`}</span>
        </li>
      ))}
    </ol>
  );
}
