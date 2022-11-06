type HandyManResultProps = {
    isWinner: boolean
    isLoser: boolean
}
export const HandyManResult = ({ isWinner, isLoser }: HandyManResultProps) => {
    return (
        <div style={{ fontSize: '2rem', textAlign: 'center' }}>
            {isWinner && "Winner! - Refresh to try again"}
            {isLoser && 'Nice Try - Refresh to try again'}
        </div>
    )
}