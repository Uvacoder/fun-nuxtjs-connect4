import Connect4 from "~/engine/Connect4";
import Player from "~/engine/Player";
import connectFourMachine from "~/machines/connectFourMachine";
import {useMachine} from "@xstate/vue";
import {Ref} from "vue";

export function useConnectFour(players: Array<Player>, rows: number, columns: number, winningLength: number, timeLimitPerPlayer: number) {
    const connectFour = ref<Connect4>(new Connect4(players, rows, columns, winningLength, timeLimitPerPlayer));

    const {state, send} = useMachine(connectFourMachine, {
        context: {
            connectFour: connectFour.value
        }
    })

    return {
        connectFour,
    }
}