import { ProcessEffects } from './process.effect';
import { ProcessesEffects } from './processes.effect';
import { TasksEffects } from './tasks.effect';

export const effects: any[] = [ProcessEffects,ProcessesEffects,TasksEffects,];

export * from './process.effect';
export * from './processes.effect';
export * from './tasks.effect';

