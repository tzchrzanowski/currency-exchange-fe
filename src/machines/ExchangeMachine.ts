import { createMachine, assign } from 'xstate';

interface Context {
    selectedCurrency?: string,
    amount?: number,
    buy?: number,
    sell?: number,
    amountConfirmed?: boolean
}

type ExchangeEvent = 
    | { type: 'SELECT_CURRENCY'; currency: string, buy: number; sell: number }
    | { type: 'ENTER_AMOUNT'; amount: number }
    | { type: 'CONFIRM_AMOUNT'; confirmed: boolean };

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
                        buy: ({event}) => event.buy,
                        sell: ({event}) => event.sell
                    }),
                    target: 'inputAmount',
                },
            }
        },
        inputAmount: {
            on: {
                ENTER_AMOUNT: {
                    actions: assign({
                        amount: ({event}) => event.amount,
                    }),
                    target: 'confirmExchange'
                }
            }
        },
        confirmExchange: {
            on: {
                CONFIRM_AMOUNT: {
                    actions: assign({
                        amountConfirmed: ({event}) => event.confirmed,
                    }),
                    guard: ({ event}) => event.confirmed === true,
                    target: 'paymentStep'
                }
            }
        },
        paymentStep: {
            type: 'final'
        }
    },
});
