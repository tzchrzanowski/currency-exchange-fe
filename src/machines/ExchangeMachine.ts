import { createMachine, assign } from 'xstate';

interface Context {
    selectedCurrency?: string,
    amount?: number,
    buy?: number,
    sell?: number,
    amountConfirmed?: boolean,
    amountToPay?: number,
    transactionId?: number,
    selectedOption?: string
}

type ExchangeEvent = 
    | { type: 'SELECT_CURRENCY', currency: string, buy: number, sell: number }
    | { type: 'ENTER_AMOUNT', amount: number }
    | { type: 'CONFIRM_AMOUNT', confirmed: boolean, amountToPay: number, selectedOption: string }
    | { type: 'SUBMIT_PAYMENT', transactionId: number }
    | { type: 'PAYMENT_FAILED', reason: string}
    | { type: 'GO_BACK'}
    | { type: 'RESET'};


const initialContext: Context = {
    selectedCurrency: undefined,
    amount: undefined,
    buy: undefined,
    sell: undefined,
    amountConfirmed: undefined,
    amountToPay: undefined,
    transactionId: undefined,
    selectedOption: undefined
}

export const exchangeMachine = createMachine({
    types: {} as {
        context: Context;
        events: ExchangeEvent
    },
    id: 'exchange',
    initial: 'selectCurrency',
    context: initialContext,
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
                },
                GO_BACK: 'selectCurrency'
            }
        },
        confirmExchange: {
            on: {
                CONFIRM_AMOUNT: {
                    actions: assign({
                        amountConfirmed: ({event}) => event.confirmed,
                        amountToPay: ({event}) => event.amountToPay,
                        selectedOption: ({event}) => event.selectedOption,
                    }),
                    target: 'paymentStep'
                },
                GO_BACK: 'inputAmount'

            }
        },
        paymentStep: {
            on: {
                SUBMIT_PAYMENT: {
                    actions: assign({
                        transactionId: ({event}) => event.transactionId,
                    }),
                    target: 'finalConfirmationStep'
                },
                PAYMENT_FAILED: {
                    target: 'paymentErrorStep'
                },
                GO_BACK: 'confirmExchange'
            }
        },
        finalConfirmationStep: {
            on: {
                GO_BACK: 'selectCurrency'
            }
        },
        paymentErrorStep: {
            on: {
                GO_BACK: 'paymentStep'
            }
        }
    },
    on: {
        RESET: {
            target: '.selectCurrency',
            actions: assign(()=> initialContext)
        },
    }
});
