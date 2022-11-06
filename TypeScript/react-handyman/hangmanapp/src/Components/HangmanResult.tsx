type HangManResultProps = {
    isLoser: boolean
    isWinner: boolean
}
export const HangManResult = ({ isLoser, isWinner }: HangManResultProps) => {
    return (
        <div>
            {isWinner && "Winner! - Refresh to try again"}
            {isLoser && "Nice Try - Refresh to try again"}
        </div>
    )
}