import { useTranslation } from 'react-i18next'

type HangManResultProps = {
    isLoser: boolean
    isWinner: boolean
}
export const HangManResult = ({ isLoser, isWinner }: HangManResultProps) => {
    const { t } = useTranslation();
    return (
        <div>
            {isWinner && t('winnerMessage')}
            {isLoser && t('LostMessage')}
        </div>
    )
}