import { createMachine, assign } from 'xstate';

interface Context {
    selectedCurrency?: string,
    amount?: number
}

type ExchangeEvent = 
    | { type: 'SELECT_CURRENCY'; currency: string }
    | { type: 'NEXT'; currency: string };

export const exchangeMachine = createMachine({
    types: {} as {
        context: Context;
        events: ExchangeEvent
    },
    id: 'exchange',
    initial: 'selectCurrency',
    context: {
        selectedCurrency: undefined,
        amount: undefined,
    } as Context,
    states: {
        selectCurrency: {
            on: {
                SELECT_CURRENCY: {
                    actions: assign({
                        selectedCurrency: ({event}) => event.currency,
                    }),
                },
                NEXT: {
                    guard: ({ context}) => !!context.selectedCurrency,
                    target: 'inputAmount',
                }
            }
        },
        inputAmount: {
            type: 'final',
        }
    },
});
