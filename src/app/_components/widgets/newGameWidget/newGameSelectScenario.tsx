import { Dispatch, SetStateAction } from 'react';

import { Scenario } from '@/enum';

type NewGameSelectScenarioProps = {
  scenario: Scenario;
  setScenario: Dispatch<SetStateAction<Scenario>>;
};

const selectedScenarioStyle = 'bg-catan-red  text-primary';
const unselectedScenarioStyle = ' bg-gray-400 text-black opacity-50';

const NewGameSelectScenario = ({ scenario, setScenario }: NewGameSelectScenarioProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="mr-6 text-lg font-bold">Scenario</span>
      <div className="flex items-center justify-center gap-2">
        <button
          className={`rounded-xl p-2 ${scenario === Scenario.Standard ? selectedScenarioStyle : unselectedScenarioStyle}`}
          onClick={() => setScenario(Scenario.Standard)}
        >
          Standard
        </button>
        <button
          className={`rounded-xl p-2 ${scenario === Scenario.Seafarers ? selectedScenarioStyle : unselectedScenarioStyle}`}
          onClick={() => setScenario(Scenario.Seafarers)}
        >
          Seafarers
        </button>
      </div>
    </div>
  );
};

export default NewGameSelectScenario;
