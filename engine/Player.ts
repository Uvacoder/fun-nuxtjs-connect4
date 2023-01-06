interface Player {
    id: string;
    name: string;
    color: string;
    score: number;
    elo: number;
    isReady: boolean;
    isHost: boolean;
    avatar?: string;
    timeLeft: number;
    isMe: boolean;
}

class Player implements Player {

    constructor(id: string, name: string, color: string, score: number, elo: number, isReady: boolean, isHost: boolean, isMe: boolean, avatar?: string) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.score = score;
        this.elo = elo;
        this.isReady = isReady;
        this.isHost = isHost;
        this.avatar = avatar;
        this.isMe = isMe;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getIsMe(): boolean {
        return this.isMe;
    }

    public getAvatar(): string {
        return this.avatar || "";
    }

    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }

    public getColor(): string {
        return this.color;
    }

    public getScore(): number {
        return <number>this.score;
    }

    public getElo(): number {
        return <number>this.elo;
    }

    public getIsReady(): boolean {
        return this.isReady;
    }

    public getIsHost(): boolean {
        return this.isHost;
    }


    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public setElo(elo: number): void {
        this.elo = elo;
    }

    public setIsReady(isReady: boolean): void {
        this.isReady = isReady;
    }

    public setIsHost(isHost: boolean): void {
        this.isHost = isHost;
    }

    public getTimeLeft(): number {
        return this.timeLeft;
    }

    public setTimeLeft(timeLeft: number): void {
        this.timeLeft = timeLeft;
    }

    public countDown(): void {
        this.timeLeft--;
    }
}

export default Player;