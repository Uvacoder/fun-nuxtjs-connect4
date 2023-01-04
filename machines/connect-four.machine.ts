import {createMachine} from "xstate";

createMachine({
    id: "Puissance4",
    initial: "Lobby",
    states: {
        Lobby: {
            on: {
                creating_match: {
                    target: "Matchmaking",
                },
                looking_for_match: {
                    target: "Matchmaking",
                },
            },
        },
        Matchmaking: {
            on: {
                match_found: {
                    target: "WaitingForPlayers",
                },
                failed: {
                    target: "Lobby",
                },
            },
        },
        WaitingForPlayers: {
            on: {
                failed: {
                    target: "Lobby",
                },
                match_starting: {
                    target: "MatchInProgress",
                },
            },
        },
        MatchInProgress: {
            on: {
                match_ended: {
                    target: "MatchStats",
                },
            },
        },
        MatchStats: {
            on: {
                back_to_lobby: {
                    target: "Lobby",
                },
                match_restart: {
                    target: "WaitingForPlayers",
                },
            },
        },
    },
    schema: {
        context: {} as {},
        events: {} as
            | { type: "creating_match" }
            | { type: "looking_for_match" }
            | { type: "match_found" }
            | { type: "failed" }
            | { type: "match_starting" }
            | { type: "match_ended" }
            | { type: "back_to_lobby" }
            | { type: "match_restart" },
    },
    context: {},
    predictableActionArguments: true,
    preserveActionOrder: true,
});